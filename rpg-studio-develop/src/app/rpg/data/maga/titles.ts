/**
 * MAGA – Titles
 *
 * All earnable titles organised by category.  Each title carries an unlock
 * condition, optional passive stat bonuses, a rarity rating, and flavour text.
 */

import type { MAGATitle } from './types';

// ============================================================================
// COMBAT TITLES
// ============================================================================

const combatTitles: MAGATitle[] = [
  {
    id: 'title-monster-slayer',
    name: 'the Monster Slayer',
    description: 'Awarded to those who have vanquished 100 monsters.',
    category: 'combat',
    flavorText: '"Where others flee, this warrior charges forward."',
    unlockCondition: {
      type: 'defeat_enemies',
      threshold: 100,
      description: 'Defeat 100 monsters',
    },
    statBonuses: { attack: 3, critChance: 1 },
    isUnique: false,
    rarity: 'common',
  },
  {
    id: 'title-champion',
    name: 'the Champion',
    description: 'Bestowed upon those who win 50 battles without a party member falling.',
    category: 'combat',
    flavorText: '"A true champion leaves no comrade behind."',
    unlockCondition: {
      type: 'defeat_enemies',
      threshold: 50,
      description: 'Win 50 battles with no party KOs',
    },
    statBonuses: { attack: 5, defense: 3, critChance: 2 },
    isUnique: false,
    rarity: 'uncommon',
  },
  {
    id: 'title-conqueror',
    name: 'the Conqueror',
    description: 'Given to those who have cleared 10 dungeons on the highest difficulty.',
    category: 'combat',
    flavorText: '"No fortress stands before the Conqueror."',
    unlockCondition: {
      type: 'defeat_enemies',
      threshold: 500,
      description: 'Clear 10 dungeons on highest difficulty',
    },
    statBonuses: { attack: 8, defense: 5, strength: 3 },
    isUnique: false,
    rarity: 'rare',
  },
  {
    id: 'title-warlord',
    name: 'the Warlord',
    description: 'Only those who have felled 1000 enemies may claim this title.',
    category: 'combat',
    flavorText: '"A thousand corpses and still counting."',
    unlockCondition: {
      type: 'defeat_enemies',
      threshold: 1000,
      description: 'Defeat 1 000 enemies',
    },
    statBonuses: { attack: 10, strength: 5, critDamage: 10, critChance: 3 },
    isUnique: false,
    rarity: 'epic',
  },
  {
    id: 'title-undying',
    name: 'the Undying',
    description: 'Survived 5 near-death experiences in a single battle.',
    category: 'combat',
    flavorText: '"Death itself grows tired of chasing this one."',
    unlockCondition: {
      type: 'defeat_enemies',
      threshold: 5,
      description: 'Survive 5 near-death moments in a single battle',
    },
    statBonuses: { hp: 50, maxHp: 50, endurance: 5, constitution: 5 },
    isUnique: false,
    rarity: 'rare',
  },
  {
    id: 'title-dragon-slayer',
    name: 'the Dragon Slayer',
    description: 'Legendary title for defeating a dragon-class enemy.',
    category: 'combat',
    flavorText: '"Dragon fire tastes like victory to this one."',
    unlockCondition: {
      type: 'defeat_enemies',
      threshold: 1,
      referenceId: 'enemy-dragon',
      description: 'Defeat any dragon-class enemy',
    },
    statBonuses: { attack: 12, magicDefense: 8, elementalResistance: 15 },
    isUnique: false,
    rarity: 'epic',
  },
];

// ============================================================================
// EXPLORATION TITLES
// ============================================================================

const explorationTitles: MAGATitle[] = [
  {
    id: 'title-pioneer',
    name: 'the Pioneer',
    description: 'Explored 10 previously undiscovered map nodes.',
    category: 'exploration',
    flavorText: '"Every horizon is an invitation."',
    unlockCondition: {
      type: 'explore_maps',
      threshold: 10,
      description: 'Discover 10 new map nodes',
    },
    statBonuses: { perception: 3, luck: 2 },
    isUnique: false,
    rarity: 'common',
  },
  {
    id: 'title-pathfinder',
    name: 'the Pathfinder',
    description: 'Discovered 50 unique locations across the world map.',
    category: 'exploration',
    flavorText: '"The map is never finished."',
    unlockCondition: {
      type: 'explore_maps',
      threshold: 50,
      description: 'Discover 50 unique locations',
    },
    statBonuses: { perception: 6, agility: 3, speed: 3 },
    isUnique: false,
    rarity: 'uncommon',
  },
  {
    id: 'title-world-traveller',
    name: 'the World Traveller',
    description: 'Visited every region in the known world.',
    category: 'exploration',
    flavorText: '"There is no corner of this world untouched by my footsteps."',
    unlockCondition: {
      type: 'explore_maps',
      threshold: 100,
      description: 'Visit all world regions',
    },
    statBonuses: { perception: 8, luck: 5, speed: 5 },
    isUnique: false,
    rarity: 'rare',
  },
  {
    id: 'title-cartographer',
    name: 'the Cartographer',
    description: 'Fully explored every room in 20 different dungeons.',
    category: 'exploration',
    flavorText: '"I do not just clear dungeons — I map their souls."',
    unlockCondition: {
      type: 'explore_maps',
      threshold: 20,
      referenceId: 'dungeon-full-clear',
      description: 'Fully explore 20 dungeons',
    },
    statBonuses: { perception: 10, luck: 8 },
    isUnique: false,
    rarity: 'epic',
  },
];

// ============================================================================
// CRAFTING TITLES
// ============================================================================

const craftingTitles: MAGATitle[] = [
  {
    id: 'title-apprentice-smith',
    name: 'the Apprentice Smith',
    description: 'Crafted 10 items at the forge.',
    category: 'crafting',
    flavorText: '"Every master was once a beginner."',
    unlockCondition: {
      type: 'craft_items',
      threshold: 10,
      description: 'Craft 10 items',
    },
    statBonuses: { strength: 1 },
    isUnique: false,
    rarity: 'common',
  },
  {
    id: 'title-artisan',
    name: 'the Artisan',
    description: 'Crafted 50 items with a quality rating of "fine" or better.',
    category: 'crafting',
    flavorText: '"Craftsmanship is a language spoken by the hands."',
    unlockCondition: {
      type: 'craft_items',
      threshold: 50,
      description: 'Craft 50 fine-quality items',
    },
    statBonuses: { strength: 2, luck: 3 },
    isUnique: false,
    rarity: 'uncommon',
  },
  {
    id: 'title-master-craftsman',
    name: 'the Master Craftsman',
    description: 'Crafted 200 items including at least one epic-rarity piece.',
    category: 'crafting',
    flavorText: '"The forge knows my touch."',
    unlockCondition: {
      type: 'craft_items',
      threshold: 200,
      description: 'Craft 200 items including one epic-quality piece',
    },
    statBonuses: { strength: 5, endurance: 3, luck: 5 },
    isUnique: false,
    rarity: 'rare',
  },
  {
    id: 'title-legendary-smith',
    name: 'the Legendary Smith',
    description: 'Forged a legendary-rarity item.',
    category: 'crafting',
    flavorText: '"Legends are not born. They are forged."',
    unlockCondition: {
      type: 'craft_items',
      threshold: 1,
      referenceId: 'item-rarity-legendary',
      description: 'Craft one legendary-rarity item',
    },
    statBonuses: { strength: 8, constitution: 5, luck: 8 },
    isUnique: false,
    rarity: 'epic',
  },
];

// ============================================================================
// SOCIAL TITLES
// ============================================================================

const socialTitles: MAGATitle[] = [
  {
    id: 'title-diplomat',
    name: 'the Diplomat',
    description: 'Successfully negotiated 20 non-combat encounters.',
    category: 'social',
    flavorText: '"Words can open doors that swords cannot."',
    unlockCondition: {
      type: 'complete_quests',
      threshold: 20,
      referenceId: 'objective-talk',
      description: 'Complete 20 talk-type quest objectives',
    },
    statBonuses: { charisma: 5, luck: 3 },
    isUnique: false,
    rarity: 'uncommon',
  },
  {
    id: 'title-ambassador',
    name: 'the Ambassador',
    description: 'Achieved maximum reputation with three different factions.',
    category: 'social',
    flavorText: '"Respected in every hall and every hovel."',
    unlockCondition: {
      type: 'join_guild',
      threshold: 3,
      description: 'Max reputation with 3 factions',
    },
    statBonuses: { charisma: 8, wisdom: 4, luck: 4 },
    isUnique: false,
    rarity: 'rare',
  },
  {
    id: 'title-guild-master',
    name: 'the Guild Master',
    description: 'Founded and led a guild to tier Gold or above.',
    category: 'social',
    flavorText: '"Leadership is not a title. It is a weight willingly carried."',
    unlockCondition: {
      type: 'join_guild',
      threshold: 1,
      referenceId: 'guild-rank-gold',
      description: 'Lead a guild to Gold rank or above',
    },
    statBonuses: { charisma: 10, willpower: 6, luck: 5 },
    isUnique: false,
    rarity: 'epic',
  },
];

// ============================================================================
// ACHIEVEMENT TITLES
// ============================================================================

const achievementTitles: MAGATitle[] = [
  {
    id: 'title-veteran',
    name: 'the Veteran',
    description: 'Reached character level 20.',
    category: 'achievement',
    flavorText: '"Experience is the only currency that never devalues."',
    unlockCondition: {
      type: 'reach_level',
      threshold: 20,
      description: 'Reach level 20',
    },
    statBonuses: { attack: 4, defense: 4 },
    isUnique: false,
    rarity: 'common',
  },
  {
    id: 'title-elite',
    name: 'the Elite',
    description: 'Reached character level 40.',
    category: 'achievement',
    flavorText: '"The elite do not rest. They refine."',
    unlockCondition: {
      type: 'reach_level',
      threshold: 40,
      description: 'Reach level 40',
    },
    statBonuses: { attack: 6, defense: 6, magicAttack: 4, magicDefense: 4 },
    isUnique: false,
    rarity: 'uncommon',
  },
  {
    id: 'title-paragon',
    name: 'the Paragon',
    description: 'Reached character level 60.',
    category: 'achievement',
    flavorText: '"A paragon of virtue, might, and perseverance."',
    unlockCondition: {
      type: 'reach_level',
      threshold: 60,
      description: 'Reach level 60',
    },
    statBonuses: { attack: 10, defense: 8, magicAttack: 8, magicDefense: 8, speed: 4 },
    isUnique: false,
    rarity: 'rare',
  },
  {
    id: 'title-ascendant',
    name: 'the Ascendant',
    description: 'Reached the level cap of 99.',
    category: 'achievement',
    flavorText: '"The ceiling was merely the floor of the next realm."',
    unlockCondition: {
      type: 'reach_level',
      threshold: 99,
      description: 'Reach the maximum level of 99',
    },
    statBonuses: { attack: 15, defense: 12, magicAttack: 12, magicDefense: 12, speed: 8, luck: 8, critChance: 5 },
    isUnique: false,
    rarity: 'legendary',
  },
  {
    id: 'title-millionaire',
    name: 'the Millionaire',
    description: 'Accumulated 1,000,000 gold.',
    category: 'achievement',
    flavorText: '"Fortune favours the bold — and the patient."',
    unlockCondition: {
      type: 'earn_gold',
      threshold: 1000000,
      description: 'Accumulate 1,000,000 gold total',
    },
    statBonuses: { luck: 10, charisma: 5 },
    isUnique: false,
    rarity: 'rare',
  },
];

// ============================================================================
// RANK TITLES (granted by the rank system)
// ============================================================================

const rankTitles: MAGATitle[] = [
  {
    id: 'title-bronze-veteran',
    name: 'the Bronze Veteran',
    description: 'Awarded upon completing the Bronze rank tier.',
    category: 'rank',
    flavorText: '"Bronze forged in the fires of ambition."',
    unlockCondition: { type: 'reach_rank', threshold: 1, referenceId: 'rank-bronze-iii', description: 'Reach Bronze III' },
    statBonuses: { luck: 2 },
    isUnique: false,
    rarity: 'common',
  },
  {
    id: 'title-silver-knight',
    name: 'the Silver Knight',
    description: 'Awarded upon completing the Silver rank tier.',
    category: 'rank',
    flavorText: '"Polished silver, tempered resolve."',
    unlockCondition: { type: 'reach_rank', threshold: 1, referenceId: 'rank-silver-iii', description: 'Reach Silver III' },
    statBonuses: { defense: 3, luck: 3 },
    isUnique: false,
    rarity: 'uncommon',
  },
  {
    id: 'title-golden-champion',
    name: 'the Golden Champion',
    description: 'Awarded upon completing the Gold rank tier.',
    category: 'rank',
    flavorText: '"Gold is the colour of champions."',
    unlockCondition: { type: 'reach_rank', threshold: 1, referenceId: 'rank-gold-iii', description: 'Reach Gold III' },
    statBonuses: { attack: 5, defense: 4, luck: 4 },
    isUnique: false,
    rarity: 'uncommon',
  },
  {
    id: 'title-platinum-elite',
    name: 'the Platinum Elite',
    description: 'Awarded upon completing the Platinum rank tier.',
    category: 'rank',
    flavorText: '"Platinum: rarer than gold, harder than silver."',
    unlockCondition: { type: 'reach_rank', threshold: 1, referenceId: 'rank-platinum-iii', description: 'Reach Platinum III' },
    statBonuses: { attack: 6, defense: 6, magicAttack: 4, luck: 5 },
    isUnique: false,
    rarity: 'rare',
  },
  {
    id: 'title-diamond-sovereign',
    name: 'the Diamond Sovereign',
    description: 'Awarded upon completing the Diamond rank tier.',
    category: 'rank',
    flavorText: '"A sovereign whose brilliance cannot be shattered."',
    unlockCondition: { type: 'reach_rank', threshold: 1, referenceId: 'rank-diamond-iii', description: 'Reach Diamond III' },
    statBonuses: { attack: 8, defense: 8, magicAttack: 6, magicDefense: 6, luck: 6 },
    isUnique: false,
    rarity: 'epic',
  },
  {
    id: 'title-master',
    name: 'the Master',
    description: 'Awarded upon reaching the Master rank tier.',
    category: 'rank',
    flavorText: '"The title speaks for itself."',
    unlockCondition: { type: 'reach_rank', threshold: 1, referenceId: 'rank-master-i', description: 'Reach Master I' },
    statBonuses: { attack: 12, defense: 10, magicAttack: 10, magicDefense: 10, speed: 5, luck: 8, critChance: 4 },
    isUnique: false,
    rarity: 'legendary',
  },
  {
    id: 'title-grandmaster',
    name: 'the Grandmaster',
    description: 'Awarded upon reaching Grandmaster rank.',
    category: 'rank',
    flavorText: '"Grandmasters do not climb ladders. They build them."',
    unlockCondition: { type: 'reach_rank', threshold: 1, referenceId: 'rank-grandmaster', description: 'Reach Grandmaster' },
    statBonuses: { attack: 18, defense: 15, magicAttack: 15, magicDefense: 15, speed: 8, luck: 12, critChance: 6, critDamage: 20 },
    isUnique: false,
    rarity: 'legendary',
  },
  {
    id: 'title-legend',
    name: 'the Legend',
    description: 'The highest honour in the MAGA system. Awarded upon reaching the Legend rank.',
    category: 'rank',
    flavorText: '"Legends are not remembered. They are lived."',
    unlockCondition: { type: 'reach_rank', threshold: 1, referenceId: 'rank-legend', description: 'Reach Legend rank' },
    statBonuses: {
      attack: 25, defense: 20, magicAttack: 20, magicDefense: 20,
      speed: 12, luck: 18, critChance: 8, critDamage: 30, dodgeChance: 5, hitRate: 5,
    },
    isUnique: false,
    rarity: 'mythic',
  },
];

// ============================================================================
// CLASS-SPECIFIC TITLES
// ============================================================================

const classTitles: MAGATitle[] = [
  {
    id: 'title-sword-saint',
    name: 'the Sword Saint',
    description: 'A Warrior who has mastered every melee technique.',
    category: 'class',
    flavorText: '"The sword is merely an extension of the will."',
    unlockCondition: { type: 'use_skill', threshold: 1000, referenceId: 'class-warrior', description: 'Use Warrior skills 1000 times' },
    statBonuses: { attack: 10, strength: 6, critChance: 5, critDamage: 15 },
    isUnique: false,
    rarity: 'epic',
  },
  {
    id: 'title-arcane-sage',
    name: 'the Arcane Sage',
    description: 'A Mage who has transcended mortal understanding of magic.',
    category: 'class',
    flavorText: '"Magic is a conversation. I have become fluent."',
    unlockCondition: { type: 'use_skill', threshold: 1000, referenceId: 'class-mage', description: 'Use Mage skills 1000 times' },
    statBonuses: { magicAttack: 10, intelligence: 6, mp: 40, maxMp: 40 },
    isUnique: false,
    rarity: 'epic',
  },
  {
    id: 'title-shadow-lord',
    name: 'the Shadow Lord',
    description: 'A Rogue who commands the darkness itself.',
    category: 'class',
    flavorText: '"I do not hide in shadows. I am the shadow."',
    unlockCondition: { type: 'use_skill', threshold: 1000, referenceId: 'class-rogue', description: 'Use Rogue skills 1000 times' },
    statBonuses: { dexterity: 6, agility: 6, critChance: 6, dodgeChance: 6, speed: 8 },
    isUnique: false,
    rarity: 'epic',
  },
  {
    id: 'title-high-priest',
    name: 'the High Priest',
    description: 'A Cleric whose faith has been proven through countless trials.',
    category: 'class',
    flavorText: '"The divine does not choose the worthy. The worthy choose the divine."',
    unlockCondition: { type: 'use_skill', threshold: 1000, referenceId: 'class-cleric', description: 'Use Cleric skills 1000 times' },
    statBonuses: { wisdom: 8, willpower: 6, magicDefense: 8, mp: 30, maxMp: 30 },
    isUnique: false,
    rarity: 'epic',
  },
  {
    id: 'title-great-summoner',
    name: 'the Great Summoner',
    description: 'Commands the most powerful creatures with ease.',
    category: 'class',
    flavorText: '"They come when I call. Every last one of them."',
    unlockCondition: { type: 'use_skill', threshold: 1000, referenceId: 'class-summoner', description: 'Use Summoner skills 1000 times' },
    statBonuses: { wisdom: 8, intelligence: 5, charisma: 5, mp: 25, maxMp: 25 },
    isUnique: false,
    rarity: 'epic',
  },
  {
    id: 'title-ascetic',
    name: 'the Ascetic',
    description: 'A Monk of perfect discipline whose body is a living weapon.',
    category: 'class',
    flavorText: '"The flesh is an instrument. I have mastered mine."',
    unlockCondition: { type: 'use_skill', threshold: 1000, referenceId: 'class-monk', description: 'Use Monk skills 1000 times' },
    statBonuses: { agility: 8, dexterity: 6, willpower: 6, speed: 10, dodgeChance: 5 },
    isUnique: false,
    rarity: 'epic',
  },
];

// ============================================================================
// LEGENDARY TITLES
// ============================================================================

const legendaryTitles: MAGATitle[] = [
  {
    id: 'title-chosen-one',
    name: 'the Chosen One',
    description: 'A mythic title granted to one who has completed all main quests at max rank.',
    category: 'legendary',
    flavorText: '"Fate did not choose you. You chose fate."',
    unlockCondition: { type: 'special_event', threshold: 1, description: 'Complete all main quests at Legend rank' },
    statBonuses: {
      attack: 20, defense: 20, magicAttack: 20, magicDefense: 20,
      speed: 15, luck: 20, critChance: 10, critDamage: 30,
    },
    isUnique: true,
    rarity: 'mythic',
  },
  {
    id: 'title-harbinger',
    name: 'the Harbinger',
    description: 'Granted during a special world event. Only one character may hold this at a time.',
    category: 'legendary',
    flavorText: '"When the Harbinger arrives, the age of the world changes."',
    unlockCondition: { type: 'special_event', threshold: 1, description: 'Win the Harbinger Tournament world event' },
    statBonuses: {
      attack: 30, defense: 25, magicAttack: 25, magicDefense: 25,
      speed: 20, luck: 25, critChance: 12, critDamage: 40, elementalResistance: 20,
    },
    isUnique: true,
    rarity: 'mythic',
  },
];

// ============================================================================
// MASTER EXPORT
// ============================================================================

/** All MAGA titles, organised by category. */
export const magaTitles: MAGATitle[] = [
  ...combatTitles,
  ...explorationTitles,
  ...craftingTitles,
  ...socialTitles,
  ...achievementTitles,
  ...rankTitles,
  ...classTitles,
  ...legendaryTitles,
];

/** Lookup map: title ID → MAGATitle. */
export const magaTitleById: Record<string, MAGATitle> = Object.fromEntries(
  magaTitles.map((t) => [t.id, t])
);

/** Returns all titles in a given category. */
export function getTitlesByCategory(
  category: MAGATitle['category']
): MAGATitle[] {
  return magaTitles.filter((t) => t.category === category);
}
