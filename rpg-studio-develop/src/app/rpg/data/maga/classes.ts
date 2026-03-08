/**
 * MAGA – Character Classes & Subclasses
 *
 * Defines all 8 primary classes and their 3 subclasses each (24 subclasses
 * in total), complete with stat blocks, growth rates, skill lists, allowed
 * equipment and UI metadata.
 */

import type {
  MAGAClass,
  MAGASubclass,
  MAGAExtendedStats,
  MAGAStatGrowthRates,
} from './types';

// ============================================================================
// HELPERS
// ============================================================================

/** Stat block with every field set to 0 – convenient spread base. */
const ZERO_STATS: MAGAExtendedStats = {
  hp: 0, maxHp: 0, mp: 0, maxMp: 0, stamina: 0, maxStamina: 0,
  strength: 0, endurance: 0, intelligence: 0, wisdom: 0,
  agility: 0, dexterity: 0, charisma: 0, willpower: 0,
  constitution: 0, perception: 0,
  attack: 0, defense: 0, magicAttack: 0, magicDefense: 0,
  speed: 0, luck: 0, critChance: 0, critDamage: 0,
  dodgeChance: 0, hitRate: 0, elementalResistance: 0,
};

/** Growth-rate block with every field set to 0. */
const ZERO_GROWTH: MAGAStatGrowthRates = { ...ZERO_STATS };

// ============================================================================
// ── WARRIOR ──────────────────────────────────────────────────────────────────
// ============================================================================

const warriorSubclasses: MAGASubclass[] = [
  {
    id: 'subclass-berserker',
    name: 'Berserker',
    parentClassId: 'class-warrior',
    description:
      'A fearless warrior who sacrifices defense for overwhelming offensive power.',
    flavorText: '"Rage is not a weakness — it is the purest form of strength."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, strength: 8, attack: 12, critChance: 5, critDamage: 20, hp: 30, maxHp: 30 },
    exclusiveSkills: ['skill-berserker-rage', 'skill-whirlwind', 'skill-blood-thirst'],
    passiveTrait: 'Bloodlust – gains 2% attack for every 10% HP lost.',
    ultimateAbility: 'Ragnarok – unleash a flurry of five strikes that ignore defense.',
    icon: '🪓',
  },
  {
    id: 'subclass-paladin',
    name: 'Paladin',
    parentClassId: 'class-warrior',
    description:
      'A holy knight who channels divine energy to protect allies and smite evil.',
    flavorText: '"Steel and faith — the twin pillars of the righteous."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, wisdom: 5, defense: 10, magicDefense: 8, hp: 20, maxHp: 20, mp: 15, maxMp: 15 },
    exclusiveSkills: ['skill-holy-smite', 'skill-divine-shield', 'skill-consecrate'],
    passiveTrait: 'Divine Aura – allies within range gain +5% magic defence.',
    ultimateAbility: 'Judgement – calls down a pillar of holy light that stuns all enemies.',
    icon: '⚔️',
  },
  {
    id: 'subclass-guardian',
    name: 'Guardian',
    parentClassId: 'class-warrior',
    description:
      'An immovable fortress on the battlefield, specialising in protecting the party.',
    flavorText: '"You shall not pass while I draw breath."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, endurance: 8, constitution: 8, defense: 15, hp: 40, maxHp: 40 },
    exclusiveSkills: ['skill-taunt', 'skill-shield-wall', 'skill-fortress'],
    passiveTrait: 'Iron Will – automatically blocks the first lethal hit per battle.',
    ultimateAbility: "Aegis Eternal – grants the entire party a shield equal to 30% of Guardian's max HP.",
    icon: '🛡️',
  },
];

const warriorClass: MAGAClass = {
  id: 'class-warrior',
  name: 'Warrior',
  description:
    'Masters of melee combat. Warriors dominate the front line with raw strength and endurance.',
  archetype: 'melee',
  primaryStat: 'strength',
  secondaryStat: 'endurance',
  baseStats: {
    ...ZERO_STATS,
    hp: 130, maxHp: 130, mp: 20, maxMp: 20, stamina: 100, maxStamina: 100,
    strength: 16, endurance: 14, intelligence: 6, wisdom: 6,
    agility: 10, dexterity: 10, charisma: 8, willpower: 10,
    constitution: 14, perception: 8,
    attack: 18, defense: 15, magicAttack: 6, magicDefense: 8,
    speed: 10, luck: 8, critChance: 8, critDamage: 150,
    dodgeChance: 5, hitRate: 90, elementalResistance: 5,
  },
  statGrowthRates: {
    ...ZERO_GROWTH,
    hp: 12, maxHp: 12, mp: 1, maxMp: 1, stamina: 5, maxStamina: 5,
    strength: 2.5, endurance: 2.0, constitution: 2.0, attack: 2.0,
    defense: 1.8, speed: 0.5, luck: 0.3,
  },
  startingSkills: ['skill-slash', 'skill-power-strike', 'skill-defend'],
  subclasses: warriorSubclasses,
  allowedEquipmentTypes: ['sword', 'axe', 'mace', 'shield', 'heavy_armor', 'medium_armor', 'helmet', 'boots', 'gloves', 'ring', 'amulet'],
  color: '#c0392b',
  icon: '⚔️',
};

// ============================================================================
// ── MAGE ──────────────────────────────────────────────────────────────────────
// ============================================================================

const mageSubclasses: MAGASubclass[] = [
  {
    id: 'subclass-pyromancer',
    name: 'Pyromancer',
    parentClassId: 'class-mage',
    description: 'A fire-specialist who burns everything in their path.',
    flavorText: '"The world is just fuel waiting to ignite."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, intelligence: 6, magicAttack: 12, critDamage: 25 },
    exclusiveSkills: ['skill-inferno', 'skill-meteor-shower', 'skill-flame-veil'],
    passiveTrait: 'Ember Heart – fire spells apply a burning DoT dealing 5% spell damage per turn.',
    ultimateAbility: 'Apocalypse Flare – a screen-filling explosion dealing massive fire damage to all enemies.',
    icon: '🔥',
  },
  {
    id: 'subclass-cryomancer',
    name: 'Cryomancer',
    parentClassId: 'class-mage',
    description: 'Commands ice and cold to slow enemies and shatter their defences.',
    flavorText: '"Frozen in fear — then shattered into nothing."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, intelligence: 5, magicDefense: 8, wisdom: 4, speed: 3 },
    exclusiveSkills: ['skill-blizzard', 'skill-ice-lance', 'skill-glacial-prison'],
    passiveTrait: 'Deep Freeze – ice spells reduce enemy speed by 10% per stack (max 3).',
    ultimateAbility: 'Absolute Zero – freezes all enemies solid for 2 turns and deals heavy ice damage.',
    icon: '❄️',
  },
  {
    id: 'subclass-archmage',
    name: 'Archmage',
    parentClassId: 'class-mage',
    description: 'A scholarly master of all arcane schools without elemental restriction.',
    flavorText: '"Magic is not a tool. It is a language spoken by reality itself."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, intelligence: 8, wisdom: 6, mp: 30, maxMp: 30, magicAttack: 10, magicDefense: 10 },
    exclusiveSkills: ['skill-arcane-surge', 'skill-spell-echo', 'skill-mana-void'],
    passiveTrait: 'Arcane Mastery – reduces MP cost of all spells by 15%.',
    ultimateAbility: 'Reality Fracture – tears open a rift that deals tri-element damage to all enemies.',
    icon: '🔮',
  },
];

const mageClass: MAGAClass = {
  id: 'class-mage',
  name: 'Mage',
  description:
    'Wielders of arcane power. Mages devastate enemies with elemental spells but are fragile.',
  archetype: 'caster',
  primaryStat: 'intelligence',
  secondaryStat: 'wisdom',
  baseStats: {
    ...ZERO_STATS,
    hp: 65, maxHp: 65, mp: 100, maxMp: 100, stamina: 60, maxStamina: 60,
    strength: 5, endurance: 5, intelligence: 20, wisdom: 16,
    agility: 10, dexterity: 12, charisma: 12, willpower: 14,
    constitution: 6, perception: 14,
    attack: 6, defense: 6, magicAttack: 24, magicDefense: 18,
    speed: 10, luck: 12, critChance: 10, critDamage: 175,
    dodgeChance: 8, hitRate: 95, elementalResistance: 10,
  },
  statGrowthRates: {
    ...ZERO_GROWTH,
    hp: 4, maxHp: 4, mp: 8, maxMp: 8,
    intelligence: 3.0, wisdom: 2.5, magicAttack: 2.5, magicDefense: 1.5,
    speed: 0.8, luck: 0.6,
  },
  startingSkills: ['skill-fireball', 'skill-ice-shard', 'skill-lightning'],
  subclasses: mageSubclasses,
  allowedEquipmentTypes: ['staff', 'wand', 'tome', 'robe', 'boots', 'ring', 'amulet', 'cloak'],
  color: '#8e44ad',
  icon: '🔮',
};

// ============================================================================
// ── ROGUE ─────────────────────────────────────────────────────────────────────
// ============================================================================

const rogueSubclasses: MAGASubclass[] = [
  {
    id: 'subclass-assassin',
    name: 'Assassin',
    parentClassId: 'class-rogue',
    description: 'A silent killer who eliminates targets before they react.',
    flavorText: '"The best battle is the one the enemy never knew they were in."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, dexterity: 6, agility: 5, critChance: 10, critDamage: 30, attack: 8 },
    exclusiveSkills: ['skill-shadow-strike', 'skill-death-mark', 'skill-vanish'],
    passiveTrait: 'One With Shadows – backstab critical hits deal an extra 50% damage.',
    ultimateAbility: 'Death Sentence – instantly kills an enemy below 25% HP; deals massive damage otherwise.',
    icon: '🗡️',
  },
  {
    id: 'subclass-trickster',
    name: 'Trickster',
    parentClassId: 'class-rogue',
    description: 'A cunning illusionist who confuses enemies and debuffs at will.',
    flavorText: '"Why fight fair when you can fight smart?"',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, charisma: 6, luck: 8, dodgeChance: 8, mp: 20, maxMp: 20 },
    exclusiveSkills: ['skill-mirage', 'skill-hex-blade', 'skill-smoke-bomb'],
    passiveTrait: 'Lucky Break – 15% chance to dodge any incoming attack.',
    ultimateAbility: 'Grand Illusion – creates three decoys; enemies attack random targets for 3 turns.',
    icon: '🃏',
  },
  {
    id: 'subclass-ranger',
    name: 'Ranger',
    parentClassId: 'class-rogue',
    description: 'A skilled archer and tracker who excels at long-range combat.',
    flavorText: '"The forest is my ally. The arrow never misses."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, perception: 8, dexterity: 6, agility: 4, attack: 6, hitRate: 10 },
    exclusiveSkills: ['skill-eagle-eye', 'skill-multishot', 'skill-beast-bond'],
    passiveTrait: 'Hawk Sight – never misses while below full HP.',
    ultimateAbility: 'Rain of Arrows – fires a volley striking all enemies multiple times.',
    icon: '🏹',
  },
];

const rogueClass: MAGAClass = {
  id: 'class-rogue',
  name: 'Rogue',
  description:
    'Swift and cunning, Rogues strike from the shadows and vanish before the enemy can retaliate.',
  archetype: 'stealth',
  primaryStat: 'dexterity',
  secondaryStat: 'agility',
  baseStats: {
    ...ZERO_STATS,
    hp: 90, maxHp: 90, mp: 45, maxMp: 45, stamina: 80, maxStamina: 80,
    strength: 12, endurance: 9, intelligence: 10, wisdom: 8,
    agility: 18, dexterity: 16, charisma: 14, willpower: 10,
    constitution: 9, perception: 16,
    attack: 16, defense: 10, magicAttack: 10, magicDefense: 12,
    speed: 20, luck: 18, critChance: 14, critDamage: 160,
    dodgeChance: 12, hitRate: 92, elementalResistance: 4,
  },
  statGrowthRates: {
    ...ZERO_GROWTH,
    hp: 6, maxHp: 6, mp: 3, maxMp: 3,
    dexterity: 2.5, agility: 2.5, speed: 1.5, luck: 1.2, attack: 1.8,
    critChance: 0.5, dodgeChance: 0.4,
  },
  startingSkills: ['skill-backstab', 'skill-poison-dart', 'skill-evade'],
  subclasses: rogueSubclasses,
  allowedEquipmentTypes: ['dagger', 'bow', 'light_armor', 'medium_armor', 'boots', 'gloves', 'ring', 'amulet', 'cloak'],
  color: '#27ae60',
  icon: '🗡️',
};

// ============================================================================
// ── CLERIC ────────────────────────────────────────────────────────────────────
// ============================================================================

const clericSubclasses: MAGASubclass[] = [
  {
    id: 'subclass-bishop',
    name: 'Bishop',
    parentClassId: 'class-cleric',
    description: 'A high-ranking ecclesiast who channels divine power into mighty holy spells.',
    flavorText: '"The light of the divine flows through every word I speak."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, wisdom: 8, magicAttack: 10, magicDefense: 6, mp: 20, maxMp: 20 },
    exclusiveSkills: ['skill-divine-wrath', 'skill-resurrection', 'skill-sacred-barrier'],
    passiveTrait: 'Holy Communion – heals restore 10% more HP per buff stack on the target.',
    ultimateAbility: 'Armageddon Prayer – calls heavenly fire on all foes while fully restoring one ally.',
    icon: '✝️',
  },
  {
    id: 'subclass-druid',
    name: 'Druid',
    parentClassId: 'class-cleric',
    description: 'Draws power from nature, blending healing with earth and nature magic.',
    flavorText: '"The forest breathes and I breathe with it."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, wisdom: 6, perception: 6, magicAttack: 6, hp: 15, maxHp: 15 },
    exclusiveSkills: ['skill-entangle', 'skill-regeneration', 'skill-natures-wrath'],
    passiveTrait: 'Nature Bond – regenerates 2% max MP at the start of each turn.',
    ultimateAbility: 'World Tree – summons an ancient tree that heals all allies and poisons all enemies each turn for 3 turns.',
    icon: '🌿',
  },
  {
    id: 'subclass-shaman',
    name: 'Shaman',
    parentClassId: 'class-cleric',
    description: 'Channels spiritual energy and ancestor spirits to bolster allies and curse foes.',
    flavorText: '"The ancestors speak. I merely translate their will."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, wisdom: 5, charisma: 6, willpower: 6, magicDefense: 8 },
    exclusiveSkills: ['skill-spirit-link', 'skill-hex-curse', 'skill-ancestor-call'],
    passiveTrait: 'Spirit Ward – passively reduces all debuff durations on allies by 1 turn.',
    ultimateAbility: 'Grand Séance – all ancestor spirits attack every enemy simultaneously.',
    icon: '🪬',
  },
];

const clericClass: MAGAClass = {
  id: 'class-cleric',
  name: 'Cleric',
  description:
    'Holy healers and divine spellcasters who keep the party alive and smite undead.',
  archetype: 'support',
  primaryStat: 'wisdom',
  secondaryStat: 'willpower',
  baseStats: {
    ...ZERO_STATS,
    hp: 100, maxHp: 100, mp: 70, maxMp: 70, stamina: 70, maxStamina: 70,
    strength: 10, endurance: 12, intelligence: 14, wisdom: 18,
    agility: 8, dexterity: 8, charisma: 14, willpower: 16,
    constitution: 12, perception: 12,
    attack: 10, defense: 14, magicAttack: 16, magicDefense: 20,
    speed: 8, luck: 14, critChance: 6, critDamage: 140,
    dodgeChance: 4, hitRate: 88, elementalResistance: 12,
  },
  statGrowthRates: {
    ...ZERO_GROWTH,
    hp: 8, maxHp: 8, mp: 6, maxMp: 6,
    wisdom: 3.0, willpower: 2.0, magicDefense: 1.5, magicAttack: 1.5,
    constitution: 1.5, luck: 0.8,
  },
  startingSkills: ['skill-heal', 'skill-cure', 'skill-holy-light', 'skill-bless'],
  subclasses: clericSubclasses,
  allowedEquipmentTypes: ['mace', 'staff', 'wand', 'shield', 'heavy_armor', 'medium_armor', 'robe', 'helmet', 'boots', 'ring', 'amulet'],
  color: '#f39c12',
  icon: '✨',
};

// ============================================================================
// ── SUMMONER ──────────────────────────────────────────────────────────────────
// ============================================================================

const summonerSubclasses: MAGASubclass[] = [
  {
    id: 'subclass-beastmaster',
    name: 'Beastmaster',
    parentClassId: 'class-summoner',
    description: 'Bonds with wild animals to fight alongside them in battle.',
    flavorText: '"Every beast is kin. Every claw fights for me."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, perception: 6, wisdom: 4, charisma: 4, hp: 15, maxHp: 15 },
    exclusiveSkills: ['skill-beast-pact', 'skill-primal-surge', 'skill-pack-hunt'],
    passiveTrait: 'Beast Empathy – summoned beasts gain +20% stats when at full HP.',
    ultimateAbility: 'Wild Stampede – unleashes all bonded beasts in a devastating charge.',
    icon: '🐾',
  },
  {
    id: 'subclass-necromancer',
    name: 'Necromancer',
    parentClassId: 'class-summoner',
    description: 'Raises the dead to fight as undead soldiers.',
    flavorText: '"Death is not the end. It is merely a change of employers."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, intelligence: 6, willpower: 6, mp: 20, maxMp: 20, magicAttack: 8 },
    exclusiveSkills: ['skill-raise-dead', 'skill-soul-drain', 'skill-death-coil'],
    passiveTrait: 'Death Harvest – restores 5 MP for every enemy killed.',
    ultimateAbility: 'Army of Darkness – raises all defeated enemies as undead allies for the remainder of the battle.',
    icon: '💀',
  },
  {
    id: 'subclass-spiritualist',
    name: 'Spiritualist',
    parentClassId: 'class-summoner',
    description: 'Calls forth elemental spirits that imbue allies with powerful enchantments.',
    flavorText: '"The spirits chose me. I only provide them a voice."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, wisdom: 6, intelligence: 4, charisma: 6, magicDefense: 6 },
    exclusiveSkills: ['skill-elemental-pact', 'skill-spirit-imbue', 'skill-aether-storm'],
    passiveTrait: "Spiritual Attunement – elemental spirits deal 15% bonus damage matching target's weakness.",
    ultimateAbility: 'Prismatic Summon – calls a great elemental avatar that attacks with all four elements.',
    icon: '🌟',
  },
];

const summonerClass: MAGAClass = {
  id: 'class-summoner',
  name: 'Summoner',
  description:
    'Calls powerful creatures and spirits to fight. Summoners are versatile but resource-intensive.',
  archetype: 'summoner',
  primaryStat: 'wisdom',
  secondaryStat: 'intelligence',
  baseStats: {
    ...ZERO_STATS,
    hp: 80, maxHp: 80, mp: 90, maxMp: 90, stamina: 65, maxStamina: 65,
    strength: 7, endurance: 8, intelligence: 16, wisdom: 18,
    agility: 9, dexterity: 9, charisma: 14, willpower: 14,
    constitution: 8, perception: 14,
    attack: 8, defense: 8, magicAttack: 18, magicDefense: 16,
    speed: 9, luck: 12, critChance: 8, critDamage: 150,
    dodgeChance: 6, hitRate: 90, elementalResistance: 8,
  },
  statGrowthRates: {
    ...ZERO_GROWTH,
    hp: 5, maxHp: 5, mp: 7, maxMp: 7,
    wisdom: 2.8, intelligence: 2.2, magicAttack: 2.0, charisma: 1.5, luck: 0.7,
  },
  startingSkills: ['skill-summon-imp', 'skill-mana-shield', 'skill-arcane-bolt'],
  subclasses: summonerSubclasses,
  allowedEquipmentTypes: ['staff', 'wand', 'tome', 'robe', 'light_armor', 'boots', 'ring', 'amulet', 'cloak'],
  color: '#1abc9c',
  icon: '🌀',
};

// ============================================================================
// ── MONK ──────────────────────────────────────────────────────────────────────
// ============================================================================

const monkSubclasses: MAGASubclass[] = [
  {
    id: 'subclass-martial-artist',
    name: 'Martial Artist',
    parentClassId: 'class-monk',
    description: 'Pushes physical limits to deliver lightning-fast combo attacks.',
    flavorText: '"A thousand strikes learned in silence. Unleashed in an instant."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, strength: 5, agility: 6, dexterity: 6, speed: 5, critChance: 6 },
    exclusiveSkills: ['skill-dragon-combo', 'skill-iron-fist', 'skill-counter-stance'],
    passiveTrait: 'Flow State – consecutive strikes on the same target deal 5% more damage each (max +50%).',
    ultimateAbility: 'Hundred Fists – delivers 100 rapid strikes spreading damage across all enemies.',
    icon: '🥊',
  },
  {
    id: 'subclass-qi-master',
    name: 'Qi Master',
    parentClassId: 'class-monk',
    description: 'Channels internal energy (qi) to heal, buff and unleash devastating energy blasts.',
    flavorText: '"Qi is life-force. Learn to master it and you master existence."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, wisdom: 6, willpower: 6, magicAttack: 8, mp: 15, maxMp: 15 },
    exclusiveSkills: ['skill-qi-blast', 'skill-inner-peace', 'skill-energy-shield'],
    passiveTrait: 'Inner Reservoir – gains 3 stamina each time an enemy misses.',
    ultimateAbility: 'Transcendence – enters a state of perfect balance; immune to damage for 1 turn and fully restores stamina.',
    icon: '☯️',
  },
  {
    id: 'subclass-shadow-monk',
    name: 'Shadow Monk',
    parentClassId: 'class-monk',
    description: 'Blends unarmed combat with shadow arts to disorient and assassinate.',
    flavorText: '"I am neither here nor there. I am the shadow between thoughts."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, agility: 6, perception: 6, dexterity: 4, dodgeChance: 8, critChance: 5 },
    exclusiveSkills: ['skill-void-step', 'skill-shadow-palm', 'skill-darkness-veil'],
    passiveTrait: 'Void Walker – teleports to a random position each time an attack is dodged, confusing AI targeting.',
    ultimateAbility: 'Shadow Realm – pulls all enemies into the shadow dimension for 2 turns of unresisted attacks.',
    icon: '🌑',
  },
];

const monkClass: MAGAClass = {
  id: 'class-monk',
  name: 'Monk',
  description:
    'Disciplined fighters who use unarmed techniques and inner energy to overcome any challenge.',
  archetype: 'hybrid',
  primaryStat: 'agility',
  secondaryStat: 'wisdom',
  baseStats: {
    ...ZERO_STATS,
    hp: 95, maxHp: 95, mp: 55, maxMp: 55, stamina: 90, maxStamina: 90,
    strength: 12, endurance: 11, intelligence: 10, wisdom: 12,
    agility: 16, dexterity: 14, charisma: 10, willpower: 14,
    constitution: 11, perception: 12,
    attack: 14, defense: 12, magicAttack: 12, magicDefense: 14,
    speed: 14, luck: 12, critChance: 12, critDamage: 155,
    dodgeChance: 10, hitRate: 93, elementalResistance: 6,
  },
  statGrowthRates: {
    ...ZERO_GROWTH,
    hp: 7, maxHp: 7, stamina: 4, maxStamina: 4,
    agility: 2.4, wisdom: 2.0, dexterity: 2.0, speed: 1.4, dodgeChance: 0.5,
    critChance: 0.4,
  },
  startingSkills: ['skill-roundhouse', 'skill-meditate', 'skill-pressure-point'],
  subclasses: monkSubclasses,
  allowedEquipmentTypes: ['fist', 'light_armor', 'robe', 'boots', 'gloves', 'ring', 'amulet', 'cloak'],
  color: '#e67e22',
  icon: '👊',
};

// ============================================================================
// ── RANGER ────────────────────────────────────────────────────────────────────
// ============================================================================

const rangerSubclasses: MAGASubclass[] = [
  {
    id: 'subclass-sharpshooter',
    name: 'Sharpshooter',
    parentClassId: 'class-ranger',
    description: 'An elite marksman who never misses and excels at single-target elimination.',
    flavorText: '"One arrow. One kill. No exceptions."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, dexterity: 8, perception: 6, attack: 10, critChance: 8, hitRate: 8 },
    exclusiveSkills: ['skill-headshot', 'skill-piercing-shot', 'skill-dead-eye'],
    passiveTrait: "Perfect Aim – ignores 20% of target's defense when attacking from full health.",
    ultimateAbility: "Killshot – a single arrow that bypasses all defenses and armor.",
    icon: '🎯',
  },
  {
    id: 'subclass-trapper',
    name: 'Trapper',
    parentClassId: 'class-ranger',
    description: 'Sets cunning traps and environmental hazards to control the battlefield.',
    flavorText: "\"The battlefield is already mine. You just haven't noticed the traps yet.\"",
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, perception: 8, dexterity: 4, agility: 4, luck: 6 },
    exclusiveSkills: ['skill-bear-trap', 'skill-explosive-mine', 'skill-snare-net'],
    passiveTrait: 'Prepared Ground – traps activate 50% faster and persist an extra turn.',
    ultimateAbility: 'Minefield – plants traps on every enemy position simultaneously.',
    icon: '🪤',
  },
  {
    id: 'subclass-beastcaller',
    name: 'Beastcaller',
    parentClassId: 'class-ranger',
    description: 'Calls animal companions to distract, track, and fight alongside them.',
    flavorText: '"Animals know truths that people forget."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, charisma: 6, wisdom: 4, perception: 6, hp: 10, maxHp: 10 },
    exclusiveSkills: ['skill-wolf-call', 'skill-eagle-scout', 'skill-bear-companion'],
    passiveTrait: 'Pack Instinct – deal 10% bonus damage when a companion attacks the same target this turn.',
    ultimateAbility: 'Apex Predator – calls the mightiest creature in the region to rampage through all enemies.',
    icon: '🦅',
  },
];

const rangerClass: MAGAClass = {
  id: 'class-ranger',
  name: 'Ranger',
  description:
    'Expert trackers and archers who dominate at range and command the wilderness.',
  archetype: 'hybrid',
  primaryStat: 'dexterity',
  secondaryStat: 'perception',
  baseStats: {
    ...ZERO_STATS,
    hp: 95, maxHp: 95, mp: 40, maxMp: 40, stamina: 75, maxStamina: 75,
    strength: 12, endurance: 10, intelligence: 10, wisdom: 12,
    agility: 14, dexterity: 16, charisma: 10, willpower: 10,
    constitution: 10, perception: 16,
    attack: 15, defense: 11, magicAttack: 8, magicDefense: 10,
    speed: 13, luck: 14, critChance: 12, critDamage: 158,
    dodgeChance: 9, hitRate: 94, elementalResistance: 5,
  },
  statGrowthRates: {
    ...ZERO_GROWTH,
    hp: 6, maxHp: 6, mp: 2, maxMp: 2,
    dexterity: 2.5, perception: 2.2, agility: 1.8, attack: 1.6, speed: 1.0,
    luck: 0.7,
  },
  startingSkills: ['skill-quick-shot', 'skill-track', 'skill-camouflage'],
  subclasses: rangerSubclasses,
  allowedEquipmentTypes: ['bow', 'dagger', 'light_armor', 'medium_armor', 'boots', 'gloves', 'ring', 'amulet', 'cloak'],
  color: '#16a085',
  icon: '🏹',
};

// ============================================================================
// ── BARD ──────────────────────────────────────────────────────────────────────
// ============================================================================

const bardSubclasses: MAGASubclass[] = [
  {
    id: 'subclass-virtuoso',
    name: 'Virtuoso',
    parentClassId: 'class-bard',
    description: 'A musical genius whose performances reach godlike intensity, amplifying all allies.',
    flavorText: '"When I play, even the gods stop to listen."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, charisma: 8, intelligence: 4, mp: 20, maxMp: 20, magicAttack: 6 },
    exclusiveSkills: ['skill-grand-finale', 'skill-harmonic-resonance', 'skill-maestro-tempo'],
    passiveTrait: 'Perfect Pitch – song buffs last 1 additional turn.',
    ultimateAbility: 'Magnum Opus – plays a legendary composition that fully heals all allies and stuns all enemies.',
    icon: '🎻',
  },
  {
    id: 'subclass-skald',
    name: 'Skald',
    parentClassId: 'class-bard',
    description: 'A battle-bard who weaves war chants into combat, fighting alongside allies.',
    flavorText: '"My blade sings as loudly as my voice."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, strength: 4, charisma: 5, endurance: 4, attack: 6, hp: 15, maxHp: 15 },
    exclusiveSkills: ['skill-war-chant', 'skill-battle-hymn', 'skill-valor-strike'],
    passiveTrait: 'Battlesong – attacking while a song is active grants all allies +5% attack for that turn.',
    ultimateAbility: 'Saga of Heroes – invokes the spirits of legendary warriors to fight for the party.',
    icon: '🪗',
  },
  {
    id: 'subclass-enchanter',
    name: 'Enchanter',
    parentClassId: 'class-bard',
    description: "Uses melodic magic to bewitch enemies and enchant allies' equipment.",
    flavorText: '"A well-placed melody can move armies more surely than any weapon."',
    levelRequirement: 10,
    bonusStats: { ...ZERO_STATS, charisma: 7, wisdom: 5, magicDefense: 8, luck: 6 },
    exclusiveSkills: ['skill-enchant-weapon', 'skill-lullaby', 'skill-charm'],
    passiveTrait: 'Silver Tongue – charm effects last 1 additional turn and cannot be broken early.',
    ultimateAbility: 'Mass Enthrall – charms every enemy on the field, causing them to attack each other for 2 turns.',
    icon: '🎶',
  },
];

const bardClass: MAGAClass = {
  id: 'class-bard',
  name: 'Bard',
  description:
    'Charismatic performers who inspire allies with songs, debuff enemies, and occasionally fight.',
  archetype: 'support',
  primaryStat: 'charisma',
  secondaryStat: 'wisdom',
  baseStats: {
    ...ZERO_STATS,
    hp: 85, maxHp: 85, mp: 75, maxMp: 75, stamina: 70, maxStamina: 70,
    strength: 9, endurance: 9, intelligence: 13, wisdom: 14,
    agility: 11, dexterity: 12, charisma: 20, willpower: 12,
    constitution: 9, perception: 13,
    attack: 10, defense: 9, magicAttack: 14, magicDefense: 14,
    speed: 11, luck: 16, critChance: 8, critDamage: 145,
    dodgeChance: 7, hitRate: 88, elementalResistance: 6,
  },
  statGrowthRates: {
    ...ZERO_GROWTH,
    hp: 5, maxHp: 5, mp: 5, maxMp: 5,
    charisma: 3.0, wisdom: 2.0, luck: 1.5, magicAttack: 1.2, speed: 0.8,
  },
  startingSkills: ['skill-inspire', 'skill-lullaby', 'skill-dissonance'],
  subclasses: bardSubclasses,
  allowedEquipmentTypes: ['sword', 'dagger', 'instrument', 'light_armor', 'robe', 'boots', 'ring', 'amulet', 'cloak'],
  color: '#d35400',
  icon: '🎵',
};

// ============================================================================
// MASTER EXPORTS
// ============================================================================

/** All 8 primary MAGA classes. */
export const magaClasses: MAGAClass[] = [
  warriorClass,
  mageClass,
  rogueClass,
  clericClass,
  summonerClass,
  monkClass,
  rangerClass,
  bardClass,
];

/** Flat list of all 24 subclasses. */
export const magaSubclasses: MAGASubclass[] = magaClasses.flatMap(
  (c) => c.subclasses
);

/** Lookup map: class ID → MAGAClass. */
export const magaClassById: Record<string, MAGAClass> = Object.fromEntries(
  magaClasses.map((c) => [c.id, c])
);

/** Lookup map: subclass ID → MAGASubclass. */
export const magaSubclassById: Record<string, MAGASubclass> =
  Object.fromEntries(magaSubclasses.map((s) => [s.id, s]));
