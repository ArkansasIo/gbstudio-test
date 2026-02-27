# Additional Utilities and Helpers

Enchantment Game Engine includes utility modules for painting, text formatting, script comparison, and script traversal.

## Paint Utilities

- **paint**: Paints a square area on a grid (tile/sprite editing).
- **paintLine**: Paints a line between two points.
- **paintMagic**: Advanced painting behavior for backgrounds and tiles.
- Location: `/src/shared/lib/helpers/paint.ts`

## Text Utilities

- **trimlines**: Trims/crops text to fit Game Boy display limits, including variables and commands.
- **textNumLines**: Counts lines in a string.
- **textNumNewlines**: Counts newline characters in input.
- Location: `/src/shared/lib/helpers/trimlines.ts`

## Script Helpers

- **isNormalizedScriptEqual**: Compares normalized script data for equality.
- **walkNormalizedScript**: Walks normalized script events.
- **walkScript**: Walks script events and child events.
- Location: `/src/shared/lib/scripts/scriptHelpers.ts`

These utilities support advanced editing, validation, and comparison workflows.

# Script, Actor, Trigger, and Scene Utilities

The engine provides utility functions for manipulating scripts, actors, triggers, and scenes.

## Script Mapping

- **mapScript**: Recursively maps script events and children with a callback.
- **mapUncommentedScript**: Same as `mapScript`, but skips commented events.
- **mapPrefabOverrides**: Maps prefab override data, merging event and override fields.
- **mapSceneScript**: Maps all script events in a scene, including actor and trigger scripts.
- **mapScenesScript**: Maps script events across an array of scenes.
- **mapActorScript / mapActorsScript**: Maps scripts on one or multiple actors.
- **mapTriggerScript / mapTriggersScript**: Maps scripts on one or multiple triggers.
- **mapCustomScriptsScript**: Maps custom script collections.

## Script Filtering and Walking

- **filterEvents**: Filters nested script event structures using a callback.
- **walkScript**: Iterates over script events and their children.

## Color and Sprite Utilities

- **spriteDataIndexFn**: Maps image data to sprite indices.
- **Color mapping helpers**: Converts raw hex colors to palette indices.

## Locations

- Script utilities: `/src/shared/lib/scripts/walk.ts`
- Sprite and color utilities:
  - `/src/shared/lib/sprites/spriteData.ts`
  - `/src/shared/lib/helpers/color.ts`

These utilities are useful for migration, debugging, and advanced game-logic transformations.

# Developer Guide

## Profiling the Engine

When Enchantment Game Engine runs from source, the Build page shows an additional checkbox: **Enable BGB Profiling**.

Enabling this option passes profiling flags to GBDK, allowing runtime profiling when the game runs in the [BGB emulator](https://bgb.bircd.org/).

To auto-reload the ROM after each successful build, start BGB with `-watch`:

```bash
./bgb -watch -rom game.gb
```

For analysis, use: https://github.com/untoxa/bgb_profiling_toolkit

When using **Export ROM**, the engine also outputs a `.map` file. Combine that map with BGB output logs to generate profiling stats.

Example:

```bash
python calc_statistics.py debugmsg.txt game.map

_UIOnInteract:_PopBank:_StackPop                    MIN:      34 AVG:     34.00 95P:      34 MAX:      34 TOTAL: 0x0000000000000044 NCALLS: 2
_ActorRunCollisionScripts:_PushBank:_StackPush      MIN:      26 AVG:     26.00 95P:      26 MAX:      26 TOTAL: 0x0000000000000034 NCALLS: 2
_UIUpdate:_UIUpdate_b:_UIDrawTextBuffer             MIN:     290 AVG:    354.00 95P:     290 MAX:     419 TOTAL: 0x00000000000002c5 NCALLS: 2
_UpdateCamera:_PushBank:_StackPush:_MusicUpdate     MIN:      84 AVG:     84.00 95P:      84 MAX:      84 TOTAL: 0x0000000000000054 NCALLS: 1
_FadeUpdate:_PushBank                               MIN:      82 AVG:     82.00 95P:      82 MAX:      82 TOTAL: 0x00000000000000a4 NCALLS: 2
```
