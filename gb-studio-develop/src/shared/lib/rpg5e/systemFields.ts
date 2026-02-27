import type { ConditionName } from "./conditions";
import type { RPGCategoryKey } from "./editorData";

export interface Dnd5eAbilityDefinition {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
}

export interface Dnd5eSkillDefinition {
  id: string;
  name: string;
  ability: string;
}

export interface Dnd5eClassDefinition {
  id: string;
  name: string;
  hitDie: string;
  primaryAbility: string;
  savingThrows: string[];
  progression: "full" | "half" | "third" | "none";
}

export interface Dnd5eSystemFieldTemplate {
  category: RPGCategoryKey;
  fields: string[];
}

export const DND5E_ABILITIES: Dnd5eAbilityDefinition[] = [
  {
    id: "strength",
    name: "Strength",
    abbreviation: "STR",
    description: "Physical power, athletics, lifting, and melee force.",
  },
  {
    id: "dexterity",
    name: "Dexterity",
    abbreviation: "DEX",
    description: "Agility, reflexes, initiative, stealth, and finesse.",
  },
  {
    id: "constitution",
    name: "Constitution",
    abbreviation: "CON",
    description: "Durability, stamina, concentration, and resilience.",
  },
  {
    id: "intelligence",
    name: "Intelligence",
    abbreviation: "INT",
    description: "Reasoning, memory, lore, and technical knowledge.",
  },
  {
    id: "wisdom",
    name: "Wisdom",
    abbreviation: "WIS",
    description: "Perception, insight, awareness, and intuition.",
  },
  {
    id: "charisma",
    name: "Charisma",
    abbreviation: "CHA",
    description: "Presence, influence, leadership, and force of personality.",
  },
];

export const DND5E_SKILLS: Dnd5eSkillDefinition[] = [
  { id: "acrobatics", name: "Acrobatics", ability: "Dexterity" },
  { id: "animalHandling", name: "Animal Handling", ability: "Wisdom" },
  { id: "arcana", name: "Arcana", ability: "Intelligence" },
  { id: "athletics", name: "Athletics", ability: "Strength" },
  { id: "deception", name: "Deception", ability: "Charisma" },
  { id: "history", name: "History", ability: "Intelligence" },
  { id: "insight", name: "Insight", ability: "Wisdom" },
  { id: "intimidation", name: "Intimidation", ability: "Charisma" },
  { id: "investigation", name: "Investigation", ability: "Intelligence" },
  { id: "medicine", name: "Medicine", ability: "Wisdom" },
  { id: "nature", name: "Nature", ability: "Intelligence" },
  { id: "perception", name: "Perception", ability: "Wisdom" },
  { id: "performance", name: "Performance", ability: "Charisma" },
  { id: "persuasion", name: "Persuasion", ability: "Charisma" },
  { id: "religion", name: "Religion", ability: "Intelligence" },
  { id: "sleightOfHand", name: "Sleight of Hand", ability: "Dexterity" },
  { id: "stealth", name: "Stealth", ability: "Dexterity" },
  { id: "survival", name: "Survival", ability: "Wisdom" },
];

export const DND5E_CORE_CLASSES: Dnd5eClassDefinition[] = [
  {
    id: "barbarian",
    name: "Barbarian",
    hitDie: "d12",
    primaryAbility: "Strength",
    savingThrows: ["Strength", "Constitution"],
    progression: "none",
  },
  {
    id: "bard",
    name: "Bard",
    hitDie: "d8",
    primaryAbility: "Charisma",
    savingThrows: ["Dexterity", "Charisma"],
    progression: "full",
  },
  {
    id: "cleric",
    name: "Cleric",
    hitDie: "d8",
    primaryAbility: "Wisdom",
    savingThrows: ["Wisdom", "Charisma"],
    progression: "full",
  },
  {
    id: "druid",
    name: "Druid",
    hitDie: "d8",
    primaryAbility: "Wisdom",
    savingThrows: ["Intelligence", "Wisdom"],
    progression: "full",
  },
  {
    id: "fighter",
    name: "Fighter",
    hitDie: "d10",
    primaryAbility: "Strength or Dexterity",
    savingThrows: ["Strength", "Constitution"],
    progression: "none",
  },
  {
    id: "monk",
    name: "Monk",
    hitDie: "d8",
    primaryAbility: "Dexterity and Wisdom",
    savingThrows: ["Strength", "Dexterity"],
    progression: "none",
  },
  {
    id: "paladin",
    name: "Paladin",
    hitDie: "d10",
    primaryAbility: "Strength and Charisma",
    savingThrows: ["Wisdom", "Charisma"],
    progression: "half",
  },
  {
    id: "ranger",
    name: "Ranger",
    hitDie: "d10",
    primaryAbility: "Dexterity and Wisdom",
    savingThrows: ["Strength", "Dexterity"],
    progression: "half",
  },
  {
    id: "rogue",
    name: "Rogue",
    hitDie: "d8",
    primaryAbility: "Dexterity",
    savingThrows: ["Dexterity", "Intelligence"],
    progression: "none",
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    hitDie: "d6",
    primaryAbility: "Charisma",
    savingThrows: ["Constitution", "Charisma"],
    progression: "full",
  },
  {
    id: "warlock",
    name: "Warlock",
    hitDie: "d8",
    primaryAbility: "Charisma",
    savingThrows: ["Wisdom", "Charisma"],
    progression: "full",
  },
  {
    id: "wizard",
    name: "Wizard",
    hitDie: "d6",
    primaryAbility: "Intelligence",
    savingThrows: ["Intelligence", "Wisdom"],
    progression: "full",
  },
];

export const DND5E_CONDITIONS: ConditionName[] = [
  "blinded",
  "charmed",
  "deafened",
  "frightened",
  "grappled",
  "incapacitated",
  "invisible",
  "paralyzed",
  "petrified",
  "poisoned",
  "prone",
  "restrained",
  "stunned",
  "unconscious",
];

export const DND5E_DAMAGE_TYPES = [
  "acid",
  "bludgeoning",
  "cold",
  "fire",
  "force",
  "lightning",
  "necrotic",
  "piercing",
  "poison",
  "psychic",
  "radiant",
  "slashing",
  "thunder",
] as const;

export const DND5E_ACTION_ECONOMY = [
  "Action",
  "Bonus Action",
  "Reaction",
  "Movement",
  "Free Interaction",
];

export const DND5E_CORE_RULE_NOTES = [
  "Ability modifier formula: floor((score - 10) / 2)",
  "Proficiency bonus by level: 1-4:+2, 5-8:+3, 9-12:+4, 13-16:+5, 17-20:+6",
  "Saving throw DC baseline: 8 + proficiency bonus + relevant ability modifier",
  "Passive checks baseline: 10 + modifiers",
  "Advantage/disadvantage: roll two d20 and keep highest/lowest",
  "Critical hit rule: natural 20 attack roll doubles damage dice",
];

export const DND5E_RPG_FIELD_TEMPLATES: Dnd5eSystemFieldTemplate[] = [
  {
    category: "characters",
    fields: [
      "level",
      "proficiencyBonus",
      "armorClass",
      "hitPointsCurrent",
      "hitPointsMax",
      "speed",
      "initiativeBonus",
      "ability_strength",
      "ability_dexterity",
      "ability_constitution",
      "ability_intelligence",
      "ability_wisdom",
      "ability_charisma",
      "savingThrowProficiencies",
      "skillProficiencies",
      "resistances",
      "immunities",
      "vulnerabilities",
      "conditions",
      "spellcastingAbility",
      "spellSaveDC",
      "spellAttackBonus",
    ],
  },
  {
    category: "classes",
    fields: [
      "hitDie",
      "primaryAbility",
      "savingThrowProficiencies",
      "spellcastingProgression",
      "classFeaturesByLevel",
      "subclassLevel",
    ],
  },
  {
    category: "races",
    fields: [
      "size",
      "speed",
      "abilityScoreIncreases",
      "languages",
      "traits",
      "darkvision",
    ],
  },
  {
    category: "spells",
    fields: [
      "level",
      "school",
      "castingTime",
      "range",
      "components",
      "duration",
      "concentration",
      "ritual",
      "damageType",
      "saveAbility",
      "attackType",
    ],
  },
  {
    category: "monsters",
    fields: [
      "challengeRating",
      "experience",
      "armorClass",
      "hitPoints",
      "speed",
      "ability_strength",
      "ability_dexterity",
      "ability_constitution",
      "ability_intelligence",
      "ability_wisdom",
      "ability_charisma",
      "savingThrows",
      "skills",
      "senses",
      "languages",
      "damageResistances",
      "damageImmunities",
      "conditionImmunities",
    ],
  },
  {
    category: "weapons",
    fields: [
      "weaponType",
      "damageDice",
      "damageType",
      "rangeNormal",
      "rangeLong",
      "properties",
      "requiresAttunement",
      "magicBonus",
    ],
  },
  {
    category: "armors",
    fields: [
      "armorType",
      "baseArmorClass",
      "dexterityModifierCap",
      "strengthRequirement",
      "stealthDisadvantage",
      "magicBonus",
    ],
  },
  {
    category: "items",
    fields: [
      "rarity",
      "attunement",
      "charges",
      "rechargeRule",
      "effectSummary",
      "usageActionType",
    ],
  },
  {
    category: "encounters",
    fields: [
      "difficultyTarget",
      "partyLevel",
      "partySize",
      "monsterCount",
      "adjustedExperience",
      "environment",
      "objectives",
    ],
  },
  {
    category: "quests",
    fields: [
      "objectiveType",
      "requiredChecks",
      "requiredItems",
      "successConditions",
      "failureConditions",
      "rewardExperience",
      "rewardItems",
    ],
  },
];
