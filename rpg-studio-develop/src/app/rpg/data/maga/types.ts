/**
 * MAGA (Magic Academy Guild Alliance) – Core Types & Structures
 *
 * This module defines every structure, type, sub-type, interface and
 * union used throughout the MAGA system so that the rest of the
 * codebase can import a single, well-typed surface area.
 */

// ============================================================================
// PRIMITIVE / UTILITY TYPES
// ============================================================================

/** Semantic alias for a string UUID / slug identifier. */
export type MAGAId = string;

/** ISO-8601 timestamp string. */
export type Timestamp = string;

// ============================================================================
// RANK TYPES
// ============================================================================

/** The six major rank tiers of the MAGA system. */
export type MAGARankTier =
  | 'Bronze'
  | 'Silver'
  | 'Gold'
  | 'Platinum'
  | 'Diamond'
  | 'Master'
  | 'Grandmaster'
  | 'Legend';

/** Each tier is subdivided into numbered divisions (I = lowest, III = highest). */
export type MAGARankDivision = 'I' | 'II' | 'III';

/** A fully qualified rank label, e.g. "Gold II" or "Grandmaster". */
export interface MAGARank {
  id: MAGAId;
  /** Human-readable display name, e.g. "Gold II". */
  displayName: string;
  tier: MAGARankTier;
  /** Division within the tier (null for top tiers that have no divisions). */
  division: MAGARankDivision | null;
  /** Minimum accumulated rank points required to enter this rank. */
  pointsRequired: number;
  /** Maximum points that can be held while in this rank before promotion. */
  pointsCap: number;
  /** Colour code used by the UI (hex). */
  color: string;
  /** Icon or emoji badge shown next to the rank label. */
  badge: string;
  /** Stat multiplier applied to base stats while at this rank. */
  statMultiplier: number;
  /** Any special rewards granted on first reaching this rank. */
  rewards: MAGARankReward[];
}

/** A reward granted when a character first achieves a rank. */
export interface MAGARankReward {
  type: 'gold' | 'item' | 'title' | 'skill' | 'stat_bonus';
  value: number;
  /** Item or title ID when type is 'item' or 'title'. */
  referenceId?: MAGAId;
  description: string;
}

// ============================================================================
// TITLE TYPES
// ============================================================================

/** Category that groups related titles together. */
export type MAGATitleCategory =
  | 'combat'
  | 'exploration'
  | 'crafting'
  | 'social'
  | 'achievement'
  | 'class'
  | 'rank'
  | 'legendary';

/** A title that a character can earn and display. */
export interface MAGATitle {
  id: MAGAId;
  name: string;
  description: string;
  category: MAGATitleCategory;
  /** Flavour text shown in the UI. */
  flavorText: string;
  /** How the title is unlocked. */
  unlockCondition: MAGATitleUnlockCondition;
  /** Passive stat bonuses applied while this title is equipped. */
  statBonuses: Partial<MAGAExtendedStats>;
  /** Whether only one character can hold this title at a time. */
  isUnique: boolean;
  /** Rarity influences drop/unlock rate and UI colour. */
  rarity: MAGATitleRarity;
}

export type MAGATitleRarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'epic'
  | 'legendary'
  | 'mythic';

export type MAGATitleUnlockConditionType =
  | 'reach_rank'
  | 'complete_quests'
  | 'defeat_enemies'
  | 'craft_items'
  | 'reach_level'
  | 'use_skill'
  | 'explore_maps'
  | 'earn_gold'
  | 'join_guild'
  | 'special_event';

export interface MAGATitleUnlockCondition {
  type: MAGATitleUnlockConditionType;
  /** Threshold value (e.g. "defeat 100 enemies", "reach rank Gold I"). */
  threshold: number;
  /** Specific resource ID relevant to the condition (enemy type, rank id, …). */
  referenceId?: MAGAId;
  description: string;
}

// ============================================================================
// CLASS & SUBCLASS TYPES
// ============================================================================

/** The eight primary classes available in MAGA. */
export type MAGAClassName =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Cleric'
  | 'Summoner'
  | 'Monk'
  | 'Ranger'
  | 'Bard';

/** Archetype grouping that drives AI/content-generation logic. */
export type MAGAClassArchetype =
  | 'melee'
  | 'caster'
  | 'stealth'
  | 'support'
  | 'summoner'
  | 'hybrid';

/** A primary character class definition. */
export interface MAGAClass {
  id: MAGAId;
  name: MAGAClassName;
  description: string;
  archetype: MAGAClassArchetype;
  /** Primary stat that scales fastest for this class. */
  primaryStat: keyof MAGAExtendedStats;
  /** Secondary stat that also scales well. */
  secondaryStat: keyof MAGAExtendedStats;
  /** Base stat block applied at character creation (level 1). */
  baseStats: MAGAExtendedStats;
  /** How much each stat increases per level-up. */
  statGrowthRates: MAGAStatGrowthRates;
  /** Skill IDs available to this class. */
  startingSkills: MAGAId[];
  /** Subclasses that can be chosen at the class-change milestone. */
  subclasses: MAGASubclass[];
  /** Equipment types this class can equip. */
  allowedEquipmentTypes: MAGAEquipmentType[];
  /** Colour accent used in the UI. */
  color: string;
  /** Icon / emoji. */
  icon: string;
}

/** Defines a specialisation that branches off a primary class. */
export interface MAGASubclass {
  id: MAGAId;
  name: string;
  parentClassId: MAGAId;
  description: string;
  flavorText: string;
  /** Minimum level required to choose this subclass. */
  levelRequirement: number;
  /** Additional stat bonuses on top of the parent class stats. */
  bonusStats: Partial<MAGAExtendedStats>;
  /** Extra skills unlocked exclusively by this subclass. */
  exclusiveSkills: MAGAId[];
  /** Passive trait description. */
  passiveTrait: string;
  /** Ultimate ability description (unlocked at level 30). */
  ultimateAbility: string;
  icon: string;
}

// ============================================================================
// EXTENDED STATS
// ============================================================================

/**
 * Extended stat block used by the MAGA system.
 * Supersedes the base `Stats` interface with additional derived and
 * primary attributes.
 */
export interface MAGAExtendedStats {
  // ── Vitals ──────────────────────────────────────────────────────────────
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  stamina: number;
  maxStamina: number;

  // ── Primary Attributes ───────────────────────────────────────────────────
  /** Raw physical power; scales physical attack damage. */
  strength: number;
  /** Physical resilience; reduces incoming physical damage. */
  endurance: number;
  /** Magical knowledge; scales magical attack damage. */
  intelligence: number;
  /** Spiritual insight; amplifies healing and buff magnitude. */
  wisdom: number;
  /** Reaction speed; governs turn order and dodge chance. */
  agility: number;
  /** Precision; governs critical hit chance and accuracy. */
  dexterity: number;
  /** Social influence; affects NPC interactions and prices. */
  charisma: number;
  /** Mental fortitude; resists status effects. */
  willpower: number;
  /** Physical toughness; base HP scaling factor. */
  constitution: number;
  /** Situational awareness; reveals hidden objects/traps. */
  perception: number;

  // ── Derived Combat Stats ─────────────────────────────────────────────────
  attack: number;
  defense: number;
  magicAttack: number;
  magicDefense: number;
  speed: number;
  luck: number;
  critChance: number;
  critDamage: number;
  dodgeChance: number;
  hitRate: number;
  elementalResistance: number;
}

/** Per-level growth rates for each stat (fractional values allowed). */
export type MAGAStatGrowthRates = {
  [K in keyof MAGAExtendedStats]: number;
};

// ============================================================================
// STAT DEFINITION (METADATA)
// ============================================================================

/** Metadata that describes a single stat field for UI and documentation. */
export interface MAGAStatDefinition {
  key: keyof MAGAExtendedStats;
  displayName: string;
  shortName: string;
  description: string;
  category: 'vital' | 'primary' | 'derived';
  icon: string;
  minValue: number;
  maxValue: number;
  /** Colour used in stat-bar UI. */
  color: string;
}

// ============================================================================
// EQUIPMENT TYPES
// ============================================================================

export type MAGAEquipmentType =
  | 'sword'
  | 'axe'
  | 'mace'
  | 'dagger'
  | 'staff'
  | 'bow'
  | 'wand'
  | 'tome'
  | 'instrument'
  | 'fist'
  | 'shield'
  | 'heavy_armor'
  | 'medium_armor'
  | 'light_armor'
  | 'robe'
  | 'helmet'
  | 'boots'
  | 'gloves'
  | 'ring'
  | 'amulet'
  | 'cloak';

// ============================================================================
// STRUCTURE & FACTION TYPES
// ============================================================================

/** An in-world organisation that characters can join. */
export interface MAGAGuild {
  id: MAGAId;
  name: string;
  description: string;
  type: MAGAGuildType;
  rank: MAGARankTier;
  memberCount: number;
  foundedAt: Timestamp;
  emblem: string;
  bonuses: Partial<MAGAExtendedStats>;
  availableTitles: MAGAId[];
}

export type MAGAGuildType =
  | 'combat'
  | 'merchant'
  | 'scholar'
  | 'thieves'
  | 'holy'
  | 'arcane'
  | 'nature'
  | 'shadow';

/** An academy discipline that grants structured progression. */
export interface MAGAAcademyDiscipline {
  id: MAGAId;
  name: string;
  description: string;
  associatedClass: MAGAClassName;
  curriculum: MAGAId[]; // skill IDs in learning order
  masteryTitle: MAGAId;
  masteryReward: MAGARankReward;
}

// ============================================================================
// CHARACTER STRUCTURE (MAGA-EXTENDED)
// ============================================================================

/** Full character record as understood by the MAGA system. */
export interface MAGACharacter {
  id: MAGAId;
  name: string;
  firstName: string;
  lastName: string;
  epithet?: string;
  level: number;
  experience: number;
  experienceToNext: number;
  /** Primary class ID. */
  classId: MAGAId;
  /** Chosen subclass ID (null until class-change milestone). */
  subclassId: MAGAId | null;
  rank: MAGAId;
  /** ID of the title currently displayed next to the character's name. */
  activeTitle: MAGAId | null;
  /** All titles ever earned. */
  earnedTitles: MAGAId[];
  stats: MAGAExtendedStats;
  portrait: string;
  guildId: MAGAId | null;
  academyDisciplineId: MAGAId | null;
  biography: string;
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
}

// ============================================================================
// NAME STRUCTURE TYPES
// ============================================================================

/** A generated or curated character name. */
export interface MAGACharacterName {
  firstName: string;
  lastName: string;
  epithet?: string;
  /** Combined display string, e.g. "Lyra Ashveil, the Unyielding". */
  fullName: string;
  origin: MAGANameOrigin;
}

export type MAGANameOrigin =
  | 'human'
  | 'elvish'
  | 'dwarven'
  | 'orcish'
  | 'celestial'
  | 'infernal'
  | 'fae'
  | 'draconic';

// ============================================================================
// INDEX / RE-EXPORT HELPERS
// ============================================================================

/** Union of every top-level MAGA entity type, useful for generic utilities. */
export type MAGAEntity =
  | MAGAClass
  | MAGASubclass
  | MAGARank
  | MAGATitle
  | MAGAGuild
  | MAGAAcademyDiscipline
  | MAGACharacter;
