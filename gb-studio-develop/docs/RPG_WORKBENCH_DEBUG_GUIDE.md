# RPG Workbench Debugging Guide

## Overview
This guide helps debug the RPG Workbench feature in the Enchantment Game Engine (GB Studio fork).

## Application Status
✅ Application is running on http://localhost:9000
✅ Main process compiled successfully
✅ Renderer process launched

## Known Issues from Startup
1. **Language Pack Warning**: No language pack for user setting, falling back to en
2. **GPU Error**: Passthrough is not supported, GL is disabled, ANGLE is (non-critical)
3. **CRX Header Error**: Invalid header for extension loading (non-critical)
4. **Missing .gbsres**: Resource files not yet generated for music templates

## RPG Workbench Architecture

### Core Files
- **UI Layout**: `src/components/RPGGameMakerUILayout.tsx`
- **Editor Systems**: `src/components/rpgMakerEditorSystems.ts`
- **Tool Workbench**: `src/app/rpg/runtime/toolWorkbench.ts`
- **Menu Tree**: `src/app/rpg/input/menuTree.ts`
- **Template**: `src/components/rpgWorkbenchTemplate.ts`

### Key Components

#### 1. Menu System
- **Location**: `src/menu.ts` (line 393-399)
- **Keyboard Shortcut**: `Ctrl+Shift+0`
- **Action**: Opens "rpgmaker" section

#### 2. Button Handlers
All buttons in RPG Workbench have proper handlers:

**Template Management**:
- `loadRpgWorkbenchTemplate()` - Loads RPG template starter state
- `copyRpgWorkbenchTemplateJson()` - Copies template JSON to clipboard

**Layout Management**:
- `saveLayout()` - Saves current layout
- `loadLayout()` - Loads saved layout
- `resetLayout()` - Resets to default layout

**Source Code IDE**:
- `importSourceProgram(kind)` - Imports C or ASM files
- `runSourceDiagnostics()` - Runs build checks
- `applySourceReplace()` - Applies find/replace

#### 3. Tool Workbench Records
Tracks tool status, completion, and metadata:
- Status: draft, in_progress, ready, blocked
- Bit Mode: 8bit, 16bit, 32bit, 64bit
- Risk: low, medium, high
- Frame Budget (ms)
- Coverage Target (%)
- Checklist items
- Notes

#### 4. RPG Menu Actions
All menu actions have `functionName` properties that map to handlers in `executeRpgMenuFunction()`:

**Function Categories**:
- OPEN_PANEL_FUNCTIONS (18 functions)
- CHARACTER_PROGRESS_FUNCTIONS (3 functions)
- QUEST_FUNCTIONS (5 functions)
- DIALOGUE_FUNCTIONS (4 functions)
- INVENTORY_ECONOMY_FUNCTIONS (5 functions)
- MOVEMENT_WORLD_FUNCTIONS (4 functions)
- WORLD_SIM_FUNCTIONS (5 functions)
- SAVE_RUNTIME_FUNCTIONS (4 functions)
- SCRIPT_PLUGIN_FUNCTIONS (4 functions)
- SOCIAL_GUILD_FUNCTIONS (7 functions)
- LIVEOPS_FUNCTIONS (3 functions)
- ADMIN_OPERATION_FUNCTIONS (4 functions)
- CRAFTING_HOUSING_FUNCTIONS (4 functions)
- BATTLE_ENGINE_FUNCTIONS (9 functions)

## Debugging Techniques

### 1. Check Console Output
The application logs all actions to the output log panel:
```
[RPG] Action -> functionName(args)
[IDE] Build check passed: filename
[WARN] Unhandled RPG function: functionName
[ERROR] RPG action failed: error message
```

### 2. Verify Function Mapping
Check if a function is recognized:
```typescript
// In rpgMakerEditorSystems.ts
WORKBENCH_KNOWN_FUNCTIONS.has(functionName)
```

### 3. Tool Workbench State
Monitor tool records in React DevTools:
- `toolWorkbenchRecords` state
- `activeWorkbenchTool` computed value

### 4. Menu Action Execution
Add breakpoints in:
- `executeRpgMenuFunction()` - Main function executor
- `runRpgSubMenuAction()` - Submenu action handler
- `activateRpgTool()` - Tool activation

### 5. Check Function Registry
Verify function is registered:
```typescript
// In rpgMakerEditorSystems.ts
WORKBENCH_MENU_FUNCTION_TO_TOOL.get(functionName)
WORKBENCH_ENGINE_FUNCTION_TO_TOOL.get(functionName)
```

## Common Issues & Solutions

### Issue: Button Click Not Working
**Check**:
1. Handler is defined in component
2. Handler is in dependency array of useCallback
3. No JavaScript errors in console

### Issue: Function Not Recognized
**Solution**:
1. Add function to appropriate Set in `rpgMakerEditorSystems.ts`
2. Add handler case in `executeRpgMenuFunction()`
3. Verify function name matches exactly (case-sensitive)

### Issue: Tool Not Activating
**Check**:
1. Tool is registered in `RPG_TOOL_REGISTRY`
2. Tool label matches exactly
3. `ensureWorkbenchToolRecord()` is called

### Issue: State Not Updating
**Solution**:
1. Use `applySafeStateUpdate()` wrapper
2. Return new state object (immutable)
3. Check React DevTools for state changes

## Testing Checklist

### Manual Testing
- [ ] Open RPG Workbench (Ctrl+Shift+0)
- [ ] Click "Load RPG Template" button
- [ ] Verify template loads in output log
- [ ] Click "Copy Template JSON" button
- [ ] Verify clipboard contains JSON
- [ ] Select a tool from toolbar
- [ ] Verify workbench record appears
- [ ] Change tool status dropdown
- [ ] Toggle checklist items
- [ ] Add notes to tool
- [ ] Click "Mark Run" button
- [ ] Verify lastRunAt updates

### RPG Menu Testing
- [ ] Click RPG menu items
- [ ] Verify actions execute
- [ ] Check output log for messages
- [ ] Verify tool activation
- [ ] Test submenu actions

### Source IDE Testing
- [ ] Import C file
- [ ] Import ASM file
- [ ] Run build check
- [ ] Apply find/replace
- [ ] Verify blueprint nodes created

## Performance Monitoring

### Frame Budget
Monitor tool execution time:
- Default: 16ms (60fps)
- Authoring tools: 33ms
- Runtime tools: 16ms
- Debug tools: 50ms

### Coverage Target
Track implementation completion:
- Default: 80%
- Critical tools: 95%
- Experimental: 60%

## Logging Best Practices

### Add Debug Logs
```typescript
appendLog(`[DEBUG] ${toolLabel}: ${action}`)
```

### Log Function Calls
```typescript
appendLog(`[RPG] ${sourceLabel} -> ${functionName}(${args.join(", ")})`)
```

### Log State Changes
```typescript
appendLog(`[STATE] ${property} changed: ${oldValue} -> ${newValue}`)
```

## Browser DevTools

### React DevTools
1. Install React DevTools extension
2. Open DevTools (F12)
3. Navigate to "Components" tab
4. Find `RPGGameMakerUILayout` component
5. Inspect state and props

### Console Commands
```javascript
// Get current state
$r.state

// Get tool workbench records
$r.state.toolWorkbenchRecords

// Get active tool
$r.state.activeTool
```

## File Watching
Monitor these files for changes:
- `src/components/RPGGameMakerUILayout.tsx`
- `src/components/rpgMakerEditorSystems.ts`
- `src/app/rpg/runtime/toolWorkbench.ts`
- `src/app/rpg/input/menuTree.ts`

## Hot Reload
Webpack dev server supports hot reload:
- Save file changes
- Watch terminal for compilation
- Application updates automatically

## Build Errors
If compilation fails:
1. Check terminal output for errors
2. Fix TypeScript errors
3. Verify imports are correct
4. Run `npm run lint` to check code style

## Next Steps
1. Open application at http://localhost:9000
2. Press Ctrl+Shift+0 to open RPG Workbench
3. Test button functionality
4. Monitor console for errors
5. Use React DevTools to inspect state

## Support Resources
- Main README: `README.md`
- Template Documentation: `docs/RPG_WORKBENCH_TEMPLATE_LIBS.md`
- Menu Tree: `src/app/rpg/input/menuTree.ts`
- Tool Registry: `src/app/rpg/input/toolRegistry.ts`
