# RPG Workbench Template and Libraries

This project now includes a generated RPG template and library bundle built from
the current workbench menus, tools, and RPG datasets.

## Source

- `src/components/rpgWorkbenchTemplate.ts`

Exports:

- `RPG_WORKBENCH_LIBRARIES`
- `RPG_WORKBENCH_TEMPLATE`
- `RPG_WORKBENCH_TEMPLATE_JSON`
- `createRpgWorkbenchTemplate()`

## Included Data

- Shell menus, toolbar groups, panels, workspace presets, quick tools
- RPG feature definitions
- RPG system menus and tool registry
- Engine systems
- Template library, premade systems, plugin templates
- Color profiles, settings groups, settings presets
- Blueprint node catalog, editor themes, tool links
- Aggregate counts for quick validation

## UI Integration

In `RPG WORKBENCH`:

- `Load RPG Template` applies starter state from the template.
- `Copy Template JSON` copies the full template JSON to clipboard.
