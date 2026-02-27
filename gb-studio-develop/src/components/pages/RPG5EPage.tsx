import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Input } from "ui/form/Input";
import { Textarea } from "ui/form/Textarea";
import { Label } from "ui/form/Label";
import { Button } from "ui/buttons/Button";
import API from "renderer/lib/api";
import {
  coerceRPG5EData,
  createDefaultRPG5EData,
  RPG5EData,
  RPGCategoryKey,
  RPGEntry,
} from "shared/lib/rpg5e/editorData";
import { evaluateEncounter, xpForCr } from "shared/lib/rpg5e/encounter";
import {
  abilityModifier,
  initiativeRoll,
  proficiencyBonusByLevel,
  spellAttackBonus,
  spellSaveDC,
} from "shared/lib/rpg5e/rules";
import type { Ability } from "shared/lib/rpg5e/types";

type FieldType = "string" | "number" | "boolean";
type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
};

type CategoryDef = {
  key: RPGCategoryKey;
  label: string;
  description: string;
  fields: FieldDef[];
};

const categories: CategoryDef[] = [
  {
    key: "maps",
    label: "Maps",
    description: "Overworld and city map definitions.",
    fields: [
      { key: "size", label: "Size", type: "string", placeholder: "128x128" },
      { key: "theme", label: "Theme", type: "string", placeholder: "Forest" },
      { key: "danger", label: "Danger (1-10)", type: "number", placeholder: "3" },
    ],
  },
  {
    key: "dungeons",
    label: "Dungeons",
    description: "Multi-room dungeons and boss spaces.",
    fields: [
      { key: "floors", label: "Floors", type: "number", placeholder: "3" },
      { key: "boss", label: "Boss", type: "string", placeholder: "Lich Knight" },
      { key: "recommendedLevel", label: "Recommended Level", type: "number", placeholder: "5" },
    ],
  },
  {
    key: "zones",
    label: "Zones",
    description: "Zone/region metadata and progression gates.",
    fields: [
      { key: "climate", label: "Climate", type: "string", placeholder: "Temperate" },
      { key: "travelCost", label: "Travel Cost", type: "number", placeholder: "2" },
      { key: "requiresKeyItem", label: "Requires Key Item", type: "boolean" },
    ],
  },
  {
    key: "biomes",
    label: "Biomes",
    description: "Biome rules for generation and encounter flavor.",
    fields: [
      { key: "humidity", label: "Humidity", type: "number", placeholder: "60" },
      { key: "temperature", label: "Temperature", type: "number", placeholder: "24" },
      { key: "resourceTag", label: "Resource Tag", type: "string", placeholder: "herbs" },
    ],
  },
  {
    key: "weapons",
    label: "Weapons",
    description: "DND5E weapon entries.",
    fields: [
      { key: "damageDice", label: "Damage Dice", type: "string", placeholder: "1d8" },
      { key: "damageType", label: "Damage Type", type: "string", placeholder: "slashing" },
      { key: "weightLb", label: "Weight (lb)", type: "number", placeholder: "3" },
      { key: "requiresAttunement", label: "Requires Attunement", type: "boolean" },
      { key: "costGp", label: "Cost (gp)", type: "number", placeholder: "15" },
      { key: "isMagic", label: "Magic", type: "boolean" },
    ],
  },
  {
    key: "armors",
    label: "Armors",
    description: "Armor and shield entries.",
    fields: [
      { key: "ac", label: "AC", type: "number", placeholder: "16" },
      { key: "strengthReq", label: "STR Req", type: "number", placeholder: "13" },
      { key: "stealthDisadvantage", label: "Stealth Disadvantage", type: "boolean" },
      { key: "weightLb", label: "Weight (lb)", type: "number", placeholder: "40" },
      { key: "requiresAttunement", label: "Requires Attunement", type: "boolean" },
      { key: "costGp", label: "Cost (gp)", type: "number", placeholder: "75" },
    ],
  },
  {
    key: "items",
    label: "Items",
    description: "Consumables, quest items, tools, and miscellany.",
    fields: [
      { key: "rarity", label: "Rarity", type: "string", placeholder: "common" },
      { key: "stackSize", label: "Stack Size", type: "number", placeholder: "10" },
      { key: "weightLb", label: "Weight (lb)", type: "number", placeholder: "1" },
      { key: "requiresAttunement", label: "Requires Attunement", type: "boolean" },
      { key: "consumable", label: "Consumable", type: "boolean" },
    ],
  },
  {
    key: "monsters",
    label: "Monsters",
    description: "Monster stat blocks and encounter usage.",
    fields: [
      { key: "cr", label: "Challenge Rating", type: "string", placeholder: "1/2" },
      { key: "hp", label: "HP", type: "number", placeholder: "18" },
      { key: "ac", label: "AC", type: "number", placeholder: "13" },
      { key: "dexterity", label: "DEX", type: "number", placeholder: "12" },
      { key: "xp", label: "XP", type: "number", placeholder: "100" },
    ],
  },
  {
    key: "characters",
    label: "Characters",
    description: "Player characters and party members.",
    fields: [
      { key: "level", label: "Level", type: "number", placeholder: "3" },
      { key: "classId", label: "Class Id", type: "string", placeholder: "fighter" },
      { key: "raceId", label: "Race Id", type: "string", placeholder: "human" },
      { key: "hp", label: "HP", type: "number", placeholder: "24" },
      { key: "ac", label: "AC", type: "number", placeholder: "16" },
      { key: "strength", label: "STR", type: "number", placeholder: "15" },
      { key: "dexterity", label: "DEX", type: "number", placeholder: "14" },
      { key: "constitution", label: "CON", type: "number", placeholder: "13" },
      { key: "intelligence", label: "INT", type: "number", placeholder: "10" },
      { key: "wisdom", label: "WIS", type: "number", placeholder: "12" },
      { key: "charisma", label: "CHA", type: "number", placeholder: "8" },
      {
        key: "spellcastingAbility",
        label: "Spellcasting Ability",
        type: "string",
        placeholder: "intelligence",
      },
    ],
  },
  {
    key: "classes",
    label: "Classes",
    description: "Playable classes and progression.",
    fields: [
      { key: "hitDie", label: "Hit Die", type: "string", placeholder: "d8" },
      { key: "primaryAbility", label: "Primary Ability", type: "string", placeholder: "DEX" },
      { key: "spellcaster", label: "Spellcaster", type: "boolean" },
      { key: "casterProgression", label: "Caster Progression", type: "string", placeholder: "full" },
    ],
  },
  {
    key: "races",
    label: "Races",
    description: "Race/species traits and bonuses.",
    fields: [
      { key: "size", label: "Size", type: "string", placeholder: "Medium" },
      { key: "speed", label: "Speed", type: "number", placeholder: "30" },
      { key: "darkvision", label: "Darkvision", type: "boolean" },
    ],
  },
  {
    key: "spells",
    label: "Spells",
    description: "Spell definitions and scaling.",
    fields: [
      { key: "level", label: "Spell Level", type: "number", placeholder: "3" },
      { key: "school", label: "School", type: "string", placeholder: "evocation" },
      { key: "concentration", label: "Concentration", type: "boolean" },
      { key: "range", label: "Range", type: "string", placeholder: "60 feet" },
    ],
  },
  {
    key: "quests",
    label: "Quests",
    description: "Quest goals, rewards, and dependencies.",
    fields: [
      { key: "xpReward", label: "XP Reward", type: "number", placeholder: "250" },
      { key: "goldReward", label: "Gold Reward", type: "number", placeholder: "75" },
      { key: "status", label: "Status", type: "string", placeholder: "not_started" },
      { key: "repeatable", label: "Repeatable", type: "boolean" },
    ],
  },
  {
    key: "npcs",
    label: "NPCs",
    description: "NPC definitions and dialogue role tags.",
    fields: [
      { key: "role", label: "Role", type: "string", placeholder: "merchant" },
      { key: "faction", label: "Faction", type: "string", placeholder: "Guild" },
      { key: "hostile", label: "Hostile", type: "boolean" },
    ],
  },
  {
    key: "factions",
    label: "Factions",
    description: "Faction politics and reputations.",
    fields: [
      { key: "alignment", label: "Alignment", type: "string", placeholder: "neutral" },
      { key: "influence", label: "Influence", type: "number", placeholder: "50" },
      { key: "public", label: "Public Faction", type: "boolean" },
    ],
  },
  {
    key: "encounters",
    label: "Encounters",
    description: "Encounter templates and wave setups.",
    fields: [
      { key: "environment", label: "Environment", type: "string", placeholder: "cave" },
      { key: "budgetXp", label: "XP Budget", type: "number", placeholder: "450" },
      { key: "bossEncounter", label: "Boss Encounter", type: "boolean" },
    ],
  },
  {
    key: "lootTables",
    label: "Loot Tables",
    description: "Drop pools and weighted outcomes.",
    fields: [
      { key: "rolls", label: "Rolls", type: "number", placeholder: "2" },
      { key: "currencyMin", label: "Gold Min", type: "number", placeholder: "5" },
      { key: "currencyMax", label: "Gold Max", type: "number", placeholder: "25" },
      { key: "rareDrop", label: "Rare Drop Enabled", type: "boolean" },
    ],
  },
];

type CasterProgression = "full" | "half" | "third";

type CombatantInit = {
  tokenId: string;
  refId: string;
  name: string;
  side: "party" | "monster";
  dexterity: number;
  initiative: number;
};

type CombatState = {
  round: number;
  turnIndex: number;
  conditions: Record<string, string[]>;
  hpByToken: Record<string, number>;
};

type QuestObjective = {
  id: string;
  label: string;
  completed: boolean;
};

const FULL_CASTER_SLOTS: Record<number, number[]> = {
  1: [2],
  2: [3],
  3: [4, 2],
  4: [4, 3],
  5: [4, 3, 2],
  6: [4, 3, 3],
  7: [4, 3, 3, 1],
  8: [4, 3, 3, 2],
  9: [4, 3, 3, 3, 1],
  10: [4, 3, 3, 3, 2],
  11: [4, 3, 3, 3, 2, 1],
  12: [4, 3, 3, 3, 2, 1],
  13: [4, 3, 3, 3, 2, 1, 1],
  14: [4, 3, 3, 3, 2, 1, 1],
  15: [4, 3, 3, 3, 2, 1, 1, 1],
  16: [4, 3, 3, 3, 2, 1, 1, 1],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
  20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
};

const HALF_CASTER_SLOTS: Record<number, number[]> = {
  1: [],
  2: [2],
  3: [3],
  4: [3],
  5: [4, 2],
  6: [4, 2],
  7: [4, 3],
  8: [4, 3],
  9: [4, 3, 2],
  10: [4, 3, 2],
  11: [4, 3, 3],
  12: [4, 3, 3],
  13: [4, 3, 3, 1],
  14: [4, 3, 3, 1],
  15: [4, 3, 3, 2],
  16: [4, 3, 3, 2],
  17: [4, 3, 3, 3, 1],
  18: [4, 3, 3, 3, 1],
  19: [4, 3, 3, 3, 2],
  20: [4, 3, 3, 3, 2],
};

const THIRD_CASTER_SLOTS: Record<number, number[]> = {
  1: [],
  2: [],
  3: [2],
  4: [3],
  5: [3],
  6: [3],
  7: [4, 2],
  8: [4, 2],
  9: [4, 2],
  10: [4, 3],
  11: [4, 3],
  12: [4, 3],
  13: [4, 3, 2],
  14: [4, 3, 2],
  15: [4, 3, 2],
  16: [4, 3, 3],
  17: [4, 3, 3],
  18: [4, 3, 3],
  19: [4, 3, 3, 1],
  20: [4, 3, 3, 1],
};

const Page = styled.div`
  display: grid;
  grid-template-columns: 230px 280px 1fr;
  height: 100%;
  width: 100%;
  min-width: 0;
  min-height: 0;
`;

const Pane = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.sidebar.border};
  padding: 12px;
  overflow: auto;
  min-height: 0;
`;

const MainPane = styled(Pane)`
  border-right: 0;
`;

const CategoryButton = styled(Button)`
  width: 100%;
  text-align: left;
  margin-bottom: 6px;
`;

const EntryItem = styled.button<{ $selected: boolean }>`
  width: 100%;
  text-align: left;
  border: 1px solid
    ${(props) =>
      props.$selected
        ? props.theme.colors.highlight
        : props.theme.colors.input.border};
  background: ${(props) =>
    props.$selected
      ? props.theme.colors.menu.hoverBackground
      : props.theme.colors.input.background};
  color: ${(props) => props.theme.colors.text};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: 7px 8px;
  margin-bottom: 6px;
  cursor: pointer;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
  font-size: 14px;
`;

const Muted = styled.div`
  opacity: 0.8;
  font-size: 11px;
`;

const FieldBlock = styled.div`
  margin-bottom: 8px;
`;

const InlineRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const Chip = styled.div`
  border: 1px solid ${(props) => props.theme.colors.input.border};
  background: ${(props) => props.theme.colors.input.background};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: 4px 8px;
  font-size: 11px;
`;

const Status = styled.div`
  font-size: 11px;
  opacity: 0.9;
  min-height: 16px;
`;

const createId = () =>
  `rpg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

const createEntry = (name: string, fields: FieldDef[]): RPGEntry => {
  const values: Record<string, string | number | boolean> = {};
  fields.forEach((field) => {
    if (field.type === "number") {
      values[field.key] = 0;
    } else if (field.type === "boolean") {
      values[field.key] = false;
    } else {
      values[field.key] = "";
    }
  });

  return {
    id: createId(),
    name,
    notes: "",
    tags: [],
    fields: values,
  };
};

const asStringField = (value: string | number | boolean | undefined): string =>
  typeof value === "string" ? value : "";

const parsePartyLevels = (input: string): number[] =>
  input
    .split(/[,\s]+/)
    .map((v) => Number(v))
    .filter((v) => Number.isInteger(v) && v >= 1 && v <= 20);

const parseIdList = (input: string): string[] =>
  input
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

const asNumberField = (
  value: string | number | boolean | undefined,
  fallback = 0,
): number => (typeof value === "number" ? value : fallback);

const parseAbilityField = (
  value: string | number | boolean | undefined,
): Ability | null => {
  if (typeof value !== "string") {
    return null;
  }
  const ability = value.toLowerCase();
  if (
    ability === "strength" ||
    ability === "dexterity" ||
    ability === "constitution" ||
    ability === "intelligence" ||
    ability === "wisdom" ||
    ability === "charisma"
  ) {
    return ability;
  }
  return null;
};

const parseSpellSlotTable = (
  value: string | number | boolean | undefined,
): Record<number, number[]> | null => {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    const result: Record<number, number[]> = {};
    for (let level = 1; level <= 20; level += 1) {
      const key = String(level);
      const row = (parsed as Record<string, unknown>)[key];
      if (!Array.isArray(row)) {
        result[level] = [];
        continue;
      }
      result[level] = row
        .map((slot) => Number(slot))
        .filter((slot) => Number.isInteger(slot) && slot >= 0);
    }
    return result;
  } catch (_e) {
    return null;
  }
};

const generateSpellSlotTable = (
  progression: CasterProgression,
): Record<number, number[]> => {
  if (progression === "half") {
    return HALF_CASTER_SLOTS;
  }
  if (progression === "third") {
    return THIRD_CASTER_SLOTS;
  }
  return FULL_CASTER_SLOTS;
};

const parseInitiativeOrder = (
  value: string | number | boolean | undefined,
): CombatantInit[] => {
  if (typeof value !== "string" || value.trim().length === 0) {
    return [];
  }
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (entry): entry is CombatantInit =>
        !!entry &&
        typeof entry === "object" &&
        typeof (entry as { tokenId?: unknown }).tokenId === "string" &&
        typeof (entry as { refId?: unknown }).refId === "string" &&
        typeof (entry as { name?: unknown }).name === "string" &&
        ((entry as { side?: unknown }).side === "party" ||
          (entry as { side?: unknown }).side === "monster") &&
        typeof (entry as { dexterity?: unknown }).dexterity === "number" &&
        typeof (entry as { initiative?: unknown }).initiative === "number",
    );
  } catch (_e) {
    return [];
  }
};

const parseCombatState = (
  value: string | number | boolean | undefined,
): CombatState | null => {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    const round = Number((parsed as { round?: unknown }).round);
    const turnIndex = Number((parsed as { turnIndex?: unknown }).turnIndex);
    const rawConditions = (parsed as { conditions?: unknown }).conditions;
    const rawHp = (parsed as { hpByToken?: unknown }).hpByToken;
    const conditions: Record<string, string[]> = {};
    const hpByToken: Record<string, number> = {};
    if (rawConditions && typeof rawConditions === "object") {
      Object.entries(rawConditions as Record<string, unknown>).forEach(
        ([tokenId, entries]) => {
          if (!Array.isArray(entries)) {
            return;
          }
          conditions[tokenId] = entries
            .map((entry) => String(entry).trim())
            .filter(Boolean);
        },
      );
    }
    if (rawHp && typeof rawHp === "object") {
      Object.entries(rawHp as Record<string, unknown>).forEach(
        ([tokenId, hp]) => {
          const parsedHp = Number(hp);
          if (Number.isFinite(parsedHp)) {
            hpByToken[tokenId] = parsedHp;
          }
        },
      );
    }
    if (!Number.isInteger(round) || round < 1) {
      return null;
    }
    if (!Number.isInteger(turnIndex) || turnIndex < 0) {
      return null;
    }
    return { round, turnIndex, conditions, hpByToken };
  } catch (_e) {
    return null;
  }
};

const parseQuestObjectives = (
  value: string | number | boolean | undefined,
): QuestObjective[] => {
  if (typeof value !== "string" || value.trim().length === 0) {
    return [];
  }
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .filter(
        (entry): entry is QuestObjective =>
          !!entry &&
          typeof entry === "object" &&
          typeof (entry as { id?: unknown }).id === "string" &&
          typeof (entry as { label?: unknown }).label === "string" &&
          typeof (entry as { completed?: unknown }).completed === "boolean",
      )
      .map((entry) => ({
        id: entry.id,
        label: entry.label,
        completed: entry.completed,
      }));
  } catch (_e) {
    return [];
  }
};

const RPG5EPage = () => {
  const [data, setData] = useState<RPG5EData>(() => createDefaultRPG5EData());
  const [activeCategory, setActiveCategory] = useState<RPGCategoryKey>("maps");
  const [selectedEntryId, setSelectedEntryId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Loading RPG data...");
  const [pendingCondition, setPendingCondition] = useState("");
  const [pendingHpDelta, setPendingHpDelta] = useState("1");
  const [pendingObjective, setPendingObjective] = useState("");

  const activeDef = useMemo(
    () => categories.find((c) => c.key === activeCategory) || categories[0],
    [activeCategory],
  );

  const entries = data.categories[activeCategory];
  const visibleEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return entries;
    }
    return entries.filter(
      (entry) =>
        entry.name.toLowerCase().includes(q) ||
        entry.tags.join(" ").toLowerCase().includes(q),
    );
  }, [entries, search]);

  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.id === selectedEntryId),
    [entries, selectedEntryId],
  );
  const weapons = data.categories.weapons;
  const armors = data.categories.armors;
  const items = data.categories.items;
  const monsters = data.categories.monsters;
  const characters = data.categories.characters;
  const classes = data.categories.classes;
  const weaponsLookup = useMemo(
    () =>
      weapons.reduce(
        (memo, weapon) => {
          memo[weapon.id] = weapon;
          return memo;
        },
        {} as Record<string, RPGEntry>,
      ),
    [weapons],
  );
  const armorsLookup = useMemo(
    () =>
      armors.reduce(
        (memo, armor) => {
          memo[armor.id] = armor;
          return memo;
        },
        {} as Record<string, RPGEntry>,
      ),
    [armors],
  );
  const itemsLookup = useMemo(
    () =>
      items.reduce(
        (memo, item) => {
          memo[item.id] = item;
          return memo;
        },
        {} as Record<string, RPGEntry>,
      ),
    [items],
  );
  const monsterLookup = useMemo(
    () =>
      monsters.reduce(
        (memo, monster) => {
          memo[monster.id] = monster;
          return memo;
        },
        {} as Record<string, RPGEntry>,
      ),
    [monsters],
  );
  const characterLookup = useMemo(
    () =>
      characters.reduce(
        (memo, character) => {
          memo[character.id] = character;
          return memo;
        },
        {} as Record<string, RPGEntry>,
      ),
    [characters],
  );
  const classLookup = useMemo(
    () =>
      classes.reduce(
        (memo, classEntry) => {
          memo[classEntry.id] = classEntry;
          return memo;
        },
        {} as Record<string, RPGEntry>,
      ),
    [classes],
  );

  const load = useCallback(async () => {
    try {
      const loaded = await API.project.loadRPG5EData();
      const safe = coerceRPG5EData(loaded);
      setData(safe);
      setStatus("RPG data loaded");
    } catch (_e) {
      setData(createDefaultRPG5EData());
      setStatus("Failed to load RPG data. Using defaults.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const existing = entries.find((entry) => entry.id === selectedEntryId);
    if (!existing) {
      setSelectedEntryId(entries[0]?.id || "");
    }
  }, [entries, selectedEntryId]);

  const save = useCallback(async () => {
    try {
      const ok = await API.project.saveRPG5EData(data);
      setStatus(ok ? "RPG data saved" : "Failed to save RPG data");
    } catch (_e) {
      setStatus("Failed to save RPG data");
    }
  }, [data]);

  const exportJson = useCallback(() => {
    navigator.clipboard
      .writeText(JSON.stringify(data, null, 2))
      .then(() => setStatus("Copied RPG JSON to clipboard"))
      .catch(() => setStatus("Failed to copy RPG JSON"));
  }, [data]);

  const addEntry = useCallback(() => {
    const entry = createEntry(`New ${activeDef.label.slice(0, -1)}`, activeDef.fields);
    setData((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [activeCategory]: [...prev.categories[activeCategory], entry],
      },
    }));
    setSelectedEntryId(entry.id);
  }, [activeCategory, activeDef.fields, activeDef.label]);

  const removeEntry = useCallback(() => {
    if (!selectedEntryId) {
      return;
    }
    setData((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [activeCategory]: prev.categories[activeCategory].filter(
          (entry) => entry.id !== selectedEntryId,
        ),
      },
    }));
    setSelectedEntryId("");
  }, [activeCategory, selectedEntryId]);

  const updateSelected = useCallback(
    (patch: Partial<RPGEntry>) => {
      if (!selectedEntryId) {
        return;
      }
      setData((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          [activeCategory]: prev.categories[activeCategory].map((entry) =>
            entry.id === selectedEntryId ? { ...entry, ...patch } : entry,
          ),
        },
      }));
    },
    [activeCategory, selectedEntryId],
  );

  const updateSelectedField = useCallback(
    (key: string, value: string | number | boolean) => {
      if (!selectedEntryId) {
        return;
      }
      setData((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          [activeCategory]: prev.categories[activeCategory].map((entry) =>
            entry.id === selectedEntryId
              ? {
                  ...entry,
                  fields: {
                    ...entry.fields,
                    [key]: value,
                  },
                }
              : entry,
          ),
        },
      }));
    },
    [activeCategory, selectedEntryId],
  );

  const appendRefField = useCallback(
    (field: string, id: string) => {
      if (!selectedEntry) {
        return;
      }
      const existing = parseIdList(asStringField(selectedEntry.fields[field]));
      updateSelectedField(field, [...existing, id].join(","));
    },
    [selectedEntry, updateSelectedField],
  );

  const removeRefField = useCallback(
    (field: string, index: number) => {
      if (!selectedEntry) {
        return;
      }
      const existing = parseIdList(asStringField(selectedEntry.fields[field]));
      updateSelectedField(
        field,
        existing.filter((_, i) => i !== index).join(","),
      );
    },
    [selectedEntry, updateSelectedField],
  );

  const setCombatState = useCallback(
    (state: CombatState | null) => {
      if (!selectedEntry || activeCategory !== "encounters") {
        return;
      }
      updateSelectedField("combatState", state ? JSON.stringify(state) : "");
    },
    [activeCategory, selectedEntry, updateSelectedField],
  );

  const setQuestObjectives = useCallback(
    (objectives: QuestObjective[]) => {
      if (!selectedEntry || activeCategory !== "quests") {
        return;
      }
      updateSelectedField("objectives", JSON.stringify(objectives));
    },
    [activeCategory, selectedEntry, updateSelectedField],
  );

  const encounterMonsterIds = useMemo(() => {
    if (!selectedEntry || activeCategory !== "encounters") {
      return [] as string[];
    }
    return parseIdList(asStringField(selectedEntry.fields.monsterRefs));
  }, [activeCategory, selectedEntry]);
  const encounterPartyIds = useMemo(() => {
    if (!selectedEntry || activeCategory !== "encounters") {
      return [] as string[];
    }
    return parseIdList(asStringField(selectedEntry.fields.partyRefs));
  }, [activeCategory, selectedEntry]);

  const encounterEvaluation = useMemo(() => {
    if (!selectedEntry || activeCategory !== "encounters") {
      return null;
    }
    const partyLevels = parsePartyLevels(
      asStringField(selectedEntry.fields.partyLevels),
    );
    if (partyLevels.length === 0 || encounterMonsterIds.length === 0) {
      return null;
    }
    const crs: string[] = encounterMonsterIds
      .map((id) => asStringField(monsterLookup[id]?.fields.cr))
      .filter(Boolean);
    if (crs.length === 0) {
      return null;
    }
    try {
      return evaluateEncounter(partyLevels, crs);
    } catch (_e) {
      return null;
    }
  }, [activeCategory, encounterMonsterIds, monsterLookup, selectedEntry]);

  const addMonsterToEncounter = useCallback(
    (monsterId: string) => {
      if (!selectedEntry || activeCategory !== "encounters") {
        return;
      }
      const nextIds = [...encounterMonsterIds, monsterId];
      updateSelectedField("monsterRefs", nextIds.join(","));
    },
    [
      activeCategory,
      encounterMonsterIds,
      selectedEntry,
      updateSelectedField,
    ],
  );

  const addCharacterToEncounter = useCallback(
    (characterId: string) => {
      if (!selectedEntry || activeCategory !== "encounters") {
        return;
      }
      const nextIds = [...encounterPartyIds, characterId];
      updateSelectedField("partyRefs", nextIds.join(","));
    },
    [
      activeCategory,
      encounterPartyIds,
      selectedEntry,
      updateSelectedField,
    ],
  );

  const removeMonsterFromEncounter = useCallback(
    (index: number) => {
      if (!selectedEntry || activeCategory !== "encounters") {
        return;
      }
      const nextIds = encounterMonsterIds.filter((_, i) => i !== index);
      updateSelectedField("monsterRefs", nextIds.join(","));
    },
    [
      activeCategory,
      encounterMonsterIds,
      selectedEntry,
      updateSelectedField,
    ],
  );

  const removeCharacterFromEncounter = useCallback(
    (index: number) => {
      if (!selectedEntry || activeCategory !== "encounters") {
        return;
      }
      const nextIds = encounterPartyIds.filter((_, i) => i !== index);
      updateSelectedField("partyRefs", nextIds.join(","));
    },
    [
      activeCategory,
      encounterPartyIds,
      selectedEntry,
      updateSelectedField,
    ],
  );

  const makeCombatStateFromInitiative = useCallback(
    (order: CombatantInit[]): CombatState => {
      const hpByToken: Record<string, number> = {};
      order.forEach((entry) => {
        if (entry.side === "party") {
          hpByToken[entry.tokenId] = asNumberField(
            characterLookup[entry.refId]?.fields.hp,
            1,
          );
        } else {
          hpByToken[entry.tokenId] = asNumberField(
            monsterLookup[entry.refId]?.fields.hp,
            1,
          );
        }
      });
      return {
        round: 1,
        turnIndex: 0,
        conditions: {},
        hpByToken,
      };
    },
    [characterLookup, monsterLookup],
  );

  const buildInitiativeOrder = useCallback(() => {
    if (!selectedEntry || activeCategory !== "encounters") {
      return;
    }
    const combatants: CombatantInit[] = [];

    encounterPartyIds.forEach((id, index) => {
      const character = characterLookup[id];
      if (!character) {
        return;
      }
      const dexterity = asNumberField(character.fields.dexterity, 10);
      combatants.push({
        tokenId: `party:${id}:${index}`,
        refId: id,
        name: character.name,
        side: "party",
        dexterity,
        initiative: initiativeRoll(dexterity).total,
      });
    });

    encounterMonsterIds.forEach((id, index) => {
      const monster = monsterLookup[id];
      if (!monster) {
        return;
      }
      const dexterity = asNumberField(monster.fields.dexterity, 10);
      combatants.push({
        tokenId: `monster:${id}:${index}`,
        refId: id,
        name: monster.name,
        side: "monster",
        dexterity,
        initiative: initiativeRoll(dexterity).total,
      });
    });

    const ordered = combatants.sort((a, b) => b.initiative - a.initiative);
    updateSelectedField("initiativeOrder", JSON.stringify(ordered));
    updateSelectedField("combatState", JSON.stringify(makeCombatStateFromInitiative(ordered)));
    setStatus(`Generated initiative for ${ordered.length} combatants`);
  }, [
    activeCategory,
    characterLookup,
    encounterMonsterIds,
    encounterPartyIds,
    makeCombatStateFromInitiative,
    monsterLookup,
    selectedEntry,
    updateSelectedField,
  ]);

  const initiativeOrder = useMemo(() => {
    if (!selectedEntry || activeCategory !== "encounters") {
      return [] as CombatantInit[];
    }
    return parseInitiativeOrder(selectedEntry.fields.initiativeOrder);
  }, [activeCategory, selectedEntry]);

  const combatState = useMemo(() => {
    if (!selectedEntry || activeCategory !== "encounters") {
      return null;
    }
    return parseCombatState(selectedEntry.fields.combatState);
  }, [activeCategory, selectedEntry]);

  const questObjectives = useMemo(() => {
    if (!selectedEntry || activeCategory !== "quests") {
      return [] as QuestObjective[];
    }
    return parseQuestObjectives(selectedEntry.fields.objectives);
  }, [activeCategory, selectedEntry]);

  const questProgress = useMemo(() => {
    if (questObjectives.length === 0) {
      return 0;
    }
    const completed = questObjectives.filter((objective) => objective.completed).length;
    return Math.round((completed / questObjectives.length) * 100);
  }, [questObjectives]);

  const currentCombatant = useMemo(() => {
    if (!combatState || initiativeOrder.length === 0) {
      return null;
    }
    return initiativeOrder[combatState.turnIndex] || null;
  }, [combatState, initiativeOrder]);

  const currentCombatantHp = useMemo(() => {
    if (!combatState || !currentCombatant) {
      return null;
    }
    const hp = combatState.hpByToken[currentCombatant.tokenId];
    return typeof hp === "number" ? hp : null;
  }, [combatState, currentCombatant]);

  const nextTurn = useCallback(() => {
    if (!combatState || initiativeOrder.length === 0) {
      return;
    }
    const atEnd = combatState.turnIndex >= initiativeOrder.length - 1;
    const nextState: CombatState = {
      ...combatState,
      turnIndex: atEnd ? 0 : combatState.turnIndex + 1,
      round: atEnd ? combatState.round + 1 : combatState.round,
    };
    setCombatState(nextState);
  }, [combatState, initiativeOrder.length, setCombatState]);

  const previousTurn = useCallback(() => {
    if (!combatState || initiativeOrder.length === 0) {
      return;
    }
    const atStart = combatState.turnIndex === 0;
    const nextState: CombatState = {
      ...combatState,
      turnIndex: atStart ? Math.max(0, initiativeOrder.length - 1) : combatState.turnIndex - 1,
      round: atStart ? Math.max(1, combatState.round - 1) : combatState.round,
    };
    setCombatState(nextState);
  }, [combatState, initiativeOrder.length, setCombatState]);

  const addConditionToCurrent = useCallback(() => {
    if (!combatState || !currentCombatant || !pendingCondition.trim()) {
      return;
    }
    const key = currentCombatant.tokenId;
    const existing = combatState.conditions[key] || [];
    const nextState: CombatState = {
      ...combatState,
      conditions: {
        ...combatState.conditions,
        [key]: [...existing, pendingCondition.trim()],
      },
    };
    setCombatState(nextState);
    setPendingCondition("");
  }, [combatState, currentCombatant, pendingCondition, setCombatState]);

  const applyHpToCurrent = useCallback(
    (mode: "damage" | "heal") => {
      if (!combatState || !currentCombatant) {
        return;
      }
      const delta = Math.max(0, Number(pendingHpDelta || "0"));
      const prev = combatState.hpByToken[currentCombatant.tokenId] ?? 0;
      const nextHp = mode === "damage" ? Math.max(0, prev - delta) : prev + delta;
      setCombatState({
        ...combatState,
        hpByToken: {
          ...combatState.hpByToken,
          [currentCombatant.tokenId]: nextHp,
        },
      });
    },
    [combatState, currentCombatant, pendingHpDelta, setCombatState],
  );

  const addQuestObjective = useCallback(() => {
    if (!selectedEntry || activeCategory !== "quests" || !pendingObjective.trim()) {
      return;
    }
    const next: QuestObjective[] = [
      ...questObjectives,
      {
        id: createId(),
        label: pendingObjective.trim(),
        completed: false,
      },
    ];
    setQuestObjectives(next);
    setPendingObjective("");
  }, [
    activeCategory,
    pendingObjective,
    questObjectives,
    selectedEntry,
    setQuestObjectives,
  ]);

  const toggleQuestObjective = useCallback(
    (objectiveId: string) => {
      if (!selectedEntry || activeCategory !== "quests") {
        return;
      }
      const next = questObjectives.map((objective) =>
        objective.id === objectiveId
          ? { ...objective, completed: !objective.completed }
          : objective,
      );
      setQuestObjectives(next);
    },
    [activeCategory, questObjectives, selectedEntry, setQuestObjectives],
  );

  const removeQuestObjective = useCallback(
    (index: number) => {
      if (!selectedEntry || activeCategory !== "quests") {
        return;
      }
      const next = questObjectives.filter((_, i) => i !== index);
      setQuestObjectives(next);
    },
    [activeCategory, questObjectives, selectedEntry, setQuestObjectives],
  );

  const removeConditionFromCurrent = useCallback(
    (index: number) => {
      if (!combatState || !currentCombatant) {
        return;
      }
      const key = currentCombatant.tokenId;
      const existing = combatState.conditions[key] || [];
      const nextState: CombatState = {
        ...combatState,
        conditions: {
          ...combatState.conditions,
          [key]: existing.filter((_, i) => i !== index),
        },
      };
      setCombatState(nextState);
    },
    [combatState, currentCombatant, setCombatState],
  );

  const autoFillMonsterXp = useCallback(() => {
    if (!selectedEntry || activeCategory !== "monsters") {
      return;
    }
    const cr = asStringField(selectedEntry.fields.cr);
    if (!cr) {
      setStatus("Set monster CR first");
      return;
    }
    try {
      const xp = xpForCr(cr);
      updateSelectedField("xp", xp);
      setStatus(`Monster XP set to ${xp} from CR ${cr}`);
    } catch (_e) {
      setStatus(`Unsupported CR value: ${cr}`);
    }
  }, [activeCategory, selectedEntry, updateSelectedField]);

  const characterDerived = useMemo(() => {
    if (!selectedEntry || activeCategory !== "characters") {
      return null;
    }
    const level = Math.max(1, asNumberField(selectedEntry.fields.level, 1));
    const proficiency = proficiencyBonusByLevel(level);
    const strength = asNumberField(selectedEntry.fields.strength, 10);
    const dexterity = asNumberField(selectedEntry.fields.dexterity, 10);
    const constitution = asNumberField(selectedEntry.fields.constitution, 10);
    const intelligence = asNumberField(selectedEntry.fields.intelligence, 10);
    const wisdom = asNumberField(selectedEntry.fields.wisdom, 10);
    const charisma = asNumberField(selectedEntry.fields.charisma, 10);
    const spellAbility = parseAbilityField(
      selectedEntry.fields.spellcastingAbility,
    );
    const classId = asStringField(selectedEntry.fields.classId);
    const classEntry = classLookup[classId];
    const classSpellTable = parseSpellSlotTable(classEntry?.fields.spellSlotTable);
    const classSlotsAtLevel = classSpellTable?.[level] || [];
    const spellMod = spellAbility
      ? abilityModifier(
          spellAbility === "strength"
            ? strength
            : spellAbility === "dexterity"
              ? dexterity
              : spellAbility === "constitution"
                ? constitution
                : spellAbility === "intelligence"
                  ? intelligence
                  : spellAbility === "wisdom"
                    ? wisdom
                    : charisma,
        )
      : null;

    return {
      proficiency,
      strMod: abilityModifier(strength),
      dexMod: abilityModifier(dexterity),
      conMod: abilityModifier(constitution),
      intMod: abilityModifier(intelligence),
      wisMod: abilityModifier(wisdom),
      chaMod: abilityModifier(charisma),
      spellSave: spellMod === null ? null : spellSaveDC(spellMod, proficiency),
      spellAttack:
        spellMod === null ? null : spellAttackBonus(spellMod, proficiency),
      passivePerception: 10 + abilityModifier(wisdom),
      classSlotsAtLevel,
    };
  }, [activeCategory, classLookup, selectedEntry]);

  const characterWeaponIds = useMemo(() => {
    if (!selectedEntry || activeCategory !== "characters") {
      return [] as string[];
    }
    return parseIdList(asStringField(selectedEntry.fields.weaponRefs));
  }, [activeCategory, selectedEntry]);

  const characterArmorIds = useMemo(() => {
    if (!selectedEntry || activeCategory !== "characters") {
      return [] as string[];
    }
    return parseIdList(asStringField(selectedEntry.fields.armorRefs));
  }, [activeCategory, selectedEntry]);

  const characterItemIds = useMemo(() => {
    if (!selectedEntry || activeCategory !== "characters") {
      return [] as string[];
    }
    return parseIdList(asStringField(selectedEntry.fields.itemRefs));
  }, [activeCategory, selectedEntry]);

  const characterAttunedIds = useMemo(() => {
    if (!selectedEntry || activeCategory !== "characters") {
      return [] as string[];
    }
    return parseIdList(asStringField(selectedEntry.fields.attunedRefs));
  }, [activeCategory, selectedEntry]);

  const characterInventoryStats = useMemo(() => {
    if (!selectedEntry || activeCategory !== "characters") {
      return null;
    }
    const strength = asNumberField(selectedEntry.fields.strength, 10);
    const carryingCapacity = strength * 15;
    const encumberedAt = strength * 5;
    const heavilyEncumberedAt = strength * 10;
    const getWeight = (entry?: RPGEntry) =>
      entry ? asNumberField(entry.fields.weightLb, 0) : 0;

    const weightWeapons = characterWeaponIds.reduce(
      (sum, id) => sum + getWeight(weaponsLookup[id]),
      0,
    );
    const weightArmors = characterArmorIds.reduce(
      (sum, id) => sum + getWeight(armorsLookup[id]),
      0,
    );
    const weightItems = characterItemIds.reduce(
      (sum, id) => sum + getWeight(itemsLookup[id]),
      0,
    );
    const totalWeight = weightWeapons + weightArmors + weightItems;

    const getRequiresAttunement = (entry?: RPGEntry) =>
      Boolean(entry && entry.fields.requiresAttunement);

    const attunableIds = [
      ...characterWeaponIds.filter((id) => getRequiresAttunement(weaponsLookup[id])),
      ...characterArmorIds.filter((id) => getRequiresAttunement(armorsLookup[id])),
      ...characterItemIds.filter((id) => getRequiresAttunement(itemsLookup[id])),
    ];

    const uniqueAttunable = Array.from(new Set(attunableIds));

    return {
      carryingCapacity,
      encumberedAt,
      heavilyEncumberedAt,
      totalWeight,
      attunedCount: characterAttunedIds.length,
      attunementLimit: 3,
      attunableIds: uniqueAttunable,
      overCapacity: totalWeight > carryingCapacity,
      heavilyEncumbered:
        totalWeight > heavilyEncumberedAt && totalWeight <= carryingCapacity,
      encumbered:
        totalWeight > encumberedAt && totalWeight <= heavilyEncumberedAt,
    };
  }, [
    activeCategory,
    armorsLookup,
    characterArmorIds,
    characterAttunedIds.length,
    characterItemIds,
    characterWeaponIds,
    itemsLookup,
    selectedEntry,
    weaponsLookup,
  ]);

  const classSpellSlotTable = useMemo(() => {
    if (!selectedEntry || activeCategory !== "classes") {
      return null;
    }
    return parseSpellSlotTable(selectedEntry.fields.spellSlotTable);
  }, [activeCategory, selectedEntry]);

  const setClassSpellProgression = useCallback(
    (progression: CasterProgression) => {
      if (!selectedEntry || activeCategory !== "classes") {
        return;
      }
      const table = generateSpellSlotTable(progression);
      updateSelectedField("casterProgression", progression);
      updateSelectedField("spellcaster", true);
      updateSelectedField("spellSlotTable", JSON.stringify(table));
      setStatus(`Generated ${progression} caster spell slot table`);
    },
    [activeCategory, selectedEntry, updateSelectedField],
  );

  return (
    <Page>
      <Pane>
        <Title>RPG DND5E Editor</Title>
        <Muted>Maps, dungeons, zones, biomes, items, monsters, and more.</Muted>
        <ButtonRow>
          <Button onClick={save}>Save</Button>
          <Button onClick={load}>Reload</Button>
          <Button onClick={exportJson}>Copy JSON</Button>
        </ButtonRow>
        <Status>{status}</Status>
        <hr />
        {categories.map((category) => (
          <CategoryButton
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            active={activeCategory === category.key}
            variant={activeCategory === category.key ? "primary" : "normal"}
          >
            {category.label} ({data.categories[category.key].length})
          </CategoryButton>
        ))}
      </Pane>

      <Pane>
        <Title>{activeDef.label}</Title>
        <Muted>{activeDef.description}</Muted>
        <FieldBlock>
          <Label>Search</Label>
          <Input
            value={search}
            placeholder={`Search ${activeDef.label.toLowerCase()}...`}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </FieldBlock>
        <ButtonRow>
          <Button onClick={addEntry}>Add</Button>
          <Button onClick={removeEntry} disabled={!selectedEntryId}>
            Remove
          </Button>
        </ButtonRow>
        {visibleEntries.map((entry) => (
          <EntryItem
            key={entry.id}
            $selected={entry.id === selectedEntryId}
            onClick={() => setSelectedEntryId(entry.id)}
          >
            {entry.name}
          </EntryItem>
        ))}
      </Pane>

      <MainPane>
        {!selectedEntry && <Muted>Select or create an entry to edit.</Muted>}
        {selectedEntry && (
          <>
            <FieldBlock>
              <Label>Name</Label>
              <Input
                value={selectedEntry.name}
                onChange={(e) => updateSelected({ name: e.currentTarget.value })}
              />
            </FieldBlock>
            <FieldBlock>
              <Label>Tags (comma separated)</Label>
              <Input
                value={selectedEntry.tags.join(", ")}
                onChange={(e) =>
                  updateSelected({
                    tags: e.currentTarget.value
                      .split(",")
                      .map((v) => v.trim())
                      .filter(Boolean),
                  })
                }
              />
            </FieldBlock>
            {activeCategory === "monsters" && (
              <FieldBlock>
                <InlineRow>
                  <Button onClick={autoFillMonsterXp}>Auto XP From CR</Button>
                </InlineRow>
              </FieldBlock>
            )}
            {activeCategory === "characters" && characterDerived && (
              <FieldBlock>
                <Label>Derived Stats</Label>
                <InlineRow>
                  <Chip>Prof +{characterDerived.proficiency}</Chip>
                  <Chip>STR {characterDerived.strMod >= 0 ? "+" : ""}{characterDerived.strMod}</Chip>
                  <Chip>DEX {characterDerived.dexMod >= 0 ? "+" : ""}{characterDerived.dexMod}</Chip>
                  <Chip>CON {characterDerived.conMod >= 0 ? "+" : ""}{characterDerived.conMod}</Chip>
                  <Chip>INT {characterDerived.intMod >= 0 ? "+" : ""}{characterDerived.intMod}</Chip>
                  <Chip>WIS {characterDerived.wisMod >= 0 ? "+" : ""}{characterDerived.wisMod}</Chip>
                  <Chip>CHA {characterDerived.chaMod >= 0 ? "+" : ""}{characterDerived.chaMod}</Chip>
                  <Chip>Passive Perception {characterDerived.passivePerception}</Chip>
                  {characterDerived.spellSave !== null && (
                    <Chip>Spell Save DC {characterDerived.spellSave}</Chip>
                  )}
                  {characterDerived.spellAttack !== null && (
                    <Chip>Spell Attack +{characterDerived.spellAttack}</Chip>
                  )}
                  {characterDerived.classSlotsAtLevel.length > 0 && (
                    <Chip>
                      Slots L{asNumberField(selectedEntry.fields.level, 1)}:{" "}
                      {characterDerived.classSlotsAtLevel
                        .map((slots, i) => `${i + 1}:${slots}`)
                        .join(" ")}
                    </Chip>
                  )}
                </InlineRow>
              </FieldBlock>
            )}
            {activeCategory === "characters" && characterInventoryStats && (
              <FieldBlock>
                <Label>Inventory & Equipment</Label>
                <InlineRow>
                  <Chip>Weight {characterInventoryStats.totalWeight.toFixed(1)} lb</Chip>
                  <Chip>Capacity {characterInventoryStats.carryingCapacity} lb</Chip>
                  <Chip>Attunement {characterInventoryStats.attunedCount}/3</Chip>
                  {characterInventoryStats.overCapacity && (
                    <Chip>Over Capacity</Chip>
                  )}
                  {!characterInventoryStats.overCapacity &&
                    characterInventoryStats.heavilyEncumbered && (
                      <Chip>Heavily Encumbered</Chip>
                    )}
                  {!characterInventoryStats.overCapacity &&
                    !characterInventoryStats.heavilyEncumbered &&
                    characterInventoryStats.encumbered && (
                      <Chip>Encumbered</Chip>
                    )}
                </InlineRow>

                <FieldBlock>
                  <Label>Equipped Weapons</Label>
                  <InlineRow>
                    {characterWeaponIds.map((id, index) => (
                      <Chip key={`${id}_${index}`}>
                        {weaponsLookup[id]?.name || id}{" "}
                        <button onClick={() => removeRefField("weaponRefs", index)}>
                          x
                        </button>
                      </Chip>
                    ))}
                  </InlineRow>
                  <InlineRow>
                    {weapons.map((weapon) => (
                      <Button
                        key={weapon.id}
                        size="small"
                        onClick={() => appendRefField("weaponRefs", weapon.id)}
                      >
                        + {weapon.name}
                      </Button>
                    ))}
                  </InlineRow>
                </FieldBlock>

                <FieldBlock>
                  <Label>Equipped Armor</Label>
                  <InlineRow>
                    {characterArmorIds.map((id, index) => (
                      <Chip key={`${id}_${index}`}>
                        {armorsLookup[id]?.name || id}{" "}
                        <button onClick={() => removeRefField("armorRefs", index)}>
                          x
                        </button>
                      </Chip>
                    ))}
                  </InlineRow>
                  <InlineRow>
                    {armors.map((armor) => (
                      <Button
                        key={armor.id}
                        size="small"
                        onClick={() => appendRefField("armorRefs", armor.id)}
                      >
                        + {armor.name}
                      </Button>
                    ))}
                  </InlineRow>
                </FieldBlock>

                <FieldBlock>
                  <Label>Inventory Items</Label>
                  <InlineRow>
                    {characterItemIds.map((id, index) => (
                      <Chip key={`${id}_${index}`}>
                        {itemsLookup[id]?.name || id}{" "}
                        <button onClick={() => removeRefField("itemRefs", index)}>
                          x
                        </button>
                      </Chip>
                    ))}
                  </InlineRow>
                  <InlineRow>
                    {items.map((item) => (
                      <Button
                        key={item.id}
                        size="small"
                        onClick={() => appendRefField("itemRefs", item.id)}
                      >
                        + {item.name}
                      </Button>
                    ))}
                  </InlineRow>
                </FieldBlock>

                <FieldBlock>
                  <Label>Attunement</Label>
                  <InlineRow>
                    {characterAttunedIds.map((id, index) => (
                      <Chip key={`${id}_${index}`}>
                        {weaponsLookup[id]?.name ||
                          armorsLookup[id]?.name ||
                          itemsLookup[id]?.name ||
                          id}{" "}
                        <button onClick={() => removeRefField("attunedRefs", index)}>
                          x
                        </button>
                      </Chip>
                    ))}
                  </InlineRow>
                  <InlineRow>
                    {characterInventoryStats.attunableIds.map((id) => (
                      <Button
                        key={id}
                        size="small"
                        disabled={characterAttunedIds.includes(id)}
                        onClick={() => appendRefField("attunedRefs", id)}
                      >
                        Attune{" "}
                        {weaponsLookup[id]?.name ||
                          armorsLookup[id]?.name ||
                          itemsLookup[id]?.name ||
                          id}
                      </Button>
                    ))}
                  </InlineRow>
                </FieldBlock>
              </FieldBlock>
            )}
            {activeCategory === "classes" && (
              <FieldBlock>
                <Label>Spell Slot Progression</Label>
                <InlineRow>
                  <Button onClick={() => setClassSpellProgression("full")}>
                    Generate Full Caster
                  </Button>
                  <Button onClick={() => setClassSpellProgression("half")}>
                    Generate Half Caster
                  </Button>
                  <Button onClick={() => setClassSpellProgression("third")}>
                    Generate Third Caster
                  </Button>
                  <Button onClick={() => updateSelectedField("spellSlotTable", "")}>
                    Clear Table
                  </Button>
                </InlineRow>
                {classSpellSlotTable && (
                  <InlineRow>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((level) => {
                      const slots = classSpellSlotTable[level] || [];
                      return (
                        <Chip key={level}>
                          L{level}:{" "}
                          {slots.length > 0
                            ? slots
                                .map((value, index) => `${index + 1}:${value}`)
                                .join(" ")
                            : "-"}
                        </Chip>
                      );
                    })}
                  </InlineRow>
                )}
              </FieldBlock>
            )}
            {activeCategory === "quests" && (
              <FieldBlock>
                <Label>Quest Objectives</Label>
                <InlineRow>
                  <Chip>
                    Progress {questProgress}% ({questObjectives.filter((objective) => objective.completed).length}/
                    {questObjectives.length})
                  </Chip>
                </InlineRow>
                <InlineRow>
                  <Input
                    placeholder="New objective"
                    value={pendingObjective}
                    onChange={(e) => setPendingObjective(e.currentTarget.value)}
                  />
                  <Button onClick={addQuestObjective}>Add Objective</Button>
                </InlineRow>
                <InlineRow>
                  {questObjectives.map((objective, index) => (
                    <Chip key={objective.id}>
                      <button onClick={() => toggleQuestObjective(objective.id)}>
                        {objective.completed ? "[x]" : "[ ]"}
                      </button>{" "}
                      {objective.label}{" "}
                      <button onClick={() => removeQuestObjective(index)}>x</button>
                    </Chip>
                  ))}
                </InlineRow>
              </FieldBlock>
            )}
            {activeCategory === "encounters" && (
              <FieldBlock>
                <Label>Encounter Builder</Label>
                <FieldBlock>
                  <Label>Party Members</Label>
                  <InlineRow>
                    {encounterPartyIds.map((id, index) => {
                      const character = characterLookup[id];
                      return (
                        <Chip key={`${id}_${index}`}>
                          {character?.name || id}{" "}
                          <button onClick={() => removeCharacterFromEncounter(index)}>
                            x
                          </button>
                        </Chip>
                      );
                    })}
                  </InlineRow>
                  <InlineRow>
                    {characters.map((character) => (
                      <Button
                        key={character.id}
                        size="small"
                        onClick={() => addCharacterToEncounter(character.id)}
                      >
                        + {character.name}
                      </Button>
                    ))}
                  </InlineRow>
                </FieldBlock>
                <FieldBlock>
                  <Label>Party Levels (comma/space separated)</Label>
                  <Input
                    placeholder="3, 3, 3, 3"
                    value={asStringField(selectedEntry.fields.partyLevels)}
                    onChange={(e) =>
                      updateSelectedField("partyLevels", e.currentTarget.value)
                    }
                  />
                </FieldBlock>
                <FieldBlock>
                  <Label>Monsters</Label>
                  <InlineRow>
                    {encounterMonsterIds.map((id, index) => {
                      const monster = monsterLookup[id];
                      const cr = asStringField(monster?.fields.cr) || "?";
                      return (
                        <Chip key={`${id}_${index}`}>
                          {monster?.name || id} (CR {cr}){" "}
                          <button onClick={() => removeMonsterFromEncounter(index)}>
                            x
                          </button>
                        </Chip>
                      );
                    })}
                  </InlineRow>
                  <InlineRow>
                    {monsters.map((monster) => (
                      <Button
                        key={monster.id}
                        size="small"
                        onClick={() => addMonsterToEncounter(monster.id)}
                      >
                        + {monster.name}
                      </Button>
                    ))}
                  </InlineRow>
                </FieldBlock>
                <FieldBlock>
                  <Label>Difficulty</Label>
                  {!encounterEvaluation && (
                    <Muted>
                      Add valid party levels and at least one monster with CR.
                    </Muted>
                  )}
                  {encounterEvaluation && (
                    <>
                      <Chip>
                        {encounterEvaluation.difficulty.toUpperCase()} | Base XP{" "}
                        {encounterEvaluation.baseXp} | Adjusted XP{" "}
                        {encounterEvaluation.adjustedXp} | x
                        {encounterEvaluation.multiplier}
                      </Chip>
                      <InlineRow>
                        <Chip>
                          Easy {encounterEvaluation.threshold.easy}
                        </Chip>
                        <Chip>
                          Medium {encounterEvaluation.threshold.medium}
                        </Chip>
                        <Chip>
                          Hard {encounterEvaluation.threshold.hard}
                        </Chip>
                        <Chip>
                          Deadly {encounterEvaluation.threshold.deadly}
                        </Chip>
                      </InlineRow>
                    </>
                  )}
                </FieldBlock>
                <FieldBlock>
                  <InlineRow>
                    <Button onClick={buildInitiativeOrder}>
                      Roll Initiative Order
                    </Button>
                    <Button
                      onClick={() => setCombatState(makeCombatStateFromInitiative(initiativeOrder))}
                      disabled={initiativeOrder.length === 0}
                    >
                      Start Combat
                    </Button>
                    <Button
                      onClick={previousTurn}
                      disabled={!combatState || initiativeOrder.length === 0}
                    >
                      Prev Turn
                    </Button>
                    <Button
                      onClick={nextTurn}
                      disabled={!combatState || initiativeOrder.length === 0}
                    >
                      Next Turn
                    </Button>
                  </InlineRow>
                  {initiativeOrder.length > 0 && (
                    <InlineRow>
                      {initiativeOrder.map((entry, index) => (
                        <Chip key={`${entry.name}_${index}`}>
                          {index + 1}. {entry.name} ({entry.side}) Init{" "}
                          {entry.initiative}
                        </Chip>
                      ))}
                    </InlineRow>
                  )}
                  {combatState && currentCombatant && (
                    <>
                      <InlineRow>
                        <Chip>
                          Round {combatState.round} | Turn{" "}
                          {combatState.turnIndex + 1}/{initiativeOrder.length}
                        </Chip>
                        <Chip>
                          Active: {currentCombatant.name} ({currentCombatant.side})
                        </Chip>
                        {currentCombatantHp !== null && (
                          <Chip>HP {currentCombatantHp}</Chip>
                        )}
                      </InlineRow>
                      <InlineRow>
                        <Input
                          placeholder="Condition (e.g. poisoned)"
                          value={pendingCondition}
                          onChange={(e) => setPendingCondition(e.currentTarget.value)}
                        />
                        <Button onClick={addConditionToCurrent}>
                          Add Condition
                        </Button>
                      </InlineRow>
                      <InlineRow>
                        <Input
                          type="number"
                          placeholder="1"
                          value={pendingHpDelta}
                          onChange={(e) => setPendingHpDelta(e.currentTarget.value)}
                        />
                        <Button onClick={() => applyHpToCurrent("damage")}>
                          Apply Damage
                        </Button>
                        <Button onClick={() => applyHpToCurrent("heal")}>
                          Apply Heal
                        </Button>
                      </InlineRow>
                      <InlineRow>
                        {(combatState.conditions[currentCombatant.tokenId] || []).map(
                          (condition, index) => (
                            <Chip key={`${condition}_${index}`}>
                              {condition}{" "}
                              <button
                                onClick={() => removeConditionFromCurrent(index)}
                              >
                                x
                              </button>
                            </Chip>
                          ),
                        )}
                      </InlineRow>
                    </>
                  )}
                </FieldBlock>
              </FieldBlock>
            )}
            {activeDef.fields.map((field) => {
              const value = selectedEntry.fields[field.key];
              return (
                <FieldBlock key={field.key}>
                  <Label>{field.label}</Label>
                  {field.type === "boolean" ? (
                    <Button
                      variant={value ? "primary" : "normal"}
                      onClick={() => updateSelectedField(field.key, !Boolean(value))}
                    >
                      {Boolean(value) ? "Enabled" : "Disabled"}
                    </Button>
                  ) : (
                    <Input
                      type={field.type === "number" ? "number" : "text"}
                      placeholder={field.placeholder}
                      value={
                        field.type === "number"
                          ? String(typeof value === "number" ? value : 0)
                          : String(typeof value === "string" ? value : "")
                      }
                      onChange={(e) =>
                        updateSelectedField(
                          field.key,
                          field.type === "number"
                            ? Number(e.currentTarget.value || 0)
                            : e.currentTarget.value,
                        )
                      }
                    />
                  )}
                </FieldBlock>
              );
            })}
            <FieldBlock>
              <Label>Notes</Label>
              <Textarea
                rows={8}
                value={selectedEntry.notes}
                onChange={(e) => updateSelected({ notes: e.currentTarget.value })}
              />
            </FieldBlock>
          </>
        )}
      </MainPane>
    </Page>
  );
};

export default RPG5EPage;
