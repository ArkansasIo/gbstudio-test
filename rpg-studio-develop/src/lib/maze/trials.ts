/**
 * Trial System
 * Challenge dungeons with special rules and rewards
 */

import { SeededRNG } from '../world/rng';
import type { Trial, TrialReward, MazeConfig } from './types';
import { MazeGenerator } from './generator';

/**
 * Predefined trials
 */
export const TRIALS: Record<string, Trial> = {
  trial_of_speed: {
    id: 'trial_of_speed',
    name: 'Trial of Speed',
    description: 'Complete 10 floors in under 10 minutes',
    floors: 10,
    difficulty: 5,
    timeLimit: 600, // 10 minutes
    noCheckpoints: false,
    noHealing: false,
    permadeath: false,
    rewards: [
      {
        type: 'item',
        id: 'boots_of_haste',
        name: 'Boots of Haste',
        rarity: 'rare'
      },
      {
        type: 'title',
        id: 'speedrunner',
        name: 'Speedrunner',
        rarity: 'epic'
      }
    ]
  },

  trial_of_endurance: {
    id: 'trial_of_endurance',
    name: 'Trial of Endurance',
    description: 'Survive 50 floors without healing',
    floors: 50,
    difficulty: 7,
    noCheckpoints: false,
    noHealing: true,
    permadeath: false,
    rewards: [
      {
        type: 'item',
        id: 'ring_of_vitality',
        name: 'Ring of Vitality',
        rarity: 'epic'
      },
      {
        type: 'title',
        id: 'the_enduring',
        name: 'The Enduring',
        rarity: 'legendary'
      }
    ]
  },

  trial_of_death: {
    id: 'trial_of_death',
    name: 'Trial of Death',
    description: 'Complete 25 floors with permadeath - one life only',
    floors: 25,
    difficulty: 9,
    noCheckpoints: true,
    noHealing: false,
    permadeath: true,
    rewards: [
      {
        type: 'item',
        id: 'amulet_of_resurrection',
        name: 'Amulet of Resurrection',
        rarity: 'legendary'
      },
      {
        type: 'title',
        id: 'deathless',
        name: 'Deathless',
        rarity: 'legendary'
      },
      {
        type: 'currency',
        id: 'trial_tokens',
        name: '1000 Trial Tokens',
        rarity: 'epic'
      }
    ]
  },

  trial_of_mastery: {
    id: 'trial_of_mastery',
    name: 'Trial of Mastery',
    description: 'Complete 100 floors with all restrictions',
    floors: 100,
    difficulty: 10,
    timeLimit: 3600, // 1 hour
    noCheckpoints: true,
    noHealing: true,
    permadeath: true,
    rewards: [
      {
        type: 'item',
        id: 'crown_of_the_master',
        name: 'Crown of the Master',
        rarity: 'legendary'
      },
      {
        type: 'title',
        id: 'dungeon_master',
        name: 'Dungeon Master',
        rarity: 'legendary'
      },
      {
        type: 'unlock',
        id: 'master_mode',
        name: 'Master Mode Unlock',
        rarity: 'legendary'
      }
    ]
  },

  trial_of_the_abyss: {
    id: 'trial_of_the_abyss',
    name: 'Trial of the Abyss',
    description: 'Descend to floor 100 and return',
    floors: 100,
    difficulty: 10,
    noCheckpoints: false,
    noHealing: false,
    permadeath: false,
    rewards: [
      {
        type: 'item',
        id: 'abyssal_blade',
        name: 'Abyssal Blade',
        rarity: 'legendary'
      },
      {
        type: 'title',
        id: 'abyss_walker',
        name: 'Abyss Walker',
        rarity: 'legendary'
      }
    ]
  }
};

/**
 * Generate trial maze
 */
export function generateTrial(trial: Trial, seed: number): ReturnType<MazeGenerator['generate']> {
  const config: MazeConfig = {
    seed,
    type: 'trial',
    startFloor: 1,
    endFloor: trial.floors,
    width: 20 + Math.floor(trial.difficulty * 2),
    height: 20 + Math.floor(trial.difficulty * 2),
    difficulty: trial.difficulty,
    algorithm: 'recursive_backtrack'
  };

  const generator = new MazeGenerator(config);
  return generator.generate();
}

/**
 * Calculate trial score
 */
export function calculateTrialScore(
  trial: Trial,
  timeElapsed: number,
  deaths: number,
  floorsCleared: number,
  secretsFound: number
): { score: number; rank: 'F' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' } {
  let score = 0;

  // Base score for completion
  score += floorsCleared * 100;

  // Time bonus
  if (trial.timeLimit) {
    const timeRatio = timeElapsed / trial.timeLimit;
    if (timeRatio < 0.5) score += 5000;
    else if (timeRatio < 0.75) score += 3000;
    else if (timeRatio < 1.0) score += 1000;
  }

  // Death penalty
  score -= deaths * 500;

  // Secrets bonus
  score += secretsFound * 200;

  // Perfect run bonus
  if (deaths === 0 && floorsCleared === trial.floors) {
    score += 10000;
  }

  // Determine rank
  let rank: 'F' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';
  if (score >= 50000) rank = 'SS';
  else if (score >= 40000) rank = 'S';
  else if (score >= 30000) rank = 'A';
  else if (score >= 20000) rank = 'B';
  else if (score >= 10000) rank = 'C';
  else if (score >= 5000) rank = 'D';
  else rank = 'F';

  return { score, rank };
}

/**
 * Get trial rewards based on rank
 */
export function getTrialRewards(trial: Trial, rank: string): TrialReward[] {
  const rewards = [...trial.rewards];

  // Bonus rewards for high ranks
  if (rank === 'SS') {
    rewards.push({
      type: 'currency',
      id: 'bonus_tokens',
      name: '500 Bonus Tokens',
      rarity: 'legendary'
    });
  } else if (rank === 'S') {
    rewards.push({
      type: 'currency',
      id: 'bonus_tokens',
      name: '250 Bonus Tokens',
      rarity: 'epic'
    });
  }

  return rewards;
}

/**
 * Check if trial is unlocked
 */
export function isTrialUnlocked(trialId: string, completedTrials: string[]): boolean {
  const unlockRequirements: Record<string, string[]> = {
    trial_of_speed: [],
    trial_of_endurance: ['trial_of_speed'],
    trial_of_death: ['trial_of_speed', 'trial_of_endurance'],
    trial_of_mastery: ['trial_of_speed', 'trial_of_endurance', 'trial_of_death'],
    trial_of_the_abyss: ['trial_of_mastery']
  };

  const required = unlockRequirements[trialId] || [];
  return required.every(req => completedTrials.includes(req));
}
