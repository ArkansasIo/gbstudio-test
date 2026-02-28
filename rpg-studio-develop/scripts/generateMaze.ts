#!/usr/bin/env ts-node
/**
 * Maze Generation CLI Tool
 * Generate dungeons, towers, trials, and raids from command line
 */

import * as fs from 'fs';
import * as path from 'path';
import { MazeGenerator } from '../src/lib/maze/generator';
import { generateTrial, TRIALS } from '../src/lib/maze/trials';
import { generateRaid, RAIDS } from '../src/lib/maze/raids';
import { mazeToAscii, getFloorStats } from '../src/lib/maze/integration';
import { createDungeonRun, completeRun } from '../src/lib/maze/dungeonRun';
import type { MazeConfig } from '../src/lib/maze/types';

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0] || 'help';

function printHelp(): void {
  console.log(`
Maze Generation CLI Tool
========================

Usage: npm run generate:maze <command> [options]

Commands:
  dungeon [options]  Generate a dungeon (descending floors)
  tower [options]    Generate a tower (ascending floors)
  trial <name>       Generate a trial by name
  raid <name>        Generate a raid by name
  list               List available trials and raids
  help               Show this help message

Dungeon/Tower Options:
  --seed <number>       Seed for random generation (default: random)
  --floors <number>     Number of floors (default: 10)
  --width <number>      Width of each floor (default: 20)
  --height <number>     Height of each floor (default: 20)
  --difficulty <1-10>   Difficulty level (default: 5)
  --algorithm <name>    Algorithm: recursive_backtrack, prims, kruskal, wilson (default: recursive_backtrack)
  --output <path>       Output directory (default: ./output/mazes)
  --ascii               Generate ASCII art visualization

Examples:
  npm run generate:maze dungeon --floors 20 --difficulty 7 --ascii
  npm run generate:maze tower --seed 12345 --floors 50
  npm run generate:maze trial trial_of_speed
  npm run generate:maze raid crypt_of_the_forgotten
  npm run generate:maze list
  `);
}

function parseOptions(): {
  seed: number;
  floors: number;
  width: number;
  height: number;
  difficulty: number;
  algorithm: MazeConfig['algorithm'];
  output: string;
  ascii: boolean;
} {
  return {
    seed: parseInt(getArg('--seed') || String(Date.now())),
    floors: parseInt(getArg('--floors') || '10'),
    width: parseInt(getArg('--width') || '20'),
    height: parseInt(getArg('--height') || '20'),
    difficulty: parseInt(getArg('--difficulty') || '5'),
    algorithm: (getArg('--algorithm') || 'recursive_backtrack') as MazeConfig['algorithm'],
    output: getArg('--output') || './output/mazes',
    ascii: args.includes('--ascii')
  };
}

function getArg(flag: string): string | undefined {
  const index = args.indexOf(flag);
  return index !== -1 && index + 1 < args.length ? args[index + 1] : undefined;
}

function ensureOutputDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function generateDungeon(): void {
  const options = parseOptions();
  
  console.log('Generating dungeon...');
  console.log(`Seed: ${options.seed}`);
  console.log(`Floors: ${options.floors} (descending)`);
  console.log(`Size: ${options.width}x${options.height}`);
  console.log(`Difficulty: ${options.difficulty}`);
  console.log(`Algorithm: ${options.algorithm}`);

  const config: MazeConfig = {
    seed: options.seed,
    type: 'dungeon',
    startFloor: 1,
    endFloor: options.floors,
    width: options.width,
    height: options.height,
    difficulty: options.difficulty,
    algorithm: options.algorithm
  };

  const generator = new MazeGenerator(config);
  const maze = generator.generate();

  ensureOutputDir(options.output);
  
  // Save JSON
  const jsonPath = path.join(options.output, `dungeon_${options.seed}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(maze, null, 2));
  console.log(`\nSaved JSON: ${jsonPath}`);

  // Generate ASCII art if requested
  if (options.ascii) {
    const asciiDir = path.join(options.output, `dungeon_${options.seed}_ascii`);
    ensureOutputDir(asciiDir);

    for (const floor of maze.floors) {
      const ascii = mazeToAscii(floor);
      const asciiPath = path.join(asciiDir, `floor_${floor.level}.txt`);
      
      const stats = getFloorStats(floor);
      const header = `
Floor ${floor.level} (Depth: ${floor.depth})
Theme: ${floor.theme}
Difficulty: ${floor.difficulty.toFixed(1)}
Size: ${floor.width}x${floor.height}
Stats: ${stats.roomCells} rooms, ${stats.deadEnds} dead ends, ${stats.gates} gates

Legend: S=Start, E=End, B=Boss, T=Treasure, G=Gate, C=Checkpoint

`;
      
      fs.writeFileSync(asciiPath, header + ascii);
    }
    
    console.log(`Saved ASCII art: ${asciiDir}`);
  }

  // Print summary
  console.log('\nDungeon Summary:');
  console.log(`Total Floors: ${maze.floors.length}`);
  console.log(`Total Rooms: ${maze.totalRooms}`);
  console.log(`Total Gates: ${maze.totalGates}`);
  console.log(`Estimated Time: ${maze.estimatedTime} minutes`);
}

function generateTower(): void {
  const options = parseOptions();
  
  console.log('Generating tower...');
  console.log(`Seed: ${options.seed}`);
  console.log(`Floors: ${options.floors} (ascending)`);
  console.log(`Size: ${options.width}x${options.height}`);

  const config: MazeConfig = {
    seed: options.seed,
    type: 'tower',
    startFloor: 1,
    endFloor: options.floors,
    width: options.width,
    height: options.height,
    difficulty: options.difficulty,
    algorithm: options.algorithm
  };

  const generator = new MazeGenerator(config);
  const maze = generator.generate();

  ensureOutputDir(options.output);
  
  const jsonPath = path.join(options.output, `tower_${options.seed}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(maze, null, 2));
  console.log(`\nSaved JSON: ${jsonPath}`);

  if (options.ascii) {
    const asciiDir = path.join(options.output, `tower_${options.seed}_ascii`);
    ensureOutputDir(asciiDir);

    for (const floor of maze.floors) {
      const ascii = mazeToAscii(floor);
      const stats = getFloorStats(floor);
      const header = `Floor ${floor.level} - ${floor.theme}\nDifficulty: ${floor.difficulty}\n\n`;
      fs.writeFileSync(path.join(asciiDir, `floor_${floor.level}.txt`), header + ascii);
    }
    
    console.log(`Saved ASCII art: ${asciiDir}`);
  }

  console.log('\nTower Summary:');
  console.log(`Total Floors: ${maze.floors.length}`);
  console.log(`Total Rooms: ${maze.totalRooms}`);
  console.log(`Estimated Time: ${maze.estimatedTime} minutes`);
}

function generateTrialMaze(): void {
  const trialName = args[1];
  if (!trialName || !TRIALS[trialName]) {
    console.error(`Error: Trial "${trialName}" not found`);
    console.log('\nAvailable trials:');
    Object.keys(TRIALS).forEach(key => {
      console.log(`  - ${key}`);
    });
    return;
  }

  const options = parseOptions();
  const trial = TRIALS[trialName];
  
  console.log(`Generating trial: ${trial.name}`);
  console.log(`Description: ${trial.description}`);
  console.log(`Floors: ${trial.floors}`);
  console.log(`Difficulty: ${trial.difficulty}`);

  const maze = generateTrial(trial, options.seed);

  ensureOutputDir(options.output);
  
  const jsonPath = path.join(options.output, `trial_${trialName}_${options.seed}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify({ trial, maze }, null, 2));
  console.log(`\nSaved JSON: ${jsonPath}`);

  console.log('\nTrial Details:');
  console.log(`Time Limit: ${trial.timeLimit ? `${trial.timeLimit}s` : 'None'}`);
  console.log(`No Checkpoints: ${trial.noCheckpoints}`);
  console.log(`No Healing: ${trial.noHealing}`);
  console.log(`Permadeath: ${trial.permadeath}`);
  console.log(`Rewards: ${trial.rewards.length}`);
}

function generateRaidMaze(): void {
  const raidName = args[1];
  if (!raidName || !RAIDS[raidName]) {
    console.error(`Error: Raid "${raidName}" not found`);
    console.log('\nAvailable raids:');
    Object.keys(RAIDS).forEach(key => {
      console.log(`  - ${key}`);
    });
    return;
  }

  const options = parseOptions();
  const raid = RAIDS[raidName];
  
  console.log(`Generating raid: ${raid.name}`);
  console.log(`Description: ${raid.description}`);
  console.log(`Floors: ${raid.floors}`);
  console.log(`Players: ${raid.minPlayers}-${raid.maxPlayers}`);

  const maze = generateRaid(raid, options.seed);

  ensureOutputDir(options.output);
  
  const jsonPath = path.join(options.output, `raid_${raidName}_${options.seed}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify({ raid, maze }, null, 2));
  console.log(`\nSaved JSON: ${jsonPath}`);

  console.log('\nRaid Phases:');
  raid.phases.forEach(phase => {
    console.log(`  Floor ${phase.floor}: ${phase.name} - ${phase.bossId}`);
  });
}

function listContent(): void {
  console.log('\nAvailable Trials:');
  console.log('=================');
  Object.entries(TRIALS).forEach(([key, trial]) => {
    console.log(`\n${key}`);
    console.log(`  Name: ${trial.name}`);
    console.log(`  Description: ${trial.description}`);
    console.log(`  Floors: ${trial.floors}`);
    console.log(`  Difficulty: ${trial.difficulty}/10`);
  });

  console.log('\n\nAvailable Raids:');
  console.log('================');
  Object.entries(RAIDS).forEach(([key, raid]) => {
    console.log(`\n${key}`);
    console.log(`  Name: ${raid.name}`);
    console.log(`  Description: ${raid.description}`);
    console.log(`  Floors: ${raid.floors}`);
    console.log(`  Players: ${raid.minPlayers}-${raid.maxPlayers}`);
    console.log(`  Difficulty: ${raid.difficulty}/10`);
  });
}

// Main execution
switch (command) {
  case 'dungeon':
    generateDungeon();
    break;
  case 'tower':
    generateTower();
    break;
  case 'trial':
    generateTrialMaze();
    break;
  case 'raid':
    generateRaidMaze();
    break;
  case 'list':
    listContent();
    break;
  case 'help':
  default:
    printHelp();
    break;
}
