# Unreal-Style 8-bit 2D Editor Layout and Blueprint System

## Scope

This spec defines a UE5-inspired editor shell for 8-bit 2D game production, including top menus, dock panels, tool workflow, and node-based scripting.

## Top Menu Layout

- `File`: project lifecycle, packaging, source control.
- `Edit`: undo/redo and editor preferences.
- `View`: dockable panel visibility and layout control.
- `Tools`: tile, sprite, collision, palette, data-table tools.
- `Blueprints`: open/create/compile/debug blueprints.
- `Build`: ROM/Web/Pocket outputs and clean.
- `Play`: play-in-editor simulation and debug stepping.
- `Window`: save/load layouts, plugin browser.
- `Help`: docs/API/tutorial access.

## Command Toolbar Layout

- `Project`: New/Open/Save/Source Control.
- `Transform`: Select/Move/Rotate/Scale/Grid Snap.
- `2D Tools`: Paint/Fill/Eraser/Collision/Light Probe.
- `Blueprint`: Add Node/Compile/Find References/Debug.
- `Play`: Play/Simulate/Pause/Stop.

## Docked Panel Layout

- Left:
  - `Content Browser`
  - `World Outliner`
- Center:
  - `2D Viewport` (tilemap workspace)
  - `Blueprint Graph Canvas`
- Right:
  - `Details` inspector
  - `8-bit Tool Palette` + Blueprint node catalog
- Bottom:
  - Status bar (project, bank usage, runtime perf)

## 8-bit Tooling Requirements

- Tile size lock modes (`8x8`, `16x16`).
- Palette index lock and validation.
- Collision layer painting.
- Meta-tile composition support.
- ROM/RAM budget indicators.
- Sprite/OAM visibility checks.

## Blueprint System Requirements

- Event nodes (`On Interact`, `On Area Enter`, etc.).
- Flow control (`Branch`, `Sequence`, `Gate`, loops).
- Gameplay nodes (spawn, give item, set tile/flags).
- UI nodes (dialog, choice box, HUD updates).
- Audio nodes (play/stop/fade tracks, SFX).
- Math/logic nodes for conditions and values.

## Implemented Files

- `src/components/rpgGameMakerConfig.ts`
- `src/components/RPGGameMakerUILayout.tsx`
- `src/components/RPGGameMakerUI.tsx`
