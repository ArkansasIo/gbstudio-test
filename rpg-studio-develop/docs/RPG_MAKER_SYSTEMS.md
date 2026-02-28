# RPG Maker Tool and Menu Systems

This document describes the implemented source-level systems for the Unreal-style RPG maker editor shell.

## Implemented Source Files

- `src/components/RPGGameMakerUI.tsx`
- `src/components/RPGGameMakerUILayout.tsx`
- `src/components/rpgGameMakerConfig.ts`
- `src/components/rpgMakerEditorSystems.ts`

## Systems Added

- Menu system with command execution:
  - `runMenuCommand(...)`
- Toolbar action system:
  - `runToolbarAction(...)`
- Project explorer/content selection:
  - `selectAsset(...)`
  - `selectOutlinerEntry(...)`
- Blueprint graph system:
  - Add node from category
  - Select node
  - Remove node
  - Connect selected node to newest node
- Tool category system:
  - `setToolCategory(...)`
- Editor state bootstrap and output log:
  - `createInitialEditorState(...)`
- Prebuilt audio library pack integration:
  - `audioLibraryPacks`

## Feature Coverage

- Top menus (`File/Edit/View/Tools/Blueprints/Build/Play/Window/Help`)
- Command toolbar groups and active tool state
- Content browser and world outliner logic
- Details panel and status surface
- Blueprint canvas with dynamic nodes/edges
- Output log panel for editor events
