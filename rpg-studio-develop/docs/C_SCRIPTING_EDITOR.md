# Built-in C Scripting Editor

This document defines the built-in C scripting support added to the editor.

## Goal

Allow designers to write and validate native C gameplay code inside the editor, while keeping Blueprint as the default visual scripting flow.

## Capabilities

- Script language switching per script asset (`blueprint` or `c`)
- C source storage/serialization in `BlueprintScript`
- Static validation for common runtime issues
- Build command preview for supported targets:
  - `gbdk`
  - `cc65`

## Core Source Files

- `src/lib/blueprint/BlueprintScript.ts`
- `src/lib/blueprint/CScriptEngine.ts`
- `src/lib/blueprint/index.ts`
- `src/components/rpgGameMakerConfig.ts`
- `src/components/rpgMakerEditorSystems.ts`

## C Script Rules

Current validator enforces:

- Required entrypoint: `void script_main(void)`
- Warning on non-embedded-safe calls:
  - `malloc`
  - `free`
  - `printf`
  - `scanf`

## Example

```c
void script_main(void) {
  // Example game logic hook
  // vm_set_const(VAR_PLAYER_HP, 12);
}
```

## Build Integration Notes

- `buildCScript()` currently returns a command preview and diagnostics.
- Real compiler invocation can be connected to existing build pipelines later.
- Recommended future hook:
  - `runMenuCommand(..., "Compile C Scripts")` -> batch compile all C script assets.
