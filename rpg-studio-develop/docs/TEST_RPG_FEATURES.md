# RPG Workbench - Feature Testing Guide

## Quick Test Checklist

### ✅ Setup
1. Start application: `npm start`
2. Wait for compilation to complete
3. Press `Ctrl+Shift+0` to access RPG Workbench
4. Open browser DevTools (F12) to see console logs

### ✅ Test 1: Party Manager Panel

**Steps**:
1. Click top menu: `World` → `Build` → `Party Manager`
2. Panel should open in center of screen

**Expected Results**:
- ✅ Panel displays with title "Party Manager"
- ✅ Shows "Active Party (2/4)" section
- ✅ Shows "Reserves (2)" section
- ✅ Hero and Aria in active party
- ✅ Shadow and Luna in reserves
- ✅ Each character shows:
  - Portrait emoji
  - Name and level
  - Class
  - HP bar (green)
  - MP bar (blue)
  - Stats (ATK, DEF, SPD, MAG, MDF, LUK)
  - Skills list

**Interactions**:
1. Click "Add" on Shadow → Should move to active party
2. Click "Remove" on Hero → Should move to reserves
3. Try to add 5th character → Should show alert "Party is full!"
4. Remove all but one character → Should show alert "Cannot remove last party member!"
5. Click close button → Panel should close

**Console Output**:
```
[RPG PANEL] Opened: Party Manager
```

### ✅ Test 2: Inventory Grid Panel

**Steps**:
1. Click top menu: `World` → `Build` → `Inventory Grid`
2. Panel should open in center of screen

**Expected Results**:
- ✅ Panel displays with title "Inventory"
- ✅ Shows gold: 500
- ✅ Shows items: 7/100
- ✅ Grid of items with icons
- ✅ Each item shows:
  - Icon emoji
  - Name (colored by rarity)
  - Description
  - Quantity
  - Value in gold
  - Use/Drop buttons

**Interactions**:
1. Type "potion" in search box → Should filter to potions only
2. Select "Sort by Rarity" → Items should reorder
3. Click a Health Potion → Should highlight
4. Click "Use" button → Should show alert and remove 1
5. Click "Drop" button → Should confirm and remove 1
6. Clear search → All items should show again

**Console Output**:
```
[RPG PANEL] Opened: Inventory Grid
Used Health Potion!
```

### ✅ Test 3: Quest Tracker Panel

**Steps**:
1. Click top menu: `World` → `Build` → `Quest Tracker`
2. Panel should open in center of screen

**Expected Results**:
- ✅ Panel displays with title "Quest Tracker"
- ✅ Shows "Active: 2 | Completed: 1"
- ✅ Filter buttons: All, Active, Completed
- ✅ Left side: Quest list
- ✅ Right side: Quest details
- ✅ Each quest shows:
  - Title and level
  - Status badge
  - Description
  - Progress bar
  - Objectives count

**Interactions**:
1. Click "Active" filter → Should show 2 quests
2. Click "Completed" filter → Should show 1 quest
3. Click "The Dark Forest" quest → Should show details
4. View objectives with progress bars
5. View rewards section
6. If quest is complete, click "Complete Quest" → Should add rewards

**Console Output**:
```
[RPG PANEL] Opened: Quest Tracker
Quest completed! Rewards: 500 EXP, 200 Gold
```

### ✅ Test 4: State Persistence

**Steps**:
1. Open Party Manager
2. Add Shadow to party
3. Close panel
4. Wait 30 seconds
5. Check console for auto-save message
6. Refresh browser (F5)
7. Open Party Manager again

**Expected Results**:
- ✅ Shadow is still in active party after refresh
- ✅ Console shows: `[RPG] Auto-saved game state`
- ✅ Console shows: `[RPG] Loaded auto-saved game state`

### ✅ Test 5: Panel Backdrop

**Steps**:
1. Open any panel
2. Click the dark backdrop (outside panel)

**Expected Results**:
- ✅ Panel closes
- ✅ Backdrop disappears

### ✅ Test 6: Multiple Panels

**Steps**:
1. Open Party Manager
2. Without closing, try to open Inventory Grid

**Expected Results**:
- ✅ Party Manager closes
- ✅ Inventory Grid opens
- ✅ Only one panel open at a time

### ✅ Test 7: Output Panel Logging

**Steps**:
1. Open any panel
2. Scroll to bottom of output panel (left side)

**Expected Results**:
- ✅ See log entry: `[RPG PANEL] Opened: [Panel Name]`
- ✅ Green text color for RPG logs

## Troubleshooting

### Panel doesn't open
**Check**:
- Are you in RPG Workbench? (Press Ctrl+Shift+0)
- Is there a green badge "✓ RPG WORKBENCH LOADED" in top-right?
- Check browser console for errors
- Try refreshing the page

**Fix**:
```bash
# Restart the application
npm start
```

### State not persisting
**Check**:
- Is localStorage enabled in browser?
- Check console for "[RPG] Auto-saved" message
- Check browser DevTools → Application → Local Storage

**Fix**:
```javascript
// Clear localStorage and try again
localStorage.clear();
location.reload();
```

### Items/Characters not showing
**Check**:
- Are sample data files imported correctly?
- Check console for import errors
- Verify context provider is wrapping component

**Fix**:
```bash
# Recompile
npm start
```

### TypeScript errors
**Check**:
- Run `npm start` to see compilation errors
- Check all imports are correct
- Verify generated files exist

**Fix**:
```bash
# Clean and rebuild
rm -rf node_modules
npm install
npm start
```

## Performance Tests

### Load Time
- Panel should open in < 100ms
- No lag when clicking buttons
- Smooth animations

### Memory Usage
- Check DevTools → Performance → Memory
- Should not leak memory when opening/closing panels
- Auto-save should not cause spikes

### Responsiveness
- Panels should be responsive to window size
- Scroll should work smoothly
- No layout shifts

## Browser Compatibility

Test in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (if available)

## Success Criteria

All tests should pass:
- [ ] Party Manager works
- [ ] Inventory Grid works
- [ ] Quest Tracker works
- [ ] State persists
- [ ] Backdrop closes panels
- [ ] Only one panel at a time
- [ ] Output panel logs correctly
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Performance is good

## Next Steps After Testing

If all tests pass:
1. ✅ Core functionality is working
2. ✅ Ready to implement more panels
3. ✅ Ready to add more game content
4. ✅ Ready for user testing

If tests fail:
1. Check troubleshooting section
2. Review console errors
3. Check file imports
4. Verify context provider
5. Restart application

## Quick Commands

```bash
# Start application
npm start

# Check for errors
npm run lint

# Run tests (if available)
npm test

# Build for production
npm run package
```

## Expected Console Output

When everything is working:
```
[RPG] Loaded auto-saved game state
[RPG PANEL] Opened: Party Manager
[RPG] Auto-saved game state
[RPG PANEL] Opened: Inventory Grid
Used Health Potion!
[RPG PANEL] Opened: Quest Tracker
Quest completed! Rewards: 500 EXP, 200 Gold
```

## Visual Indicators

Look for:
- ✅ Green badge "✓ RPG WORKBENCH LOADED" (top-right)
- ✅ Panels centered on screen
- ✅ Dark backdrop behind panels
- ✅ Smooth animations
- ✅ Color-coded elements
- ✅ Progress bars
- ✅ Icons and emojis

## Summary

This test guide covers all implemented features. Follow the steps in order to verify everything works correctly. If you encounter issues, check the troubleshooting section first.

Happy testing! 🎮
