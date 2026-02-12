@echo off
echo Searching for AutoMazza or CRM folders in AppData...
dir "%APPDATA%\Auto*" /b /ad
dir "%APPDATA%\*CRM*" /b /ad
echo.
echo Checking Local AppData too...
dir "%LOCALAPPDATA%\Auto*" /b /ad
dir "%LOCALAPPDATA%\*CRM*" /b /ad
