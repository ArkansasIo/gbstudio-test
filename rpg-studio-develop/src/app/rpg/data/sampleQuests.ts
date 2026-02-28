/**
 * Sample Quest Data for RPG Workbench
 */

import type { Quest } from '../generated/types';

export const sampleQuests: Quest[] = [
  {
    id: 'quest-main-1',
    title: 'The Dark Forest',
    description: 'Investigate the mysterious darkness spreading through the forest.',
    status: 'active',
    level: 5,
    objectives: [
      {
        id: 'obj-1',
        description: 'Defeat 5 Shadow Wolves',
        type: 'kill',
        target: 'shadow-wolf',
        current: 3,
        required: 5,
        completed: false,
      },
      {
        id: 'obj-2',
        description: 'Find the Ancient Shrine',
        type: 'explore',
        target: 'ancient-shrine',
        current: 0,
        required: 1,
        completed: false,
      },
    ],
    rewards: [
      { type: 'experience', value: 500 },
      { type: 'gold', value: 200 },
      { type: 'item', value: 1, itemId: 'item-crystal-shard' },
    ],
  },
  {
    id: 'quest-side-1',
    title: 'Lost Heirloom',
    description: 'Help the village elder find their lost family heirloom.',
    status: 'active',
    level: 3,
    objectives: [
      {
        id: 'obj-3',
        description: 'Talk to the Village Elder',
        type: 'talk',
        target: 'village-elder',
        current: 1,
        required: 1,
        completed: true,
      },
      {
        id: 'obj-4',
        description: 'Search the Old Mine',
        type: 'explore',
        target: 'old-mine',
        current: 0,
        required: 1,
        completed: false,
      },
      {
        id: 'obj-5',
        description: 'Collect the Heirloom',
        type: 'collect',
        target: 'family-heirloom',
        current: 0,
        required: 1,
        completed: false,
      },
    ],
    rewards: [
      { type: 'experience', value: 200 },
      { type: 'gold', value: 100 },
    ],
  },
  {
    id: 'quest-side-2',
    title: 'Herb Gathering',
    description: 'Collect healing herbs for the town healer.',
    status: 'available',
    level: 1,
    objectives: [
      {
        id: 'obj-6',
        description: 'Collect 10 Healing Herbs',
        type: 'collect',
        target: 'healing-herb',
        current: 0,
        required: 10,
        completed: false,
      },
    ],
    rewards: [
      { type: 'experience', value: 100 },
      { type: 'gold', value: 50 },
      { type: 'item', value: 3, itemId: 'item-health-potion' },
    ],
  },
  {
    id: 'quest-main-2',
    title: 'The Bandit King',
    description: 'Defeat the Bandit King terrorizing the trade routes.',
    status: 'completed',
    level: 4,
    objectives: [
      {
        id: 'obj-7',
        description: 'Defeat 10 Bandits',
        type: 'kill',
        target: 'bandit',
        current: 10,
        required: 10,
        completed: true,
      },
      {
        id: 'obj-8',
        description: 'Defeat the Bandit King',
        type: 'kill',
        target: 'bandit-king',
        current: 1,
        required: 1,
        completed: true,
      },
    ],
    rewards: [
      { type: 'experience', value: 400 },
      { type: 'gold', value: 300 },
      { type: 'item', value: 1, itemId: 'item-iron-sword' },
    ],
  },
];
