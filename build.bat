@echo off
cd HeliosLauncher
echo Compilation du MicroVision Launcher...
echo Cela peut prendre plusieurs minutes...
npm run dist:win
echo.
echo Compilation terminee!
echo.
dir /B dist\*.exe
echo.
pause
