@echo off
echo.
echo ==========================================
echo      RETRIEVING BACKEND LOGS
echo ==========================================
echo.

set "LOGFILE=%APPDATA%\AutoMazza CRM\backend.log"

if exist "%LOGFILE%" (
    echo [SUCCESS] Log file found at: "%LOGFILE%"
    echo.
    echo ------------------------------------------------------------------------
    type "%LOGFILE%"
    echo ------------------------------------------------------------------------
    echo.
) else (
    echo [ERROR] Log file NOT found at: "%LOGFILE%"
    echo Checking parent directory content:
    dir "%APPDATA%\AutoMazza CRM"
)

pause
