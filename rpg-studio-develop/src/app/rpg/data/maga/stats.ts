/**
 * MAGA – Extended Stats System
 *
 * Provides metadata for every stat field defined in MAGAExtendedStats,
 * as well as per-class base stat blocks and scaling helpers.
 */

import type { MAGAStatDefinition, MAGAExtendedStats } from './types';

// ============================================================================
// STAT DEFINITIONS (METADATA)
// ============================================================================

export const magaStatDefinitions: MAGAStatDefinition[] = [
  // ── Vitals ────────────────────────────────────────────────────────────────
  {
    key: 'hp',
    displayName: 'Hit Points',
    shortName: 'HP',
    description: 'Current health. Reaching 0 renders the character incapacitated.',
    category: 'vital',
    icon: '❤️',
    minValue: 0,
    maxValue: 99999,
    color: '#e74c3c',
  },
  {
    key: 'maxHp',
    displayName: 'Maximum HP',
    shortName: 'Max HP',
    description: 'The upper limit of hit points this character can have.',
    category: 'vital',
    icon: '❤️',
    minValue: 1,
    maxValue: 99999,
    color: '#c0392b',
  },
  {
    key: 'mp',
    displayName: 'Magic Points',
    shortName: 'MP',
    description: 'Current mana reserve. Consumed when using skills and spells.',
    category: 'vital',
    icon: '💙',
    minValue: 0,
    maxValue: 99999,
    color: '#3498db',
  },
  {
    key: 'maxMp',
    displayName: 'Maximum MP',
    shortName: 'Max MP',
    description: 'The upper limit of magic points this character can have.',
    category: 'vital',
    icon: '💙',
    minValue: 0,
    maxValue: 99999,
    color: '#2980b9',
  },
  {
    key: 'stamina',
    displayName: 'Stamina',
    shortName: 'ST',
    description: 'Energy for physical exertion, combos, and special techniques. Recovers out of battle.',
    category: 'vital',
    icon: '💚',
    minValue: 0,
    maxValue: 999,
    color: '#2ecc71',
  },
  {
    key: 'maxStamina',
    displayName: 'Maximum Stamina',
    shortName: 'Max ST',
    description: 'The upper limit of stamina this character can hold.',
    category: 'vital',
    icon: '💚',
    minValue: 0,
    maxValue: 999,
    color: '#27ae60',
  },

  // ── Primary Attributes ─────────────────────────────────────────────────────
  {
    key: 'strength',
    displayName: 'Strength',
    shortName: 'STR',
    description: 'Raw physical power. Increases physical attack damage and carrying capacity.',
    category: 'primary',
    icon: '💪',
    minValue: 1,
    maxValue: 999,
    color: '#e74c3c',
  },
  {
    key: 'endurance',
    displayName: 'Endurance',
    shortName: 'END',
    description: 'Physical resilience. Reduces incoming physical damage and extends combat stamina.',
    category: 'primary',
    icon: '🛡️',
    minValue: 1,
    maxValue: 999,
    color: '#e67e22',
  },
  {
    key: 'intelligence',
    displayName: 'Intelligence',
    shortName: 'INT',
    description: 'Arcane knowledge. Increases magical damage, spell variety, and MP pool.',
    category: 'primary',
    icon: '📚',
    minValue: 1,
    maxValue: 999,
    color: '#9b59b6',
  },
  {
    key: 'wisdom',
    displayName: 'Wisdom',
    shortName: 'WIS',
    description: 'Spiritual insight. Amplifies healing, buffs, and resistance to magical effects.',
    category: 'primary',
    icon: '🌙',
    minValue: 1,
    maxValue: 999,
    color: '#1abc9c',
  },
  {
    key: 'agility',
    displayName: 'Agility',
    shortName: 'AGI',
    description: 'Reaction speed and nimbleness. Governs turn order and physical evasion.',
    category: 'primary',
    icon: '💨',
    minValue: 1,
    maxValue: 999,
    color: '#3498db',
  },
  {
    key: 'dexterity',
    displayName: 'Dexterity',
    shortName: 'DEX',
    description: 'Precision and fine motor control. Increases hit rate and critical strike chance.',
    category: 'primary',
    icon: '🎯',
    minValue: 1,
    maxValue: 999,
    color: '#2ecc71',
  },
  {
    key: 'charisma',
    displayName: 'Charisma',
    shortName: 'CHA',
    description: 'Personal magnetism. Affects NPC disposition, merchant prices, and Bard abilities.',
    category: 'primary',
    icon: '✨',
    minValue: 1,
    maxValue: 999,
    color: '#f39c12',
  },
  {
    key: 'willpower',
    displayName: 'Willpower',
    shortName: 'WIL',
    description: 'Mental fortitude. Resists status effects and powers certain special abilities.',
    category: 'primary',
    icon: '🧠',
    minValue: 1,
    maxValue: 999,
    color: '#8e44ad',
  },
  {
    key: 'constitution',
    displayName: 'Constitution',
    shortName: 'CON',
    description: 'Physical toughness. Directly scales max HP and poison/bleed resistance.',
    category: 'primary',
    icon: '🏋️',
    minValue: 1,
    maxValue: 999,
    color: '#d35400',
  },
  {
    key: 'perception',
    displayName: 'Perception',
    shortName: 'PER',
    description: 'Situational awareness. Reveals hidden objects, traps, and enemy weaknesses.',
    category: 'primary',
    icon: '👁️',
    minValue: 1,
    maxValue: 999,
    color: '#16a085',
  },

  // ── Derived Combat Stats ───────────────────────────────────────────────────
  {
    key: 'attack',
    displayName: 'Attack',
    shortName: 'ATK',
    description: 'Physical damage dealt per attack. Derived from Strength and equipped weapon.',
    category: 'derived',
    icon: '⚔️',
    minValue: 0,
    maxValue: 9999,
    color: '#e74c3c',
  },
  {
    key: 'defense',
    displayName: 'Defense',
    shortName: 'DEF',
    description: 'Physical damage reduction per hit. Derived from Endurance and equipped armor.',
    category: 'derived',
    icon: '🛡️',
    minValue: 0,
    maxValue: 9999,
    color: '#7f8c8d',
  },
  {
    key: 'magicAttack',
    displayName: 'Magic Attack',
    shortName: 'MAT',
    description: 'Magical damage dealt per spell. Derived from Intelligence and equipped catalyst.',
    category: 'derived',
    icon: '🔮',
    minValue: 0,
    maxValue: 9999,
    color: '#9b59b6',
  },
  {
    key: 'magicDefense',
    displayName: 'Magic Defense',
    shortName: 'MDF',
    description: 'Magical damage reduction per hit. Derived from Wisdom and equipped armour.',
    category: 'derived',
    icon: '🌀',
    minValue: 0,
    maxValue: 9999,
    color: '#2980b9',
  },
  {
    key: 'speed',
    displayName: 'Speed',
    shortName: 'SPD',
    description: 'Determines turn order in battle. Higher speed acts first.',
    category: 'derived',
    icon: '⚡',
    minValue: 0,
    maxValue: 999,
    color: '#f1c40f',
  },
  {
    key: 'luck',
    displayName: 'Luck',
    shortName: 'LCK',
    description: 'Influences item drop rates, critical chances, and status effect trigger rates.',
    category: 'derived',
    icon: '🍀',
    minValue: 0,
    maxValue: 999,
    color: '#2ecc71',
  },
  {
    key: 'critChance',
    displayName: 'Critical Chance',
    shortName: 'CRIT%',
    description: 'Percentage probability of landing a critical hit.',
    category: 'derived',
    icon: '💥',
    minValue: 0,
    maxValue: 100,
    color: '#e74c3c',
  },
  {
    key: 'critDamage',
    displayName: 'Critical Damage',
    shortName: 'CRIT×',
    description: 'Damage multiplier applied on a critical hit (e.g. 150 = 150% damage).',
    category: 'derived',
    icon: '💥',
    minValue: 100,
    maxValue: 1000,
    color: '#c0392b',
  },
  {
    key: 'dodgeChance',
    displayName: 'Dodge Chance',
    shortName: 'DODGE',
    description: 'Percentage probability of completely avoiding a physical attack.',
    category: 'derived',
    icon: '💨',
    minValue: 0,
    maxValue: 75,
    color: '#3498db',
  },
  {
    key: 'hitRate',
    displayName: 'Hit Rate',
    shortName: 'HIT%',
    description: 'Percentage probability that an attack connects with the target.',
    category: 'derived',
    icon: '🎯',
    minValue: 0,
    maxValue: 100,
    color: '#e67e22',
  },
  {
    key: 'elementalResistance',
    displayName: 'Elemental Resistance',
    shortName: 'ERES',
    description: 'Flat reduction applied to all elemental magic damage received.',
    category: 'derived',
    icon: '🔰',
    minValue: 0,
    maxValue: 99,
    color: '#1abc9c',
  },
];

// ============================================================================
// STAT LOOKUP HELPERS
// ============================================================================

/** Lookup map: stat key → MAGAStatDefinition. */
export const magaStatDefinitionByKey: Record<string, MAGAStatDefinition> =
  Object.fromEntries(magaStatDefinitions.map((d) => [d.key, d]));

/** Returns only vital stat definitions. */
export const vitalStats = magaStatDefinitions.filter((d) => d.category === 'vital');

/** Returns only primary attribute definitions. */
export const primaryStats = magaStatDefinitions.filter((d) => d.category === 'primary');

/** Returns only derived combat stat definitions. */
export const derivedStats = magaStatDefinitions.filter((d) => d.category === 'derived');

// ============================================================================
// DEFAULT / ZERO STAT BLOCK
// ============================================================================

/** A stat block with every field initialised to 0. */
export const emptyStats: MAGAExtendedStats = {
  hp: 0, maxHp: 0, mp: 0, maxMp: 0, stamina: 0, maxStamina: 0,
  strength: 0, endurance: 0, intelligence: 0, wisdom: 0,
  agility: 0, dexterity: 0, charisma: 0, willpower: 0,
  constitution: 0, perception: 0,
  attack: 0, defense: 0, magicAttack: 0, magicDefense: 0,
  speed: 0, luck: 0, critChance: 0, critDamage: 0,
  dodgeChance: 0, hitRate: 0, elementalResistance: 0,
};

// ============================================================================
// SCALING UTILITIES
// ============================================================================

/**
 * Computes the stat block for a character at the given level based on base
 * stats and per-level growth rates.
 *
 * @param baseStats   - Base stat values at level 1.
 * @param growthRates - Per-level growth increments.
 * @param level       - Current character level (must be >= 1).
 * @returns           A new MAGAExtendedStats with stats scaled to the level.
 */
export function computeStatsAtLevel(
  baseStats: MAGAExtendedStats,
  growthRates: Partial<MAGAExtendedStats>,
  level: number
): MAGAExtendedStats {
  const lvl = Math.max(1, Math.floor(level));
  const levelsGained = lvl - 1;

  const result = { ...baseStats };

  for (const rawKey of Object.keys(growthRates) as Array<keyof MAGAExtendedStats>) {
    const growth = growthRates[rawKey] ?? 0;
    result[rawKey] = Math.floor(baseStats[rawKey] + growth * levelsGained);
  }

  return result;
}

/**
 * Merges two partial stat blocks by adding their values together.
 * Useful for applying equipment bonuses, title bonuses, or rank multipliers.
 *
 * @param base    - The primary stat block.
 * @param bonus   - The bonus stats to add.
 * @returns       A new stat block with combined values.
 */
export function addStats(
  base: MAGAExtendedStats,
  bonus: Partial<MAGAExtendedStats>
): MAGAExtendedStats {
  const result = { ...base };
  for (const rawKey of Object.keys(bonus) as Array<keyof MAGAExtendedStats>) {
    result[rawKey] = (result[rawKey] ?? 0) + (bonus[rawKey] ?? 0);
  }
  return result;
}

/**
 * Applies a scalar multiplier to all numeric stats in the block.
 *
 * @param stats      - Source stat block.
 * @param multiplier - Multiplier to apply (e.g. 1.10 for a 10% buff).
 * @returns          A new stat block with scaled values (floored to integer).
 */
export function scaleStats(
  stats: MAGAExtendedStats,
  multiplier: number
): MAGAExtendedStats {
  const result = { ...stats };
  for (const key of Object.keys(stats) as Array<keyof MAGAExtendedStats>) {
    result[key] = Math.floor(stats[key] * multiplier);
  }
  return result;
}
