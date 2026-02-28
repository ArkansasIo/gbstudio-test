/**
 * Dungeon Run Manager
 * Manages active dungeon/tower runs with state tracking
 */

import type { DungeonRun, Maze, Floor } from './types';

/**
 * Create new dungeon run
 */
export function createDungeonRun(mazeId: string, startFloor: number): DungeonRun {
  return {
    id: `run_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    mazeId,
    startTime: Date.now(),
    currentFloor: startFloor,
    floorsCleared: [],
    deaths: 0,
    checkpointsUsed: 0,
    monstersKilled: 0,
    treasureFound: 0,
    secretsFound: 0,
    timeElapsed: 0,
    completed: false,
    score: 0,
    rank: 'F'
  };
}

/**
 * Update run time
 */
export function updateRunTime(run: DungeonRun): DungeonRun {
  return {
    ...run,
    timeElapsed: Math.floor((Date.now() - run.startTime) / 1000)
  };
}

/**
 * Clear floor
 */
export function clearFloor(run: DungeonRun, floorNumber: number): DungeonRun {
  const updated = updateRunTime(run);
  
  if (!updated.floorsCleared.includes(floorNumber)) {
    updated.floorsCleared.push(floorNumber);
    updated.floorsCleared.sort((a, b) => a - b);
  }
  
  return updated;
}

/**
 * Move to floor
 */
export function moveToFloor(run: DungeonRun, floorNumber: number): DungeonRun {
  return {
    ...updateRunTime(run),
    currentFloor: floorNumber
  };
}

/**
 * Record death
 */
export function recordDeath(run: DungeonRun): DungeonRun {
  return {
    ...updateRunTime(run),
    deaths: run.deaths + 1
  };
}

/**
 * Use checkpoint
 */
export function useCheckpoint(run: DungeonRun, floorNumber: number): DungeonRun {
  return {
    ...updateRunTime(run),
    checkpointsUsed: run.checkpointsUsed + 1,
    currentFloor: floorNumber
  };
}

/**
 * Record monster kill
 */
export function recordKill(run: DungeonRun, count: number = 1): DungeonRun {
  return {
    ...updateRunTime(run),
    monstersKilled: run.monstersKilled + count
  };
}

/**
 * Record treasure found
 */
export function recordTreasure(run: DungeonRun, count: number = 1): DungeonRun {
  return {
    ...updateRunTime(run),
    treasureFound: run.treasureFound + count
  };
}

/**
 * Record secret found
 */
export function recordSecret(run: DungeonRun): DungeonRun {
  return {
    ...updateRunTime(run),
    secretsFound: run.secretsFound + 1
  };
}

/**
 * Complete dungeon run
 */
export function completeRun(run: DungeonRun, maze: Maze): DungeonRun {
  const updated = updateRunTime(run);
  updated.completed = true;
  updated.endTime = Date.now();
  
  // Calculate final score
  const { score, rank } = calculateScore(updated, maze);
  updated.score = score;
  updated.rank = rank;
  
  return updated;
}

/**
 * Fail dungeon run
 */
export function failRun(run: DungeonRun): DungeonRun {
  const updated = updateRunTime(run);
  updated.completed = false;
  updated.endTime = Date.now();
  updated.rank = 'F';
  
  return updated;
}

/**
 * Calculate run score and rank
 */
export function calculateScore(
  run: DungeonRun,
  maze: Maze
): { score: number; rank: 'F' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' } {
  let score = 0;

  // Base score for floors cleared
  score += run.floorsCleared.length * 1000;

  // Completion bonus
  if (run.completed) {
    score += 10000;
  }

  // Time bonus (faster is better)
  const expectedTime = maze.estimatedTime * 60; // Convert to seconds
  if (run.timeElapsed < expectedTime) {
    const timeBonus = Math.floor((expectedTime - run.timeElapsed) / 60) * 100;
    score += timeBonus;
  }

  // Combat bonus
  score += run.monstersKilled * 50;

  // Treasure bonus
  score += run.treasureFound * 200;

  // Secret bonus
  score += run.secretsFound * 500;

  // Death penalty
  score -= run.deaths * 1000;

  // Checkpoint penalty
  score -= run.checkpointsUsed * 500;

  // Perfect run bonus (no deaths, no checkpoints)
  if (run.completed && run.deaths === 0 && run.checkpointsUsed === 0) {
    score += 20000;
  }

  // Ensure non-negative score
  score = Math.max(0, score);

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
 * Get run statistics
 */
export function getRunStats(run: DungeonRun): {
  duration: string;
  floorsPerMinute: number;
  killsPerFloor: number;
  treasurePerFloor: number;
  deathRate: number;
} {
  const minutes = Math.floor(run.timeElapsed / 60);
  const seconds = run.timeElapsed % 60;
  const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const floorsCleared = run.floorsCleared.length;
  const timeInMinutes = run.timeElapsed / 60;

  return {
    duration,
    floorsPerMinute: timeInMinutes > 0 ? floorsCleared / timeInMinutes : 0,
    killsPerFloor: floorsCleared > 0 ? run.monstersKilled / floorsCleared : 0,
    treasurePerFloor: floorsCleared > 0 ? run.treasureFound / floorsCleared : 0,
    deathRate: floorsCleared > 0 ? run.deaths / floorsCleared : 0
  };
}

/**
 * Check if run is still valid
 */
export function isRunValid(run: DungeonRun, maxDeaths?: number, timeLimit?: number): boolean {
  // Check death limit
  if (maxDeaths !== undefined && run.deaths >= maxDeaths) {
    return false;
  }

  // Check time limit
  if (timeLimit !== undefined && run.timeElapsed >= timeLimit) {
    return false;
  }

  return true;
}

/**
 * Get run summary
 */
export function getRunSummary(run: DungeonRun): string {
  const stats = getRunStats(run);
  
  return `
Dungeon Run Summary
==================
Status: ${run.completed ? 'COMPLETED' : 'FAILED'}
Rank: ${run.rank}
Score: ${run.score.toLocaleString()}

Progress
--------
Floors Cleared: ${run.floorsCleared.length}
Current Floor: ${run.currentFloor}
Deaths: ${run.deaths}
Checkpoints Used: ${run.checkpointsUsed}

Combat
------
Monsters Killed: ${run.monstersKilled}
Kills per Floor: ${stats.killsPerFloor.toFixed(2)}

Exploration
-----------
Treasure Found: ${run.treasureFound}
Secrets Found: ${run.secretsFound}
Treasure per Floor: ${stats.treasurePerFloor.toFixed(2)}

Time
----
Duration: ${stats.duration}
Floors per Minute: ${stats.floorsPerMinute.toFixed(2)}
  `.trim();
}

/**
 * Save run to JSON
 */
export function saveRun(run: DungeonRun): string {
  return JSON.stringify(run, null, 2);
}

/**
 * Load run from JSON
 */
export function loadRun(data: string): DungeonRun {
  return JSON.parse(data);
}

/**
 * Compare two runs
 */
export function compareRuns(run1: DungeonRun, run2: DungeonRun): {
  betterRun: DungeonRun;
  comparison: Record<string, { run1: number; run2: number; winner: 1 | 2 | 0 }>;
} {
  const comparison = {
    score: {
      run1: run1.score,
      run2: run2.score,
      winner: run1.score > run2.score ? 1 : run1.score < run2.score ? 2 : 0
    },
    floors: {
      run1: run1.floorsCleared.length,
      run2: run2.floorsCleared.length,
      winner: run1.floorsCleared.length > run2.floorsCleared.length ? 1 : 
              run1.floorsCleared.length < run2.floorsCleared.length ? 2 : 0
    },
    time: {
      run1: run1.timeElapsed,
      run2: run2.timeElapsed,
      winner: run1.timeElapsed < run2.timeElapsed ? 1 : 
              run1.timeElapsed > run2.timeElapsed ? 2 : 0
    },
    deaths: {
      run1: run1.deaths,
      run2: run2.deaths,
      winner: run1.deaths < run2.deaths ? 1 : 
              run1.deaths > run2.deaths ? 2 : 0
    }
  } as Record<string, { run1: number; run2: number; winner: 1 | 2 | 0 }>;

  const betterRun = run1.score >= run2.score ? run1 : run2;

  return { betterRun, comparison };
}
