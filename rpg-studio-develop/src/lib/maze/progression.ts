/**
 * Progression Tracking System
 * Track player progress through mazes, trials, and raids
 */

import type { DungeonRun, Maze, Trial, Raid } from './types';

export interface PlayerProgression {
  playerId: string;
  
  // Dungeon progress
  dungeonsCompleted: string[];
  highestDungeonFloor: number;
  totalDungeonRuns: number;
  
  // Tower progress
  towersCompleted: string[];
  highestTowerFloor: number;
  totalTowerRuns: number;
  
  // Trial progress
  trialsCompleted: string[];
  trialScores: Record<string, number>;
  trialRanks: Record<string, string>;
  
  // Raid progress
  raidsCompleted: string[];
  raidKills: Record<string, number>;
  
  // Overall stats
  totalFloorsClear: number;
  totalDeaths: number;
  totalPlayTime: number; // seconds
  totalTreasureFound: number;
  totalSecretsFound: number;
  
  // Achievements
  achievements: string[];
  titles: string[];
}

/**
 * Create new player progression
 */
export function createPlayerProgression(playerId: string): PlayerProgression {
  return {
    playerId,
    dungeonsCompleted: [],
    highestDungeonFloor: 0,
    totalDungeonRuns: 0,
    towersCompleted: [],
    highestTowerFloor: 0,
    totalTowerRuns: 0,
    trialsCompleted: [],
    trialScores: {},
    trialRanks: {},
    raidsCompleted: [],
    raidKills: {},
    totalFloorsClear: 0,
    totalDeaths: 0,
    totalPlayTime: 0,
    totalTreasureFound: 0,
    totalSecretsFound: 0,
    achievements: [],
    titles: []
  };
}

/**
 * Update progression after dungeon run
 */
export function updateDungeonProgress(
  progression: PlayerProgression,
  run: DungeonRun
): PlayerProgression {
  const updated = { ...progression };

  // Update dungeon stats
  updated.totalDungeonRuns++;
  updated.totalFloorsClear += run.floorsCleared.length;
  updated.totalDeaths += run.deaths;
  updated.totalPlayTime += run.timeElapsed;
  updated.totalTreasureFound += run.treasureFound;
  updated.totalSecretsFound += run.secretsFound;

  // Update highest floor
  const maxFloor = Math.max(...run.floorsCleared, 0);
  if (maxFloor > updated.highestDungeonFloor) {
    updated.highestDungeonFloor = maxFloor;
  }

  // Check completion
  if (run.completed && !updated.dungeonsCompleted.includes(run.mazeId)) {
    updated.dungeonsCompleted.push(run.mazeId);
  }

  // Check achievements
  checkAchievements(updated, run);

  return updated;
}

/**
 * Update progression after tower run
 */
export function updateTowerProgress(
  progression: PlayerProgression,
  run: DungeonRun
): PlayerProgression {
  const updated = { ...progression };

  updated.totalTowerRuns++;
  updated.totalFloorsClear += run.floorsCleared.length;
  updated.totalDeaths += run.deaths;
  updated.totalPlayTime += run.timeElapsed;

  const maxFloor = Math.max(...run.floorsCleared, 0);
  if (maxFloor > updated.highestTowerFloor) {
    updated.highestTowerFloor = maxFloor;
  }

  if (run.completed && !updated.towersCompleted.includes(run.mazeId)) {
    updated.towersCompleted.push(run.mazeId);
  }

  checkAchievements(updated, run);

  return updated;
}

/**
 * Update progression after trial
 */
export function updateTrialProgress(
  progression: PlayerProgression,
  trial: Trial,
  score: number,
  rank: string
): PlayerProgression {
  const updated = { ...progression };

  // Update trial completion
  if (!updated.trialsCompleted.includes(trial.id)) {
    updated.trialsCompleted.push(trial.id);
  }

  // Update best score
  const currentBest = updated.trialScores[trial.id] || 0;
  if (score > currentBest) {
    updated.trialScores[trial.id] = score;
    updated.trialRanks[trial.id] = rank;
  }

  // Award trial rewards
  if (rank === 'SS' || rank === 'S') {
    for (const reward of trial.rewards) {
      if (reward.type === 'title' && !updated.titles.includes(reward.id)) {
        updated.titles.push(reward.id);
      }
    }
  }

  return updated;
}

/**
 * Update progression after raid
 */
export function updateRaidProgress(
  progression: PlayerProgression,
  raid: Raid,
  completed: boolean
): PlayerProgression {
  const updated = { ...progression };

  // Update raid kills
  updated.raidKills[raid.id] = (updated.raidKills[raid.id] || 0) + 1;

  // Update completion
  if (completed && !updated.raidsCompleted.includes(raid.id)) {
    updated.raidsCompleted.push(raid.id);
  }

  return updated;
}

/**
 * Check and award achievements
 */
function checkAchievements(progression: PlayerProgression, run: DungeonRun): void {
  const achievements: Array<{ id: string; condition: boolean }> = [
    {
      id: 'first_steps',
      condition: progression.totalFloorsClear >= 1
    },
    {
      id: 'dungeon_delver',
      condition: progression.totalFloorsClear >= 100
    },
    {
      id: 'master_explorer',
      condition: progression.totalFloorsClear >= 1000
    },
    {
      id: 'deathless',
      condition: run.completed && run.deaths === 0
    },
    {
      id: 'speedrunner',
      condition: run.completed && run.timeElapsed < 600 // 10 minutes
    },
    {
      id: 'treasure_hunter',
      condition: progression.totalTreasureFound >= 100
    },
    {
      id: 'secret_seeker',
      condition: progression.totalSecretsFound >= 50
    },
    {
      id: 'deep_diver',
      condition: progression.highestDungeonFloor >= 50
    },
    {
      id: 'sky_climber',
      condition: progression.highestTowerFloor >= 50
    },
    {
      id: 'the_abyss',
      condition: progression.highestDungeonFloor >= 100
    },
    {
      id: 'the_pinnacle',
      condition: progression.highestTowerFloor >= 100
    }
  ];

  for (const achievement of achievements) {
    if (achievement.condition && !progression.achievements.includes(achievement.id)) {
      progression.achievements.push(achievement.id);
    }
  }
}

/**
 * Get player statistics
 */
export function getPlayerStats(progression: PlayerProgression): {
  totalRuns: number;
  completionRate: number;
  averageFloors: number;
  deathRate: number;
  averageTime: number;
} {
  const totalRuns = progression.totalDungeonRuns + progression.totalTowerRuns;
  const totalCompleted = progression.dungeonsCompleted.length + progression.towersCompleted.length;

  return {
    totalRuns,
    completionRate: totalRuns > 0 ? totalCompleted / totalRuns : 0,
    averageFloors: totalRuns > 0 ? progression.totalFloorsClear / totalRuns : 0,
    deathRate: totalRuns > 0 ? progression.totalDeaths / totalRuns : 0,
    averageTime: totalRuns > 0 ? progression.totalPlayTime / totalRuns : 0
  };
}

/**
 * Get leaderboard entry
 */
export function getLeaderboardEntry(progression: PlayerProgression): {
  playerId: string;
  score: number;
  rank: number;
  stats: ReturnType<typeof getPlayerStats>;
} {
  const stats = getPlayerStats(progression);
  
  // Calculate overall score
  let score = 0;
  score += progression.totalFloorsClear * 10;
  score += progression.dungeonsCompleted.length * 1000;
  score += progression.towersCompleted.length * 1000;
  score += progression.trialsCompleted.length * 5000;
  score += progression.raidsCompleted.length * 10000;
  score += progression.achievements.length * 500;
  score -= progression.totalDeaths * 50;

  return {
    playerId: progression.playerId,
    score,
    rank: 0, // Set by leaderboard system
    stats
  };
}

/**
 * Save progression to storage
 */
export function saveProgression(progression: PlayerProgression): string {
  return JSON.stringify(progression, null, 2);
}

/**
 * Load progression from storage
 */
export function loadProgression(data: string): PlayerProgression {
  const parsed = JSON.parse(data);
  
  // Convert arrays back to Sets where needed
  return {
    ...parsed,
    dungeonsCompleted: parsed.dungeonsCompleted || [],
    towersCompleted: parsed.towersCompleted || [],
    trialsCompleted: parsed.trialsCompleted || [],
    raidsCompleted: parsed.raidsCompleted || [],
    achievements: parsed.achievements || [],
    titles: parsed.titles || []
  };
}
