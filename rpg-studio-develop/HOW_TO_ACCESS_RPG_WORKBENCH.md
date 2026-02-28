# How to Access RPG Workbench

## The Problem
You're likely not in the RPG Workbench section yet. The menus and buttons you're trying to click only exist in the RPG Workbench view.

## Solution: Navigate to RPG Workbench

### Method 1: Keyboard Shortcut (Easiest)
1. Make sure the Electron app window is focused
2. Press: **Ctrl + Shift + 0** (zero)
3. The RPG Workbench should load

### Method 2: Application Menu
1. Look at the **very top** of the Electron window
2. Find the application menu bar (File, Edit, View, etc.)
3. Click **"View"** menu
4. Look for **"RPG WORKBENCH"** option
5. Click it

**Note**: This is the Electron app menu (native OS menu), NOT the menu bar inside the app content.

### Method 3: Check Current Section
Open browser console (F12) and type:
```javascript
// This will tell you what section you're in
document.querySelector('[data-section]')?.getAttribute('data-section')
```

## How to Know You're in RPG Workbench

You should see:
- ✅ A top menu bar with: File, Edit, View, Tools, RPG, Blueprints, Build, Play, Window, Help
- ✅ Workspace buttons below: World Build, Level Design, Blueprint, Content, etc.
- ✅ A toolbar with tool buttons
- ✅ Multiple panels (left sidebar, center area, right inspector)
- ✅ Output log at the bottom
- ✅ Buttons like "Load RPG Template", "Copy Template JSON"

## If You're NOT in RPG Workbench

You might be in one of these sections instead:
- **Project Editor** (default  Studio view)
- **Sprites** section
- **Backgrounds** section
- **Music** section
- **Palettes** section
- **Dialogue** section
- **Settings** section
- **RPG 5E** section (different from RPG Workbench!)

## Quick Test

1. Press **Ctrl + Shift + 0**
2. Wait 1-2 seconds
3. Look for the text "RPG WORKBENCH" or "World Build" button
4. If you see it, you're in the right place!
5. Now press F12 and try clicking menus

## Still Not Working?

If Ctrl+Shift+0 doesn't work:

### Check 1: Is the shortcut registered?
The shortcut is defined in `src/menu.ts` as:
```typescript
{
  label: "RPG WORKBENCH",
  accelerator: "CommandOrControl+Shift+0",
  click: () => {
    notifyListeners("section", "rpgmaker");
  },
}
```

### Check 2: Try the native menu
1. Click the Electron window menu bar (at the very top)
2. Look for "View" or similar menu
3. Find "RPG WORKBENCH" option
4. Click it

### Check 3: Verify app is running
- Terminal should show: "Output Available: http://localhost:9000"
- Electron window should be open
- No crash errors in terminal

## Alternative: Direct Section Switch

If nothing else works, we can add a button to switch sections. But first, try the keyboard shortcut!

## What Happens When You Switch

When you press Ctrl+Shift+0 or click the menu:
1. The app calls `notifyListeners("section", "rpgmaker")`
2. This changes the `section` state to "rpgmaker"
3. App.tsx renders `<RPGGameMakerUI />`
4. RPGGameMakerUI renders `<RPGGameMakerUILayout />`
5. You see the RPG Workbench interface

## Next Steps

1. ✅ Try Ctrl+Shift+0
2. ✅ Look for "World Build" button
3. ✅ If you see it, press F12 and test menus
4. ✅ Report what you see

If Ctrl+Shift+0 doesn't work, let me know and I'll help you access it another way!
