/**
 * D&D 5e Inspired Biome Definitions
 */

import { BiomeDefinition, BiomeType } from './types';

export const BIOMES: Record<BiomeType, BiomeDefinition> = {
  underdark: {
    name: 'Underdark',
    description: 'Deep underground caverns filled with aberrations and drow',
    enemyTypes: ['aberration', 'drow', 'duergar', 'mind flayer', 'beholder', 'hook horror'],
    features: ['chasm', 'fungus', 'crystal', 'water'],
    ambience: 'Echoing drips, distant roars, bioluminescent fungi',
    lightLevel: 'dark',
    hazards: ['poisonous gas', 'unstable ground', 'psychic emanations']
  },
  
  crypt: {
    name: 'Ancient Crypt',
    description: 'Burial chambers haunted by the restless dead',
    enemyTypes: ['undead', 'skeleton', 'zombie', 'wraith', 'vampire', 'lich'],
    features: ['altar', 'statue', 'rubble', 'pit'],
    ambience: 'Cold air, whispers, rattling bones',
    lightLevel: 'dim',
    hazards: ['necrotic energy', 'cursed ground', 'collapsing ceiling']
  },
  
  cave: {
    name: 'Natural Caves',
    description: 'Winding caverns carved by water and time',
    enemyTypes: ['beast', 'goblin', 'kobold', 'troll', 'ogre', 'bat swarm'],
    features: ['water', 'rubble', 'chasm', 'crystal'],
    ambience: 'Dripping water, animal sounds, wind howling',
    lightLevel: 'dark',
    hazards: ['flooding', 'rockfall', 'slippery surfaces']
  },
  
  ruins: {
    name: 'Ancient Ruins',
    description: 'Crumbling remnants of a forgotten civilization',
    enemyTypes: ['construct', 'elemental', 'ghost', 'gargoyle', 'animated armor'],
    features: ['rubble', 'statue', 'pillar', 'altar'],
    ambience: 'Crumbling stone, ancient magic, echoing halls',
    lightLevel: 'dim',
    hazards: ['unstable floors', 'magical wards', 'falling debris']
  },
  
  fortress: {
    name: 'Fortress',
    description: 'Military stronghold occupied by hostile forces',
    enemyTypes: ['humanoid', 'orc', 'hobgoblin', 'knight', 'warlord', 'guard'],
    features: ['pillar', 'rubble', 'altar'],
    ambience: 'Marching boots, weapon clatter, shouted orders',
    lightLevel: 'bright',
    hazards: ['arrow slits', 'murder holes', 'boiling oil']
  },
  
  temple: {
    name: 'Desecrated Temple',
    description: 'Holy site corrupted by dark powers',
    enemyTypes: ['fiend', 'cultist', 'demon', 'devil', 'dark priest', 'hellhound'],
    features: ['altar', 'statue', 'pillar', 'lava'],
    ambience: 'Unholy chanting, sulfur smell, flickering flames',
    lightLevel: 'dim',
    hazards: ['unholy ground', 'summoning circles', 'divine wrath']
  },
  
  sewers: {
    name: 'City Sewers',
    description: 'Filthy underground waterways beneath the city',
    enemyTypes: ['ooze', 'rat swarm', 'crocodile', 'thug', 'wererat', 'otyugh'],
    features: ['water', 'rubble', 'fungus'],
    ambience: 'Rushing water, squeaking rats, dripping filth',
    lightLevel: 'dark',
    hazards: ['disease', 'toxic fumes', 'drowning']
  },
  
  mine: {
    name: 'Abandoned Mine',
    description: 'Old mining tunnels now home to monsters',
    enemyTypes: ['elemental', 'dwarf zombie', 'rust monster', 'xorn', 'earth elemental'],
    features: ['rubble', 'crystal', 'chasm', 'pillar'],
    ambience: 'Creaking timbers, distant rumbling, pickaxe echoes',
    lightLevel: 'dark',
    hazards: ['cave-in', 'toxic gas', 'unstable supports']
  },
  
  laboratory: {
    name: 'Mad Wizard\'s Laboratory',
    description: 'Arcane workshop filled with magical experiments',
    enemyTypes: ['construct', 'homunculus', 'flesh golem', 'animated object', 'mage'],
    features: ['crystal', 'altar', 'statue'],
    ambience: 'Bubbling potions, crackling energy, arcane humming',
    lightLevel: 'bright',
    hazards: ['wild magic', 'explosive reagents', 'teleportation traps']
  },
  
  prison: {
    name: 'Underground Prison',
    description: 'Dark cells holding dangerous criminals and worse',
    enemyTypes: ['humanoid', 'prisoner', 'guard', 'torturer', 'chain devil', 'ghost'],
    features: ['pit', 'rubble', 'water'],
    ambience: 'Rattling chains, distant screams, dripping water',
    lightLevel: 'dim',
    hazards: ['locked doors', 'torture devices', 'starvation']
  }
};

export function getBiome(type: BiomeType): BiomeDefinition {
  return BIOMES[type];
}

export function getRandomBiome(seed: number): BiomeType {
  const biomes = Object.keys(BIOMES) as BiomeType[];
  return biomes[seed % biomes.length];
}
