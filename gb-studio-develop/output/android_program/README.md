# Android Output (No Developer Account Required)

This folder contains a standalone Android wrapper app for the generated HTML bundle.

It loads:

- `app/src/main/assets/html_program/START_HERE.html`

using Android `WebViewAssetLoader`, so the app can run local assets directly.

## What you get

- Android app project under `output/android_program`
- HTML bundle copied from `output/html_program`
- Build/install scripts:
  - `build_debug_apk.bat`
  - `install_debug_apk.bat`

## Build a runnable APK

No Google Play developer account is required for debug APK installation.

1. Install Android SDK tools and Gradle.
2. Set one environment variable:
   - `ANDROID_SDK_ROOT` (or `ANDROID_HOME`)
3. Build:
   - `build_debug_apk.bat`
4. APK output:
   - `app/build/outputs/apk/debug/app-debug.apk`

## Install on device

1. Enable USB debugging on your Android device.
2. Connect device by USB.
3. Run:
   - `install_debug_apk.bat`

## Notes

- This is a debug-signed APK suitable for local install/testing.
- If you need wide distribution, generate a release keystore and signed release APK/AAB.
