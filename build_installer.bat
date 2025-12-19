@echo off
echo ==========================================
echo      AutoMazza CRM - Build Installer
echo ==========================================
echo.

echo [1/4] Cleaning old build files...
echo Closing running instances...
taskkill /F /IM "AutoMazza CRM.exe" >nul 2>&1
taskkill /F /IM "electron.exe" >nul 2>&1
timeout /t 2 /nobreak >nul
if exist dist rmdir /s /q dist
if exist dist-electron rmdir /s /q dist-electron
if exist dist-app rmdir /s /q dist-app
echo Done.
echo.

echo [2/4] Building React Application...
call npm run build
if %errorlevel% neq 0 (
    echo Error building React App!
    pause
    exit /b %errorlevel%
)
echo Done.
echo.

echo [3/4] Packaging Electron App (Installer)...
call npm run electron:dist
if %errorlevel% neq 0 (
    echo Error packaging Electron App!
    pause
    exit /b %errorlevel%
)
echo Done.
echo.

echo [4/4] Build Complete!
echo.
echo You can find the installer here:
echo dist-electron\AutoMazza CRM Setup 0.0.0.exe
echo.
pause
