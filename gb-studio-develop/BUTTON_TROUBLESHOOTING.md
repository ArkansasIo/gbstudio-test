# Button Press Troubleshooting Guide

## Issue: Buttons Don't Work

### Step 1: Verify Application is Running
✅ Check terminal shows: "Output Available: http://localhost:9000"
✅ Electron window is open

### Step 2: Access RPG Workbench
Try these methods:

**Method 1: Keyboard Shortcut**
- Press `Ctrl+Shift+0` (Windows/Linux)
- Press `Cmd+Shift+0` (Mac)

**Method 2: Menu**
- Click "View" menu (or similar)
- Look for "RPG WORKBENCH" option
- Click it

### Step 3: Verify You're in the Right Section
Look for these indicators:
- Panel title says "RPG WORKBENCH" or similar
- You see buttons like "Load RPG Template", "Copy Template JSON"
- There's a toolbar with tool options
- Output log panel at bottom

### Step 4: Check Button Visibility
If buttons are not visible:
1. Scroll down in the panel
2. Check if panel is collapsed
3. Try resizing the window
4. Check if you're in a different section

### Step 5: Test Button Click
Click a button and check:
1. **Output Log** - Look for messages like:
   - `[RPG] Loaded template: ...`
   - `[RPG] Copied workbench template JSON`
   - `[DEBUG] ...`

2. **Browser Console** (F12):
   - Check for JavaScript errors (red text)
   - Look for console.log messages

3. **Visual Feedback**:
   - Button should show hover effect
   - Cursor should change to pointer
   - Button might briefly change color

### Step 6: Common Issues

#### Issue: Keyboard Shortcut Doesn't Work
**Solutions**:
- Try the menu instead
- Check if another app is using the shortcut
- Try restarting the application
- Check keyboard layout (US vs other)

#### Issue: Buttons Visible But No Response
**Solutions**:
1. Open browser DevTools (F12)
2. Click Console tab
3. Click the button
4. Look for errors in red

**Common Errors**:
- `undefined is not a function` → Handler not defined
- `Cannot read property` → State issue
- `Permission denied` → Clipboard access blocked

#### Issue: Wrong Section Displayed
**Solutions**:
- Press `Ctrl+Shift+0` again
- Check menu bar for "RPG WORKBENCH"
- Look for section tabs/buttons
- Restart application

#### Issue: Application Frozen
**Solutions**:
1. Check terminal for errors
2. Close and restart app
3. Clear webpack cache: `npm run clean` (if available)
4. Restart dev server

### Step 7: Verify Compilation
Check terminal output for:
```
✓ [plugin-webpack] Compiling main process code
✓ [plugin-webpack] Launching dev servers for renderer process code
  › Output Available: http://localhost:9000
```

If you see errors:
1. Read the error message
2. Fix TypeScript/syntax errors
3. Save the file
4. Wait for recompilation

### Step 8: Force Reload
If changes aren't appearing:
1. In Electron window: `Ctrl+R` or `Cmd+R`
2. Or close and restart the app
3. Or stop terminal (Ctrl+C) and run `npm start` again

### Step 9: Check File Changes
Verify our changes were saved:
```bash
# Check if debug utilities exist
ls src/app/rpg/debug/workbenchDebugger.ts

# Check if component was modified
grep "exportWorkbenchDebugData" src/components/RPGGameMakerUILayout.tsx
```

### Step 10: Manual Testing

**Test 1: Simple Button**
1. Find "Load RPG Template" button
2. Click it
3. Check output log for: `[RPG] Loaded template:`

**Test 2: Clipboard Button**
1. Find "Copy Template JSON" button
2. Click it
3. Open notepad and paste (Ctrl+V)
4. Should see JSON data

**Test 3: Debug Button** (NEW)
1. Find "Export Debug Data" button
2. Click it
3. Check output log for: `[DEBUG] Exported workbench debug data`
4. Paste clipboard content

**Test 4: Suggestions Button** (NEW)
1. Select a tool from toolbar
2. Find "Show Suggestions" button
3. Click it
4. Check output log for: `[HINT]` messages

## Quick Diagnostic Commands

### In Terminal
```bash
# Check if app is running
netstat -an | grep 9000

# Check for compilation errors
# (Look at terminal output)
```

### In Browser Console (F12)
```javascript
// Check if debug API is loaded
window.rpgWorkbenchDebug

// Check React component
$r

// Check state
$r.state

// Check if handlers exist
$r.exportWorkbenchDebugData
$r.showWorkbenchSuggestions
```

## Expected Behavior

### When Button Works:
1. Click button
2. See output log message immediately
3. State updates (if applicable)
4. Visual feedback (if any)

### When Button Doesn't Work:
1. Click button
2. Nothing happens
3. No log message
4. No console error
5. No visual feedback

## Next Steps

### If Still Not Working:
1. **Check this file**: `src/components/RPGGameMakerUILayout.tsx`
   - Search for: `exportWorkbenchDebugData`
   - Verify function exists

2. **Check imports**:
   - Look for: `import { ... } from "app/rpg/debug/workbenchDebugger"`
   - Verify file exists: `src/app/rpg/debug/workbenchDebugger.ts`

3. **Check button rendering**:
   - Search for: `<button style={buttonStyle} onClick={exportWorkbenchDebugData}>`
   - Verify it's in the JSX

4. **Restart everything**:
   ```bash
   # Stop app (Ctrl+C in terminal)
   # Clear cache
   rm -rf .webpack
   # Restart
   npm start
   ```

## Contact Information

If buttons still don't work after following this guide:
1. Check terminal for compilation errors
2. Check browser console for runtime errors
3. Verify you're in the RPG WORKBENCH section
4. Try the original buttons (Load Template, Copy JSON)
5. Document the exact error message

## Current Status

✅ Application compiled successfully
✅ Debug utilities created
✅ Buttons added to UI
✅ Handlers implemented
⏳ Waiting for app to restart with changes

**Next**: Wait for compilation to complete, then test buttons.
