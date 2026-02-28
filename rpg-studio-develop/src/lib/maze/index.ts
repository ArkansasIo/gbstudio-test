/**
 * Maze Generation System
 * Complete exports for multi-floor dungeons, towers, trials, and raids
 */

// Core types
export type {
  MazeType,
  Direction,
  GateType,
  MazeConfig,
  MazeCell,
  RoomType,
  Gate,
  Trap,
  Floor,
  Portal,
  Maze,
  DungeonRun,
  Trial,
  TrialReward,
  Raid,
  RaidPhase
} from './types';

// Maze generation
export { MazeGenerator } from './generator';
export { initializeMaze, recursiveBacktrack, prims, kruskal, wilson } from './algorithms';

// Trial system
export {
  TRIALS,
  generateTrial,
  calculateTrialScore,
  getTrialRewards,
  isTrialUnlocked
} from './trials';

// Raid system
export {
  RAIDS,
  generateRaid,
  getRaidPhase,
  isRaidUnlocked,
  calculateRaidScaling,
  generateRaidLoot
} from './raids';

// Progression tracking
export type { PlayerProgression } from './progression';
export {
  createPlayerProgression,
  updateDungeonProgress,
  updateTowerProgress,
  updateTrialProgress,
  updateRaidProgress,
  getPlayerStats,
  getLeaderboardEntry,
  saveProgression,
  loadProgression
} from './progression';

// Dungeon run management
export {
  createDungeonRun,
  updateRunTime,
  clearFloor,
  moveToFloor,
  recordDeath,
  useCheckpoint,
  recordKill,
  recordTreasure,
  recordSecret,
  completeRun,
  failRun,
  calculateScore,
  getRunStats,
  isRunValid,
  getRunSummary,
  saveRun,
  loadRun,
  compareRuns
} from './dungeonRun';

// Integration utilities
export {
  mazeFloorToDungeon,
  generateDungeonForFloor,
  getCellAt,
  getAdjacentCells,
  areCellsConnected,
  findPath,
  getFloorStats,
  mazeToAscii
} from './integration';

/**
 * Quick start example
 */
export function quickStartMaze(seed: number = Date.now()): {
  dungeon: Maze;
  tower: Maze;
  trial: Maze;
  raid: Maze;
} {
  const { MazeGenerator } = require('./generator');
  const { generateTrial, TRIALS } = require('./trials');
  const { generateRaid, RAIDS } = require('./raids');

  // Generate dungeon (descending 1-100)
  const dungeonGen = new MazeGenerator({
    seed,
    type: 'dungeon',
    startFloor: 1,
    endFloor: 100,
    width: 25,
    height: 25,
    difficulty: 5,
    algorithm: 'recursive_backtrack'
  });
  const dungeon = dungeonGen.generate();

  // Generate tower (ascending 1-100)
  const towerGen = new MazeGenerator({
    seed: seed + 1,
    type: 'tower',
    startFloor: 1,
    endFloor: 100,
    width: 25,
    height: 25,
    difficulty: 5,
    algorithm: 'prims'
  });
  const tower = towerGen.generate();

  // Generate trial
  const trial = generateTrial(TRIALS.trial_of_speed, seed + 2);

  // Generate raid
  const raid = generateRaid(RAIDS.crypt_of_the_forgotten, seed + 3);

  return { dungeon, tower, trial, raid };
}
