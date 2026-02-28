/**
 * Sample Skill Data for RPG Workbench
 */

import type { Skill } from '../generated/types';

export const sampleSkills: Skill[] = [
  // Warrior Skills
  {
    id: 'skill-slash',
    name: 'Slash',
    description: 'A basic sword attack',
    type: 'physical',
    mpCost: 0,
    power: 100,
    accuracy: 95,
    targetType: 'single',
  },
  {
    id: 'skill-power-strike',
    name: 'Power Strike',
    description: 'A powerful attack that deals 150% damage',
    type: 'physical',
    mpCost: 10,
    power: 150,
    accuracy: 90,
    targetType: 'single',
  },
  {
    id: 'skill-defend',
    name: 'Defend',
    description: 'Reduce incoming damage by 50%',
    type: 'support',
    mpCost: 0,
    power: 0,
    accuracy: 100,
    targetType: 'self',
  },
  
  // Mage Skills
  {
    id: 'skill-fireball',
    name: 'Fireball',
    description: 'Launch a ball of fire at the enemy',
    type: 'magical',
    mpCost: 15,
    power: 120,
    accuracy: 95,
    targetType: 'single',
    element: 'fire',
  },
  {
    id: 'skill-ice-shard',
    name: 'Ice Shard',
    description: 'Fire sharp ice shards at the enemy',
    type: 'magical',
    mpCost: 12,
    power: 110,
    accuracy: 95,
    targetType: 'single',
    element: 'ice',
  },
  {
    id: 'skill-lightning',
    name: 'Lightning',
    description: 'Strike all enemies with lightning',
    type: 'magical',
    mpCost: 25,
    power: 100,
    accuracy: 90,
    targetType: 'all',
    element: 'lightning',
  },
  
  // Rogue Skills
  {
    id: 'skill-backstab',
    name: 'Backstab',
    description: 'A sneaky attack with high critical chance',
    type: 'physical',
    mpCost: 8,
    power: 130,
    accuracy: 85,
    targetType: 'single',
  },
  {
    id: 'skill-poison-dart',
    name: 'Poison Dart',
    description: 'Throw a poisoned dart',
    type: 'physical',
    mpCost: 10,
    power: 80,
    accuracy: 95,
    targetType: 'single',
    statusEffect: 'poison',
  },
  {
    id: 'skill-evade',
    name: 'Evade',
    description: 'Increase evasion for 3 turns',
    type: 'support',
    mpCost: 5,
    power: 0,
    accuracy: 100,
    targetType: 'self',
  },
  
  // Cleric Skills
  {
    id: 'skill-heal',
    name: 'Heal',
    description: 'Restore 50 HP to an ally',
    type: 'support',
    mpCost: 12,
    power: 50,
    accuracy: 100,
    targetType: 'ally',
  },
  {
    id: 'skill-cure',
    name: 'Cure',
    description: 'Remove all status effects from an ally',
    type: 'support',
    mpCost: 8,
    power: 0,
    accuracy: 100,
    targetType: 'ally',
  },
  {
    id: 'skill-holy-light',
    name: 'Holy Light',
    description: 'Deal holy damage to all enemies',
    type: 'magical',
    mpCost: 20,
    power: 90,
    accuracy: 95,
    targetType: 'all',
    element: 'holy',
  },
  {
    id: 'skill-bless',
    name: 'Bless',
    description: 'Increase all stats for all allies',
    type: 'support',
    mpCost: 15,
    power: 0,
    accuracy: 100,
    targetType: 'ally',
  },
];

export const skillsById = sampleSkills.reduce((acc, skill) => {
  acc[skill.id] = skill;
  return acc;
}, {} as Record<string, Skill>);
