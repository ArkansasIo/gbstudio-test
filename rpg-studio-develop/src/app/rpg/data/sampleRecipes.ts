/**
 * Sample Crafting Recipe Data for RPG Workbench
 */

import type { Recipe, CraftingStation } from '../generated/types';

export const sampleRecipes: Recipe[] = [
  {
    id: 'recipe-health-potion',
    name: 'Health Potion',
    description: 'Brew a healing potion',
    category: 'Alchemy',
    materials: [
      { itemId: 'item-healing-herb', quantity: 2 },
      { itemId: 'item-water', quantity: 1 },
    ],
    result: { itemId: 'item-health-potion', quantity: 1 },
    stationRequired: 'alchemy-table',
    level: 1,
  },
  {
    id: 'recipe-iron-sword',
    name: 'Iron Sword',
    description: 'Forge an iron sword',
    category: 'Blacksmithing',
    materials: [
      { itemId: 'item-iron-ore', quantity: 3 },
      { itemId: 'item-wood', quantity: 1 },
    ],
    result: { itemId: 'item-iron-sword', quantity: 1 },
    stationRequired: 'forge',
    level: 2,
  },
  {
    id: 'recipe-leather-armor',
    name: 'Leather Armor',
    description: 'Craft leather armor',
    category: 'Leatherworking',
    materials: [
      { itemId: 'item-leather', quantity: 5 },
      { itemId: 'item-thread', quantity: 2 },
    ],
    result: { itemId: 'item-leather-armor', quantity: 1 },
    stationRequired: 'workbench',
    level: 1,
  },
  {
    id: 'recipe-wooden-staff',
    name: 'Wooden Staff',
    description: 'Carve a wooden staff',
    category: 'Woodworking',
    materials: [
      { itemId: 'item-wood', quantity: 4 },
      { itemId: 'item-crystal-shard', quantity: 1 },
    ],
    result: { itemId: 'item-wooden-staff', quantity: 1 },
    stationRequired: 'workbench',
    level: 2,
  },
];

export const sampleCraftingStations: CraftingStation[] = [
  {
    id: 'forge',
    name: 'Forge',
    type: 'blacksmithing',
    level: 1,
    recipes: ['recipe-iron-sword', 'recipe-dagger'],
  },
  {
    id: 'alchemy-table',
    name: 'Alchemy Table',
    type: 'alchemy',
    level: 1,
    recipes: ['recipe-health-potion', 'recipe-mana-potion'],
  },
  {
    id: 'workbench',
    name: 'Workbench',
    type: 'general',
    level: 1,
    recipes: ['recipe-leather-armor', 'recipe-wooden-staff'],
  },
];
