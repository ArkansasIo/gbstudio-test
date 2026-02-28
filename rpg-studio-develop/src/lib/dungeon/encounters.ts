/**
 * D&D 5e Encounter Generation
 * Based on Challenge Rating and XP budgets
 */

import { Encounter, Enemy, BiomeType, DifficultyTier } from './types';
import { SeededRandom } from './random';
import { getBiome } from './biomes';

// D&D 5e XP thresholds per character level (tier-based)
const XP_THRESHOLDS = {
  1: { easy: 100, medium: 200, hard: 400, deadly: 600 },
  2: { easy: 600, medium: 1200, hard: 2400, deadly: 3600 },
  3: { easy: 2400, medium: 4800, hard: 9600, deadly: 14400 },
  4: { easy: 10000, medium: 20000, hard: 40000, deadly: 60000 }
};

// CR to XP conversion (D&D 5e)
const CR_TO_XP: Record<number, number> = {
  0: 10, 0.125: 25, 0.25: 50, 0.5: 100,
  1: 200, 2: 450, 3: 700, 4: 1100, 5: 1800,
  6: 2300, 7: 2900, 8: 3900, 9: 5000, 10: 5900,
  11: 7200, 12: 8400, 13: 10000, 14: 11500, 15: 13000,
  16: 15000, 17: 18000, 18: 20000, 19: 22000, 20: 25000
};

// Enemy templates by biome
const ENEMY_TEMPLATES: Record<string, { name: string; cr: number; hp: number; ac: number }[]> = {
  aberration: [
    { name: 'Mind Flayer', cr: 7, hp: 71, ac: 15 },
    { name: 'Beholder', cr: 13, hp: 180, ac: 18 },
    { name: 'Intellect Devourer', cr: 2, hp: 21, ac: 12 },
    { name: 'Gibbering Mouther', cr: 2, hp: 67, ac: 9 }
  ],
  undead: [
    { name: 'Skeleton', cr: 0.25, hp: 13, ac: 13 },
    { name: 'Zombie', cr: 0.25, hp: 22, ac: 8 },
    { name: 'Wraith', cr: 5, hp: 67, ac: 13 },
    { name: 'Vampire Spawn', cr: 5, hp: 82, ac: 15 },
    { name: 'Lich', cr: 21, hp: 135, ac: 17 }
  ],
  beast: [
    { name: 'Giant Rat', cr: 0.125, hp: 7, ac: 12 },
    { name: 'Wolf', cr: 0.25, hp: 11, ac: 13 },
    { name: 'Brown Bear', cr: 1, hp: 34, ac: 11 },
    { name: 'Dire Wolf', cr: 1, hp: 37, ac: 14 }
  ],
  humanoid: [
    { name: 'Goblin', cr: 0.25, hp: 7, ac: 15 },
    { name: 'Orc', cr: 0.5, hp: 15, ac: 13 },
    { name: 'Hobgoblin', cr: 0.5, hp: 11, ac: 18 },
    { name: 'Bandit Captain', cr: 2, hp: 65, ac: 15 },
    { name: 'Knight', cr: 3, hp: 52, ac: 18 }
  ],
  fiend: [
    { name: 'Imp', cr: 1, hp: 10, ac: 13 },
    { name: 'Bearded Devil', cr: 3, hp: 52, ac: 13 },
    { name: 'Succubus', cr: 4, hp: 66, ac: 15 },
    { name: 'Pit Fiend', cr: 20, hp: 300, ac: 19 }
  ],
  construct: [
    { name: 'Animated Armor', cr: 1, hp: 33, ac: 18 },
    { name: 'Rug of Smothering', cr: 2, hp: 33, ac: 12 },
    { name: 'Helmed Horror', cr: 4, hp: 60, ac: 20 },
    { name: 'Stone Golem', cr: 10, hp: 178, ac: 17 }
  ],
  ooze: [
    { name: 'Gray Ooze', cr: 0.5, hp: 22, ac: 8 },
    { name: 'Gelatinous Cube', cr: 2, hp: 84, ac: 6 },
    { name: 'Black Pudding', cr: 4, hp: 85, ac: 7 }
  ],
  elemental: [
    { name: 'Fire Elemental', cr: 5, hp: 102, ac: 13 },
    { name: 'Water Elemental', cr: 5, hp: 114, ac: 14 },
    { name: 'Earth Elemental', cr: 5, hp: 126, ac: 17 },
    { name: 'Air Elemental', cr: 5, hp: 90, ac: 15 }
  ]
};

export function generateEncounter(
  tier: DifficultyTier,
  biome: BiomeType,
  isBoss: boolean,
  random: SeededRandom
): Encounter {
  const biomeData = getBiome(biome);
  const difficulty = isBoss ? 'deadly' : random.choice(['easy', 'medium', 'hard'] as const);
  const xpBudget = XP_THRESHOLDS[tier][difficulty];

  const enemies: Enemy[] = [];
  let currentXP = 0;

  // Boss encounters get a single powerful enemy
  if (isBoss) {
    const bossType = random.choice(biomeData.enemyTypes);
    const bossTemplates = ENEMY_TEMPLATES[bossType] || ENEMY_TEMPLATES.humanoid;
    const bossTemplate = bossTemplates[bossTemplates.length - 1]; // Highest CR
    
    enemies.push({
      name: bossTemplate.name,
      cr: bossTemplate.cr,
      hp: bossTemplate.hp,
      ac: bossTemplate.ac,
      type: bossType,
      count: 1
    });
    currentXP = CR_TO_XP[bossTemplate.cr] || 1000;
  } else {
    // Regular encounters with multiple enemies
    while (currentXP < xpBudget * 0.8) {
      const enemyType = random.choice(biomeData.enemyTypes);
      const templates = ENEMY_TEMPLATES[enemyType] || ENEMY_TEMPLATES.humanoid;
      const template = random.choice(templates);
      
      const enemyXP = CR_TO_XP[template.cr] || 100;
      const count = Math.max(1, Math.floor((xpBudget - currentXP) / enemyXP / 2));
      
      if (count > 0 && currentXP + enemyXP * count <= xpBudget * 1.2) {
        enemies.push({
          name: template.name,
          cr: template.cr,
          hp: template.hp,
          ac: template.ac,
          type: enemyType,
          count: Math.min(count, 8) // Max 8 of same type
        });
        currentXP += enemyXP * count;
      }
      
      if (enemies.length >= 5) break; // Max 5 different enemy types
    }
  }

  return {
    id: `encounter_${random.nextInt(1000, 9999)}`,
    challengeRating: calculateEncounterCR(enemies),
    enemies,
    difficulty,
    xpReward: currentXP
  };
}

function calculateEncounterCR(enemies: Enemy[]): number {
  const totalXP = enemies.reduce((sum, e) => sum + (CR_TO_XP[e.cr] || 0) * e.count, 0);
  
  // Find closest CR
  let closestCR = 0;
  let minDiff = Infinity;
  
  for (const [cr, xp] of Object.entries(CR_TO_XP)) {
    const diff = Math.abs(xp - totalXP);
    if (diff < minDiff) {
      minDiff = diff;
      closestCR = parseFloat(cr);
    }
  }
  
  return closestCR;
}
