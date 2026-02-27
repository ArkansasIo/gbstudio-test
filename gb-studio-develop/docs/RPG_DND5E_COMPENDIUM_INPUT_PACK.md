# RPG DnD5e Compendium Input Pack

This adds a detailed, legal-safe input framework for DnD5e-style RPG data authoring.

## What is included

- `src/shared/lib/rpg5e/compendiumSchema.ts`
  - Comprehensive source metadata model (`SourceReference`) for book/page/license tracking
  - Detailed entry models for:
    - Classes, Subclasses, Species, Backgrounds, Feats
    - Spells, Items, Monsters
    - Rules systems, Crafting recipes, Story arcs, Quests
    - Factions, Locations, Encounters, Loot tables, Downtime activities
  - Field library for editor input generation (`DND5E_INPUT_FIELD_LIBRARY`)
  - Empty project initializer (`createDefaultDnd5eCompendiumData`)

- `src/shared/lib/rpg5e/contentPackTemplate.ts`
  - `createDnd5eContentPackTemplate()`
  - Starter content examples for rules, story arcs, quests, crafting, encounters, loot, and downtime

- `src/shared/lib/rpg5e/index.ts`
  - Re-exports the new modules

## Legal scope

The schema supports full source references for all books, but does not embed proprietary text.
Use `sources` + `license` to track whether content is SRD/basic-rules/homebrew/licensed.

## Usage

```ts
import {
  createDefaultDnd5eCompendiumData,
  createDnd5eContentPackTemplate,
} from "shared/lib/rpg5e";

const emptyPack = createDefaultDnd5eCompendiumData();
const starterPack = createDnd5eContentPackTemplate();
```
