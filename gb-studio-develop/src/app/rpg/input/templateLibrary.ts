export type RPGTemplateDomain =
  | "character"
  | "quest"
  | "dialogue"
  | "encounter"
  | "item"
  | "skill"
  | "mmorpg"
  | "system";

export interface RPGTemplateField {
  key: string;
  label: string;
  type: "string" | "number" | "boolean" | "enum" | "text" | "list";
  required: boolean;
  example: string;
}

export interface RPGTemplateLibraryItem {
  id: string;
  name: string;
  domain: RPGTemplateDomain;
  summary: string;
  fields: RPGTemplateField[];
}

export const RPG_TEMPLATE_LIBRARY: RPGTemplateLibraryItem[] = [
  {
    id: "template-character-actor",
    name: "Character Actor Template",
    domain: "character",
    summary: "Starter field set for player/NPC actor records.",
    fields: [
      { key: "id", label: "ID", type: "string", required: true, example: "actor_hero_01" },
      { key: "displayName", label: "Display Name", type: "string", required: true, example: "Ari the Ranger" },
      { key: "classId", label: "Class", type: "enum", required: true, example: "ranger" },
      { key: "level", label: "Level", type: "number", required: true, example: "1" },
      { key: "baseStats", label: "Base Stats", type: "text", required: true, example: "str:10,dex:14,con:12,int:11,wis:13,cha:9" },
    ],
  },
  {
    id: "template-quest-branching",
    name: "Branching Quest Template",
    domain: "quest",
    summary: "Main/side quest schema with branching objectives and outcomes.",
    fields: [
      { key: "questId", label: "Quest ID", type: "string", required: true, example: "quest_fallen_tower" },
      { key: "title", label: "Title", type: "string", required: true, example: "The Fallen Tower" },
      { key: "objectives", label: "Objectives", type: "list", required: true, example: "Reach tower;Find sigil;Defeat warden" },
      { key: "failureState", label: "Failure State", type: "text", required: false, example: "Timer expires or NPC dies" },
      { key: "rewards", label: "Rewards", type: "list", required: true, example: "xp:350;item:moon_sigil" },
    ],
  },
  {
    id: "template-dialogue-node",
    name: "Dialogue Node Template",
    domain: "dialogue",
    summary: "Reusable dialogue graph node shape for branching conversation trees.",
    fields: [
      { key: "nodeId", label: "Node ID", type: "string", required: true, example: "dlg_intro_01" },
      { key: "speaker", label: "Speaker", type: "string", required: true, example: "Guild Master Selene" },
      { key: "text", label: "Text", type: "text", required: true, example: "You made it back alive. Report what you saw." },
      { key: "choices", label: "Choices", type: "list", required: false, example: "Tell truth;Hide details;Ask question" },
      { key: "nextNode", label: "Next Node", type: "string", required: false, example: "dlg_intro_02" },
    ],
  },
  {
    id: "template-encounter-pack",
    name: "Encounter Pack Template",
    domain: "encounter",
    summary: "Template for tactical encounter definitions and scaling.",
    fields: [
      { key: "encounterId", label: "Encounter ID", type: "string", required: true, example: "enc_ruins_gate" },
      { key: "difficulty", label: "Difficulty", type: "enum", required: true, example: "hard" },
      { key: "partyRange", label: "Party Range", type: "string", required: true, example: "3-5 players, level 4-6" },
      { key: "enemySet", label: "Enemy Set", type: "list", required: true, example: "shadow_scout;bone_guardian" },
      { key: "tactics", label: "Tactics", type: "text", required: false, example: "Wave 2 spawns after altar is damaged." },
    ],
  },
  {
    id: "template-item-equipment",
    name: "Item and Equipment Template",
    domain: "item",
    summary: "General item template for consumables, weapons, armor, and key items.",
    fields: [
      { key: "itemId", label: "Item ID", type: "string", required: true, example: "item_iron_longsword" },
      { key: "itemType", label: "Type", type: "enum", required: true, example: "weapon" },
      { key: "rarity", label: "Rarity", type: "enum", required: true, example: "uncommon" },
      { key: "effects", label: "Effects", type: "text", required: false, example: "+3 ATK;Bleed chance 10%" },
      { key: "sellValue", label: "Sell Value", type: "number", required: true, example: "120" },
    ],
  },
  {
    id: "template-skill-ability",
    name: "Skill Ability Template",
    domain: "skill",
    summary: "Template for active/passive abilities with cost and scaling fields.",
    fields: [
      { key: "skillId", label: "Skill ID", type: "string", required: true, example: "skill_blazing_arc" },
      { key: "category", label: "Category", type: "enum", required: true, example: "active" },
      { key: "resourceCost", label: "Resource Cost", type: "number", required: true, example: "8" },
      { key: "cooldownTurns", label: "Cooldown", type: "number", required: false, example: "2" },
      { key: "scalingRule", label: "Scaling", type: "text", required: true, example: "base + INT*0.6 + level*1.2" },
    ],
  },
  {
    id: "template-mmo-raid",
    name: "MMORPG Raid Template",
    domain: "mmorpg",
    summary: "Template for raid encounters with phases, wipes, and reward tracks.",
    fields: [
      { key: "raidId", label: "Raid ID", type: "string", required: true, example: "raid_abyss_citadel" },
      { key: "partySize", label: "Party Size", type: "number", required: true, example: "8" },
      { key: "phasePlan", label: "Phase Plan", type: "text", required: true, example: "P1 adds;P2 beams;P3 enrage" },
      { key: "wipeConditions", label: "Wipe Conditions", type: "list", required: true, example: "Boss cast completes;All tanks down" },
      { key: "rewardTrack", label: "Reward Track", type: "string", required: true, example: "season_s2_raid_track" },
    ],
  },
  {
    id: "template-plugin-manifest",
    name: "Plugin Manifest Template",
    domain: "system",
    summary: "Template for creating plugin metadata, hooks, and config fields.",
    fields: [
      { key: "pluginId", label: "Plugin ID", type: "string", required: true, example: "plugin_dynamic_weather_plus" },
      { key: "version", label: "Version", type: "string", required: true, example: "1.0.0" },
      { key: "entryPoint", label: "Entry Point", type: "string", required: true, example: "main.js" },
      { key: "hooks", label: "Hooks", type: "list", required: true, example: "world:tick;weather:override" },
      { key: "settingsSchema", label: "Settings Schema", type: "text", required: false, example: "{rainChance:number,stormRate:number}" },
    ],
  },
];

export const RPG_TEMPLATE_LIBRARY_LABELS = RPG_TEMPLATE_LIBRARY.map(
  (template) => `${template.name} [${template.domain}]`,
);
