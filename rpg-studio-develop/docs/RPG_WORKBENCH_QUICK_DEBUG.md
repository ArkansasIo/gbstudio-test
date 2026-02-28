# RPG Workbench Quick Debug Reference

## Quick Access
- **Keyboard Shortcut**: `Ctrl+Shift+0`
- **Dev Server**: http://localhost:9000
- **React DevTools**: F12 → Components tab

## New Debug Features Added

### 1. Export Debug Data Button
**Location**: RPG Workbench panel
**Action**: Copies comprehensive debug report to clipboard
**Output**: JSON with tool status, validation, and state info

### 2. Show Suggestions Button
**Location**: RPG Workbench panel  
**Action**: Analyzes active tool and suggests next steps
**Output**: Hints logged to output panel

### 3. Browser Console API
Open browser console (F12) and use:
```javascript
// Access debug utilities
window.rpgWorkbenchDebug

// Generate report
window.rpgWorkbenchDebug.generateDebugReport(records, state)

// Log debug info
window.rpgWorkbenchDebug.logDebugInfo(records, state)

// Analyze coverage
window.rpgWorkbenchDebug.analyzeToolCoverage(records)

// Get suggestions
window.rpgWorkbenchDebug.suggestNextActions(records, activeTool)
```

## Common Debug Scenarios

### Scenario 1: Button Not Working
1. Open browser console (F12)
2. Click the button
3. Check for JavaScript errors
4. Verify handler is called
5. Check React DevTools state changes

### Scenario 2: Function Not Executing
1. Check output log for `[RPG]` messages
2. Look for `[WARN] Unhandled RPG function`
3. Verify function name in `menuTree.ts`
4. Check handler in `executeRpgMenuFunction()`

### Scenario 3: Tool Not Updating
1. Click "Show Suggestions" button
2. Check output log for hints
3. Verify tool record exists
4. Use "Export Debug Data" to inspect state

### Scenario 4: State Not Persisting
1. Check `modified` flag in state
2. Verify `applySafeStateUpdate()` is used
3. Check React DevTools for state object
4. Ensure immutable updates

## Debug Output Log Messages

### Success Messages
- `[RPG] Loaded template: {name}`
- `[RPG] {source}: {toolLabel}`
- `[RPG] {action} -> {function}({args})`
- `[IDE] Build check passed: {filename}`

### Warning Messages
- `[WARN] Unhandled RPG function: {name}`
- `[WARN] Engine logic not linked: {summary}`
- `[WARN] Template not linked: {label}`

### Error Messages
- `[ERROR] Missing RPG action function`
- `[ERROR] RPG action failed: {message}`
- `[ERROR] Failed to copy template JSON`

### Debug Messages
- `[DEBUG] {toolLabel}: {action}`
- `[HINT] {suggestion}`
- `[INFO] No suggestions - tool is in good shape!`

## Validation Checks

### Tool Record Validation
```javascript
// In browser console
const validation = window.rpgWorkbenchDebug.validateToolRecord(
  "Party Manager",
  records
);
console.log(validation);
```

**Checks**:
- ✓ Tool ID exists
- ✓ Label is set
- ✓ Category is valid
- ✓ Completion 0-100%
- ✓ Frame budget > 0ms
- ✓ Coverage target 0-100%
- ✓ Checklist not empty

## Performance Monitoring

### Frame Budget Targets
- **Authoring**: 33ms (30fps)
- **Runtime**: 16ms (60fps)
- **Debug**: 50ms (20fps)
- **Build**: 100ms (10fps)
- **Content**: 33ms (30fps)

### Coverage Targets
- **Critical**: 95%
- **Standard**: 80%
- **Experimental**: 60%

## Testing Workflow

### 1. Initial Setup
```
1. Start app: npm start
2. Open RPG Workbench: Ctrl+Shift+0
3. Open DevTools: F12
4. Open React Components tab
```

### 2. Test Tool Activation
```
1. Click tool from toolbar
2. Check "Active Tool Workbench" panel
3. Verify tool record appears
4. Check output log for activation message
```

### 3. Test Tool Updates
```
1. Change status dropdown
2. Toggle checklist items
3. Add notes
4. Click "Mark Run"
5. Verify state updates in React DevTools
```

### 4. Test Menu Actions
```
1. Click RPG menu
2. Select submenu action
3. Check output log for execution
4. Verify tool activation
5. Check state changes
```

### 5. Export Debug Report
```
1. Click "Export Debug Data" button
2. Paste clipboard content
3. Review JSON structure
4. Check validation results
5. Analyze tool coverage
```

## Troubleshooting Tips

### Issue: No output in log
**Fix**: Check `appendLog()` is called in handler

### Issue: State not updating
**Fix**: Use `setState()` or `applySafeStateUpdate()`

### Issue: Button click does nothing
**Fix**: Check handler is in useCallback dependencies

### Issue: Function not recognized
**Fix**: Add to appropriate Set in `rpgMakerEditorSystems.ts`

### Issue: Tool record missing
**Fix**: Call `ensureWorkbenchToolRecord()` before use

## Hot Reload Testing

1. Make code changes
2. Save file
3. Watch terminal for compilation
4. App updates automatically
5. Test changes immediately

## Browser Console Shortcuts

```javascript
// Get React component instance
$r

// Get current state
$r.state

// Get tool records
$r.state.toolWorkbenchRecords

// Get active tool
$r.state.activeTool

// Get output log
$r.state.outputLog

// Force re-render
$r.forceUpdate()
```

## Next Steps

1. ✅ Application is running
2. ✅ Debug utilities added
3. ✅ Debug buttons in UI
4. ✅ Browser console API available
5. → Test button functionality
6. → Monitor output log
7. → Use debug features
8. → Report any issues

## Files Modified

- ✅ `src/components/RPGGameMakerUILayout.tsx` - Added debug buttons
- ✅ `src/app/rpg/debug/workbenchDebugger.ts` - New debug utilities
- ✅ `docs/RPG_WORKBENCH_DEBUG_GUIDE.md` - Comprehensive guide
- ✅ `docs/RPG_WORKBENCH_QUICK_DEBUG.md` - This quick reference

## Support

For detailed debugging information, see:
- `docs/RPG_WORKBENCH_DEBUG_GUIDE.md`
- `docs/RPG_WORKBENCH_TEMPLATE_LIBS.md`
- `README.md`
