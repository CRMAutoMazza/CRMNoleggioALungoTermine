@echo off
echo ==========================================
echo      AUTOMAZZA CRM FAST BUILDER (Skips Installs)
echo ==========================================
echo.

rem Check if npm is available
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] 'npm' command not found! 
    echo Please install Node.js.
    pause
    exit /b 1
)

echo [1/6] Checking Backend Dependencies...
cd backend
if exist "node_modules" (
    echo [SKIP] node_modules found. Skipping install.
) else (
    echo Installing Backend Dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Backend install failed.
        pause
        exit /b %errorlevel%
    )
)

echo [2/6] Running Database Migrations...
rem We keep migration as it is usually fast if nothing changed
call npx prisma migrate deploy
if %errorlevel% neq 0 (
    echo [WARNING] Migration failed. Trying 'migrate dev'...
    call npx prisma migrate dev --name auto_build
)

echo [3/6] Building Backend...
rem build is mandatory
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Backend build failed.
    pause
    exit /b %errorlevel%
)

echo [4/6] Checking Frontend Dependencies...
cd ..
if exist "node_modules" (
    echo [SKIP] node_modules found. Skipping install.
) else (
    echo Installing Frontend Dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Frontend install failed.
        pause
        exit /b %errorlevel%
    )
)

echo [5/6] Building Frontend...
rem build is mandatory
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build failed.
    pause
    exit /b %errorlevel%
)

echo [DEBUG] Verifying Backend Artifacts...
if not exist "backend\dist\main.js" (
    echo [ERROR] Backend dist/main.js NOT FOUND!
    pause
    exit /b 1
)

echo [5.5/6] Preparing Backend Staging...
if exist "backend-staging" rmdir /s /q "backend-staging"
mkdir "backend-staging"

echo Copying Backend Files...
robocopy "backend" "backend-staging" package.json .env /NFL /NDL /NJH /NJS
robocopy "backend/dist" "backend-staging/dist" /E /NFL /NDL /NJH /NJS
robocopy "backend/prisma" "backend-staging/prisma" /E /NFL /NDL /NJH /NJS

echo Copying node_modules...
rem Optimization: Copy then Prune
robocopy "backend/node_modules" "backend-staging/node_modules" /E /NFL /NDL /NJH /NJS

echo [5.8/6] Pruning Dev Dependencies (Lightening the App)...
cd "backend-staging"
call npm prune --production
cd ..

timeout /t 5 /nobreak
echo Renaming node_modules to backend_modules (To bypass builder exclusion)...
move "backend-staging\node_modules" "backend-staging\backend_modules"
timeout /t 5 /nobreak

if %errorlevel% geq 8 (
    echo [ERROR] Robocopy failed with code %errorlevel%
    pause
    exit /b %errorlevel%
)

echo [6/6] Packaging Electron App...
call npm run electron:dist
if %errorlevel% neq 0 (
    echo [ERROR] Packaging failed.
    pause
    exit /b %errorlevel%
)

echo [7/6] Cleaning up...
if exist "backend-staging" (
    echo Removing temporary staging folder...
    rmdir /s /q "backend-staging"
    if exist "backend-staging" (
         echo [WARNING] Could not remove backend-staging. You may delete it manually.
    ) else (
         echo Cleanup successful.
    )
)

echo.
echo ==========================================
echo      FAST BUILD COMPLETE!
echo      Location: dist-electron/Setup.exe
echo ==========================================
pause
