@echo off
echo ==========================================
echo      AUTOMAZZA CRM BUILDER (AUTO MODE)
echo ==========================================
echo.

rem Check if npm is available
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] 'npm' command not found! 
    echo Please install Node.js or ensure it is in your PATH.
    rem pause
    exit /b 1
)

echo [1/6] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Backend install failed.
    rem pause
    exit /b %errorlevel%
)

echo [2/6] Running Database Migrations...
call npx prisma migrate deploy
if %errorlevel% neq 0 (
    echo [WARNING] Migration failed. Trying 'migrate dev'...
    call npx prisma migrate dev --name auto_build
    if %errorlevel% neq 0 (
        echo [ERROR] Migration failed completely.
        rem pause
        exit /b %errorlevel%
    )
)

echo [3/6] Building Backend...
call npm install -D @types/multer
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Backend build failed.
    rem pause
    exit /b %errorlevel%
)

echo [4/6] Installing Frontend Dependencies...
cd ..
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Frontend install failed.
    rem pause
    exit /b %errorlevel%
)

echo [5/6] Building Frontend...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build failed.
    rem pause
    exit /b %errorlevel%
)

echo [DEBUG] Verifying Backend Artifacts...
if not exist "backend\dist\main.js" (
    echo [ERROR] Backend dist/main.js NOT FOUND!
    echo Build failed. Backend must be built before packaging.
    rem pause
    exit /b 1
)

echo [5.5/6] Preparing Backend Staging...
if exist "backend-staging" rmdir /s /q "backend-staging"
mkdir "backend-staging"

echo Copying Backend Files...
rem Use robocopy for robust copying (returns exit code 1 on success usually)
robocopy "backend" "backend-staging" package.json .env /NFL /NDL /NJH /NJS
robocopy "backend/dist" "backend-staging/dist" /E /NFL /NDL /NJH /NJS
robocopy "backend/prisma" "backend-staging/prisma" /E /NFL /NDL /NJH /NJS
rem Rename node_modules to backend_modules to bypass electron-builder exclusions
echo Renaming node_modules to backend_modules...
robocopy "backend/node_modules" "backend-staging/backend_modules" /E /NFL /NDL /NJH /NJS

rem Robocopy exit codes < 8 are fine
if %errorlevel% geq 8 (
    echo [ERROR] Robocopy failed with code %errorlevel%
    rem pause
    exit /b %errorlevel%
)
echo Backend Staging Complete.


echo Verifying Staging Content...
dir "backend-staging\backend_modules" /b /ad | find /c /v ""
if %errorlevel% neq 0 (
    echo [WARNING] No directories found in backend-staging/backend_modules!
    echo Packaging might be incomplete.
    rem pause
    rem We don't exit here strictly but it's a huge warning sign
)
echo.

echo [6/6] Packaging Electron App (Creating Installer)...
call npm run electron:dist
if %errorlevel% neq 0 (
    echo [ERROR] Packaging failed.
    rem pause
    exit /b %errorlevel%
)

echo.
echo ==========================================
echo      BUILD COMPLETE!
echo      INSTALLER IS READY.
echo      Location: dist-electron/
echo      File name ends in "Setup.exe"
echo ==========================================
rem pause
