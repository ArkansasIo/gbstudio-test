/**
 * D&D 5e Treasure Generation
 */

import { Treasure, TreasureItem, DifficultyTier } from './types';
import { SeededRandom } from './random';

// Gold rewards by tier (D&D 5e DMG)
const GOLD_BY_TIER = {
  1: { min: 50, max: 200 },
  2: { min: 200, max: 1000 },
  3: { min: 1000, max: 5000 },
  4: { min: 5000, max: 20000 }
};

const MAGIC_ITEMS = {
  common: [
    { name: 'Potion of Healing', type: 'potion' as const, value: 50 },
    { name: 'Torch of Continual Flame', type: 'wondrous' as const, value: 75 },
    { name: 'Rope of Climbing', type: 'wondrous' as const, value: 100 }
  ],
  uncommon: [
    { name: 'Potion of Greater Healing', type: 'potion' as const, value: 150 },
    { name: '+1 Weapon', type: 'weapon' as const, value: 500 },
    { name: 'Cloak of Protection', type: 'wondrous' as const, value: 500 },
    { name: 'Bag of Holding', type: 'wondrous' as const, value: 400 }
  ],
  rare: [
    { name: 'Potion of Superior Healing', type: 'potion' as const, value: 500 },
    { name: '+2 Weapon', type: 'weapon' as const, value: 2000 },
    { name: 'Ring of Spell Storing', type: 'wondrous' as const, value: 2500 },
    { name: 'Flame Tongue', type: 'weapon' as const, value: 3000 }
  ],
  'very rare': [
    { name: 'Potion of Supreme Healing', type: 'potion' as const, value: 2000 },
    { name: '+3 Weapon', type: 'weapon' as const, value: 10000 },
    { name: 'Ring of Regeneration', type: 'wondrous' as const, value: 12000 },
    { name: 'Vorpal Sword', type: 'weapon' as const, value: 15000 }
  ],
  legendary: [
    { name: 'Potion of Invulnerability', type: 'potion' as const, value: 5000 },
    { name: 'Holy Avenger', type: 'weapon' as const, value: 50000 },
    { name: 'Ring of Three Wishes', type: 'wondrous' as const, value: 100000 },
    { name: 'Staff of the Magi', type: 'wondrous' as const, value: 75000 }
  ]
};

const GEMS = [
  { name: 'Azurite', value: 10 },
  { name: 'Quartz', value: 50 },
  { name: 'Jasper', value: 50 },
  { name: 'Amber', value: 100 },
  { name: 'Pearl', value: 100 },
  { name: 'Garnet', value: 100 },
  { name: 'Jade', value: 100 },
  { name: 'Topaz', value: 500 },
  { name: 'Sapphire', value: 1000 },
  { name: 'Ruby', value: 5000 },
  { name: 'Diamond', value: 5000 }
];

export function generateTreasure(
  tier: DifficultyTier,
  rarity: 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary',
  random: SeededRandom
): Treasure {
  const goldRange = GOLD_BY_TIER[tier];
  const gold = random.nextInt(goldRange.min, goldRange.max);

  const items: TreasureItem[] = [];

  // Add magic items based on rarity
  const itemCount = rarity === 'legendary' ? random.nextInt(2, 4) : random.nextInt(1, 3);
  
  for (let i = 0; i < itemCount; i++) {
    const itemRarity = determineItemRarity(rarity, random);
    const itemPool = MAGIC_ITEMS[itemRarity];
    const template = random.choice(itemPool);
    
    items.push({
      name: template.name,
      type: template.type,
      rarity: itemRarity,
      value: template.value
    });
  }

  // Add gems
  const gemCount = random.nextInt(0, tier * 2);
  for (let i = 0; i < gemCount; i++) {
    const gem = random.choice(GEMS);
    items.push({
      name: gem.name,
      type: 'gem',
      rarity: 'common',
      value: gem.value
    });
  }

  // Add scrolls
  if (random.next() > 0.5) {
    const scrollLevel = Math.min(tier * 2, 9);
    items.push({
      name: `Spell Scroll (Level ${scrollLevel})`,
      type: 'scroll',
      rarity: scrollLevel <= 3 ? 'common' : scrollLevel <= 5 ? 'uncommon' : 'rare',
      value: scrollLevel * 50
    });
  }

  return {
    gold,
    items,
    rarity
  };
}

function determineItemRarity(
  baseRarity: string,
  random: SeededRandom
): 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary' {
  const rarities = ['common', 'uncommon', 'rare', 'very rare', 'legendary'] as const;
  const baseIndex = rarities.indexOf(baseRarity as any);
  
  const roll = random.next();
  
  if (roll < 0.1 && baseIndex > 0) {
    return rarities[baseIndex - 1]; // Lower rarity
  } else if (roll > 0.9 && baseIndex < rarities.length - 1) {
    return rarities[baseIndex + 1]; // Higher rarity
  }
  
  return rarities[baseIndex];
}
