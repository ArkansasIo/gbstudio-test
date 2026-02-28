# RPG Workbench - Quick Start Guide

## Generate All Implementation Files

Run this single command to generate ~7,000 lines of code for all 50 RPG tools:

```bash
npm run generate:rpg
```

## What Gets Generated

✅ **54 files** with ~6,900 lines of code:
- 1 types file (500 lines)
- 1 state management file (300 lines)  
- 1 action handlers file (1,000 lines)
- 50 UI component files (5,000 lines)
- 1 panel registry file (100 lines)

## Generated Structure

```
src/app/rpg/generated/
├── index.ts                          # Main exports
├── types.ts                          # All TypeScript types
├── state.ts                          # State management & reducer
├── actionHandlers.ts                 # 58 action handlers
└── panelRegistry.ts                  # Component registry

src/components/rpg/generated/
├── save-slot-browser-panel.tsx       # Tool #1
├── profile-selector-panel.tsx        # Tool #2
├── language-picker-panel.tsx         # Tool #3
... (47 more tool components)
└── anti-cheat-rule-editor-panel.tsx  # Tool #50
```

## After Generation

### 1. Check Generated Files

```bash
# List generated files
ls -la src/app/rpg/generated/
ls -la src/components/rpg/generated/
```

### 2. Review the Code

Open any generated file to see the structure:
- `src/app/rpg/generated/types.ts` - See all data types
- `src/app/rpg/generated/state.ts` - See state management
- `src/components/rpg/generated/party-manager-panel.tsx` - See a component example

### 3. Integrate with RPG Workbench

The generated code is ready to use! See `RPG_WORKBENCH_GENERATOR_README.md` for integration instructions.

## Quick Integration Example

```typescript
// In src/components/RPGGameMakerUILayout.tsx

import { useReducer } from 'react';
import { 
  createInitialRPGState, 
  rpgGameReducer,
  getPanelComponent 
} from 'app/rpg/generated';

// Add to your component:
const [rpgState, dispatchRPG] = useReducer(
  rpgGameReducer,
  createInitialRPGState()
);

// Render panels:
{rpgState.panelState.activePanel && (
  <div style={{ 
    position: 'fixed', 
    top: 100, 
    left: 100, 
    zIndex: 1000,
    maxWidth: '80vw',
    maxHeight: '80vh',
    overflow: 'auto'
  }}>
    {(() => {
      const Panel = getPanelComponent(rpgState.panelState.activePanel);
      return Panel ? (
        <Panel onClose={() => dispatchRPG({ type: 'CLOSE_PANEL' })} />
      ) : null;
    })()}
  </div>
)}
```

## What's Included

### Types (types.ts)
- Character, Item, Quest, Skill
- Inventory, Equipment, Stats
- Battle, Crafting, Housing
- Save/Load data structures

### State Management (state.ts)
- Initial state creator
- Reducer with all actions
- Selectors for querying data

### Action Handlers (actionHandlers.ts)
- 58 handlers (one per menu action)
- Type-safe function signatures
- Ready to implement logic

### UI Components (50 files)
- Pre-styled dark theme
- TypeScript props
- Close button
- Placeholder content

### Panel Registry (panelRegistry.ts)
- Maps panel IDs to components
- Dynamic component loading
- Type-safe registry

## Next Steps

1. ✅ Run `npm run generate:rpg`
2. ✅ Review generated files
3. ✅ Integrate with RPG Workbench (see example above)
4. ✅ Implement one tool completely (e.g., Party Manager)
5. ✅ Use that as a template for others
6. ✅ Add game data (characters, items, quests)
7. ✅ Test and iterate

## Example: Implementing Party Manager

After generation, enhance the Party Manager:

```typescript
// src/components/rpg/generated/party-manager-panel.tsx

import React from 'react';
import { useRPGState } from 'app/rpg/hooks';
import { selectActivePartyCharacters, selectReserveCharacters } from 'app/rpg/generated';

export const PartyManagerPanel: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { rpgState, dispatchRPG } = useRPGState();
  const party = selectActivePartyCharacters(rpgState);
  const reserves = selectReserveCharacters(rpgState);

  return (
    <div style={{ background: '#1e293b', padding: 16, borderRadius: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>Party Manager</h2>
        <button onClick={onClose}>Close</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <h3>Active Party ({party.length}/4)</h3>
          {party.map(char => (
            <div key={char.id} style={{ padding: 8, background: '#334155', marginBottom: 8 }}>
              <div>{char.name} - Lv.{char.level}</div>
              <div>HP: {char.stats.hp}/{char.stats.maxHp}</div>
              <button 
                onClick={() => dispatchRPG({ type: 'REMOVE_FROM_PARTY', payload: char.id })}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div>
          <h3>Reserves</h3>
          {reserves.map(char => (
            <div key={char.id} style={{ padding: 8, background: '#334155', marginBottom: 8 }}>
              <div>{char.name} - Lv.{char.level}</div>
              <button 
                onClick={() => dispatchRPG({ type: 'ADD_TO_PARTY', payload: char.id })}
                disabled={party.length >= 4}
              >
                Add to Party
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

## Troubleshooting

### Command Not Found

```bash
# Install ts-node if needed
npm install -D ts-node @types/node

# Run directly
npx ts-node scripts/generateRpgWorkbenchImplementation.ts
```

### Import Errors

Make sure `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src/**/*", "scripts/**/*"]
}
```

### Files Not Generated

Check console output for errors. The script will show:
- ✓ Generated types: [path]
- ✓ Generated state management: [path]
- ✓ Generated X action handlers: [path]
- ✓ Generated X tool components
- ✓ Generated panel registry: [path]

## Documentation

- **Full Guide**: `RPG_WORKBENCH_GENERATOR_README.md`
- **Implementation Status**: `RPG_WORKBENCH_IMPLEMENTATION_STATUS.md`
- **Complete Menu List**: `RPG_WORKBENCH_COMPLETE_MENU_LIST.md`

## Summary

One command generates everything you need to start implementing the RPG Workbench:

```bash
npm run generate:rpg
```

Then integrate, implement, and iterate! 🚀
