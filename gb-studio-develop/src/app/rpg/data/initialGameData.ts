/**
 * Initial Game Data for RPG Workbench
 */

import type { RPGGameState } from '../generated/state';
import { sampleCharacters } from './sampleCharacters';
import { sampleQuests } from './sampleQuests';

export const createInitialGameData = (): Partial<RPGGameState> => ({
  characters: sampleCharacters,
  activeParty: ['char-hero', 'char-mage'],
  reserves: ['char-rogue', 'char-cleric'],
  inventory: {
    items: [
      { itemId: 'item-health-potion', quantity: 5 },
      { itemId: 'item-mana-potion', quantity: 3 },
      { itemId: 'item-antidote', quantity: 2 },
      { itemId: 'item-iron-ore', quantity: 10 },
      { itemId: 'item-wood', quantity: 15 },
      { itemId: 'item-leather', quantity: 8 },
      { itemId: 'item-old-key', quantity: 1 },
    ],
    capacity: 100,
    gold: 500,
  },
  quests: sampleQuests,
  currentMap: 'town-square',
  playerPosition: { x: 10, y: 15 },
  flags: {
    'tutorial-complete': true,
    'met-village-elder': true,
    'forest-unlocked': true,
  },
  variables: {
    'reputation-town': 50,
    'reputation-guild': 25,
    'days-passed': 5,
  },
  playtime: 3600, // 1 hour in seconds
  saveSlots: [1, 2],
});
