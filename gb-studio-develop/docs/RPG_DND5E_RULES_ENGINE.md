# RPG DnD5e Rules Engine (Source Module)

Implemented a reusable TypeScript rules module for DnD5e-style RPG logic.

## Source

- `src/shared/lib/rpg5e/types.ts`
- `src/shared/lib/rpg5e/data.ts`
- `src/shared/lib/rpg5e/rules.ts`
- `src/shared/lib/rpg5e/index.ts`

## Included Features

- Abilities and modifiers
- Proficiency bonus by level
- D20 rolls with advantage/disadvantage
- Ability checks
- Saving throws
- Skill checks (with skill-to-ability mapping)
- Passive checks
- Initiative rolls
- Attack rolls
- Spell save DC and spell attack bonus
- Damage rolls (with critical support)
- Contested checks
- Short rest hit dice healing
- Long rest recovery

## Example Usage

```ts
import {
  abilityCheck,
  damageRoll,
  proficiencyBonusByLevel,
  spellSaveDC,
} from "shared/lib/rpg5e";

const pb = proficiencyBonusByLevel(5); // 3
const dc = spellSaveDC(4, pb); // 15
const check = abilityCheck(
  {
    strength: 16,
    dexterity: 14,
    constitution: 12,
    intelligence: 10,
    wisdom: 10,
    charisma: 8,
  },
  "strength",
  14,
);
const hitDamage = damageRoll("1d8+3", 0, false);
```

## Notes

- This module is designed as a gameplay logic library and can be consumed by script systems, events, or editor extensions.
- Dice functions accept an optional RNG callback to support deterministic tests.
