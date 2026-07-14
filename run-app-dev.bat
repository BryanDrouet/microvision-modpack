@echo off
REM MicroVision Launcher - Dev Mode with Full Logs
REM This script launches the application with complete debug output

cls
echo.
echo ========================================
echo  MicroVision Launcher - Development Mode
echo ========================================
echo.

cd /d "%~dp0HeliosLauncher"

if not exist "package.json" (
    echo ERROR: package.json not found in HeliosLauncher directory
    echo Make sure you're running this script from the project root
    pause
    exit /b 1
)

echo Starting Node.js development server...
echo All logs will be displayed below:
echo.
echo ========================================
echo.

REM Set NODE_ENV to development for verbose logging
set NODE_ENV=development
set DEBUG=*

REM Launch the app with full output
npm start 2>&1

echo.
echo ========================================
echo Application closed
echo ========================================
pause
