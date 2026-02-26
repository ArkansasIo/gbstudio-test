# Additional Utilities and Helpers

GB Studio also includes utility functions for painting, text trimming, and script comparison:

## Paint Utilities
- **paint**: Paints a square area on a grid, used for tile and sprite editing.
- **paintLine**: Paints a line between two points, useful for drawing tools.
- **paintMagic**: Advanced painting logic for backgrounds and tiles.
	- See `/src/shared/lib/helpers/paint.ts`.

## Text Utilities
- **trimlines**: Trims and crops text to fit Game Boy display limits, handling variables and commands.
- **textNumLines**: Counts lines in a string.
- **textNumNewlines**: Counts newlines in input.
	- See `/src/shared/lib/helpers/trimlines.ts`.

## Script Helpers
- **isNormalizedScriptEqual**: Compares normalized script data for equality.
- **walkNormalizedScript**: Walks through normalized script events.
- **walkScript**: Walks through script events and their children.
	- See `/src/shared/lib/scripts/scriptHelpers.ts`.

---
These utilities support advanced editing, validation, and comparison tasks for developers working on GB Studio’s engine and tools.
# Script, Actor, Trigger, and Scene Utilities

GB Studio provides advanced functions for manipulating scripts, actors, triggers, and scenes. These are useful for developers extending or debugging the engine:

## Script Mapping Functions

- **mapScript**: Recursively maps over script events, applying a callback to each event and its children.
- **mapUncommentedScript**: Like mapScript, but skips events that are commented out.
- **mapPrefabOverrides**: Applies mapping to prefab overrides, merging event and override data.
- **mapSceneScript**: Updates all script events within a scene, including actors and triggers, using a callback.
- **mapScenesScript**: Updates all script events within an array of scenes.
- **mapActorScript / mapActorsScript**: Updates script events for actors or arrays of actors.
- **mapTriggerScript / mapTriggersScript**: Updates script events for triggers or arrays of triggers.
- **mapCustomScriptsScript**: Updates custom scripts using a callback.

## Script Filtering and Walking

- **filterEvents**: Filters nested script event structures using a callback.
- **walkScript**: Iterates over script events and their children, calling a callback for each.

## Color and Sprite Utilities

- **spriteDataIndexFn**: Maps image data to sprite indices.
- **color mapping functions**: Convert raw hex colors to palette indices.

## Where to Find These

- See `/src/shared/lib/scripts/walk.ts` for script utilities.
- See `/src/shared/lib/sprites/spriteData.ts` and `/src/shared/lib/helpers/color.ts` for sprite and color functions.

---
These utilities are essential for advanced manipulation, migration, and debugging of game logic. Use them to extend GB Studio’s capabilities or automate complex tasks.
# Developer Guide

## Profiling Engine

When GB Studio is run from source an extra checkbox will appear on the Build Page, "Enable BGB Profiling". Turning this setting on will pass aditional profiling flags to the GBDK compiler producing profiling log data when the game is run using the [BGB emulator](https://bgb.bircd.org/)

If you start BGB using a command line using the -watch flag it will reload your game on each successful build:

```
./bgb -watch -rom game.gb
```

To make use of the profiling data it is recommended to use https://github.com/untoxa/bgb_profiling_toolkit.

When using "Export ROM" a `.map` file is included with your ROM which when used with the BGB output file will allow generating profiling statistics

e.g.
```
python calc_statistics.py debugmsg.txt game.map

_UIOnInteract:_PopBank:_StackPop                    MIN:      34 AVG:     34.00 95P:      34 MAX:      34 TOTAL: 0x0000000000000044 NCALLS: 2
_ActorRunCollisionScripts:_PushBank:_StackPush      MIN:      26 AVG:     26.00 95P:      26 MAX:      26 TOTAL: 0x0000000000000034 NCALLS: 2
_UIUpdate:_UIUpdate_b:_UIDrawTextBuffer             MIN:     290 AVG:    354.00 95P:     290 MAX:     419 TOTAL: 0x00000000000002c5 NCALLS: 2
_UpdateCamera:_PushBank:_StackPush:_MusicUpdate     MIN:      84 AVG:     84.00 95P:      84 MAX:      84 TOTAL: 0x0000000000000054 NCALLS: 1
_FadeUpdate:_PushBank                               MIN:      82 AVG:     82.00 95P:      82 MAX:      82 TOTAL: 0x00000000000000a4 NCALLS: 2

```
