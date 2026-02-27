@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

if "%ANDROID_SDK_ROOT%"=="" (
  if not "%ANDROID_HOME%"=="" set "ANDROID_SDK_ROOT=%ANDROID_HOME%"
)

if "%ANDROID_SDK_ROOT%"=="" (
  echo ANDROID_SDK_ROOT is not set.
  echo Set ANDROID_SDK_ROOT to your Android SDK location and retry.
  exit /b 1
)

where gradle >nul 2>nul
if errorlevel 1 (
  echo Gradle is not on PATH.
  echo Install Gradle or open this project in Android Studio and build there.
  exit /b 1
)

gradle --no-daemon assembleDebug
if errorlevel 1 exit /b 1

echo.
echo APK created:
echo app\build\outputs\apk\debug\app-debug.apk
echo.
echo No developer account is required for this debug APK.
