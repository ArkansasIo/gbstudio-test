@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

if "%ANDROID_SDK_ROOT%"=="" (
  if not "%ANDROID_HOME%"=="" set "ANDROID_SDK_ROOT=%ANDROID_HOME%"
)

if "%ANDROID_SDK_ROOT%"=="" (
  echo ANDROID_SDK_ROOT is not set.
  exit /b 1
)

set "ADB=%ANDROID_SDK_ROOT%\platform-tools\adb.exe"
if not exist "%ADB%" (
  echo adb was not found at:
  echo %ADB%
  echo Install platform-tools and retry.
  exit /b 1
)

set "APK=app\build\outputs\apk\debug\app-debug.apk"
if not exist "%APK%" (
  echo APK not found: %APK%
  echo Build it first with build_debug_apk.bat
  exit /b 1
)

"%ADB%" install -r "%APK%"
