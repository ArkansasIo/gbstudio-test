# Maze System Quick Start

Get started with the maze generation system in 5 minutes.

## Installation

Already included in RPG Workbench - no installation needed!

## Basic Usage

### 1. Generate a Simple Dungeon

```typescript
import { MazeGenerator } from '@/lib/maze';

const generator = new MazeGenerator({
  seed: 12345,
  type: 'dungeon',
  startFloor: 1,
  endFloor: 10,
  width: 20,
  height: 20,
  difficulty: 5,
  algorithm: 'recursive_backtrack'
});

const maze = generator.generate();
console.log(`Generated ${maze.floors.length} floors`);
```

### 2. Generate a Tower

```typescript
import { MazeGenerator } from '@/lib/maze';

const generator = new MazeGenerator({
  seed: 12345,
  type: 'tower',
  startFloor: 1,
  endFloor: 10,
  width: 20,
  height: 20,
  difficulty: 5,
  algorithm: 'prims'
});

const tower = generator.generate();
```

### 3. Run a Trial

```typescript
import { generateTrial, TRIALS } from '@/lib/maze';

const trial = TRIALS.trial_of_speed;
const maze = generateTrial(trial, 12345);

console.log(`${trial.name}: ${trial.floors} floors`);
```

### 4. Generate a Raid

```typescript
import { generateRaid, RAIDS } from '@/lib/maze';

const raid = RAIDS.crypt_of_the_forgotten;
const maze = generateRaid(raid, 12345);

console.log(`${raid.name}: ${raid.floors} floors, ${raid.minPlayers}-${raid.maxPlayers} players`);
```

## CLI Quick Start

```bash
# Generate 20-floor dungeon with ASCII art
npm run generate:maze dungeon --floors 20 --ascii

# Generate 50-floor tower
npm run generate:maze tower --floors 50 --seed 12345

# Generate a trial
npm run generate:maze trial trial_of_speed

# List all trials and raids
npm run generate:maze list
```

## Track a Dungeon Run

```typescript
import { 
  createDungeonRun, 
  clearFloor, 
  recordKill, 
  completeRun 
} from '@/lib/maze';

// Start run
let run = createDungeonRun(maze.id, 1);

// Clear floors
run = clearFloor(run, 1);
run = clearFloor(run, 2);

// Record actions
run = recordKill(run, 5);
run = recordTreasure(run, 2);

// Complete
const finalRun = completeRun(run, maze);
console.log(`Score: ${finalRun.score}, Rank: ${finalRun.rank}`);
```

## Visualize a Floor

```typescript
import { mazeToAscii } from '@/lib/maze';

const floor = maze.floors[0];
const ascii = mazeToAscii(floor);
console.log(ascii);
```

Output:
```
+---+---+---+---+
|   |       | T |
+   +   +   +   +
| S     |       |
+---+   +---+   +
|       | B     |
+---+---+---+---+
```

Legend: S=Start, E=End, B=Boss, T=Treasure, G=Gate, C=Checkpoint

## Available Algorithms

- `recursive_backtrack` - Long winding corridors
- `prims` - Open layouts with branches
- `kruskal` - Balanced mazes
- `wilson` - Unbiased uniform mazes

## Available Trials

1. **trial_of_speed** - 10 floors, 10 min limit
2. **trial_of_endurance** - 50 floors, no healing
3. **trial_of_death** - 25 floors, permadeath
4. **trial_of_mastery** - 100 floors, all restrictions
5. **trial_of_the_abyss** - 100 floors, descend and return

## Available Raids

1. **crypt_of_the_forgotten** - 10 floors, 4-8 players
2. **tower_of_elements** - 15 floors, 5-10 players
3. **depths_of_madness** - 20 floors, 6-12 players
4. **celestial_citadel** - 25 floors, 8-16 players

## Integration Examples

### Convert to Dungeon Format

```typescript
import { mazeFloorToDungeon } from '@/lib/maze';

const floor = maze.floors[0];
const dungeon = mazeFloorToDungeon(floor, 12345);
```

### Find Path Between Points

```typescript
import { findPath } from '@/lib/maze';

const path = findPath(floor, 0, 0, 19, 19);
if (path) {
  console.log(`Path found: ${path.length} steps`);
}
```

### Get Floor Statistics

```typescript
import { getFloorStats } from '@/lib/maze';

const stats = getFloorStats(floor);
console.log(`Rooms: ${stats.roomCells}`);
console.log(`Dead Ends: ${stats.deadEnds}`);
console.log(`Gates: ${stats.gates}`);
```

## Next Steps

- Read [MAZE_SYSTEM.md](./MAZE_SYSTEM.md) for complete documentation
- Explore trial scoring and rewards
- Implement raid mechanics
- Track player progression
- Integrate with game engine

## Common Patterns

### Generate 100-Floor Dungeon

```typescript
const generator = new MazeGenerator({
  seed: Date.now(),
  type: 'dungeon',
  startFloor: 1,
  endFloor: 100,
  width: 25,
  height: 25,
  difficulty: 8,
  algorithm: 'recursive_backtrack'
});

const dungeon = generator.generate();
```

### Complete Trial with Scoring

```typescript
import { 
  generateTrial, 
  TRIALS, 
  calculateTrialScore 
} from '@/lib/maze';

const trial = TRIALS.trial_of_speed;
const maze = generateTrial(trial, 12345);

// Simulate completion
const { score, rank } = calculateTrialScore(
  trial,
  480,  // 8 minutes
  0,    // no deaths
  10,   // all floors
  3     // 3 secrets
);

console.log(`Rank: ${rank}, Score: ${score}`);
```

### Track Player Progression

```typescript
import { 
  createPlayerProgression, 
  updateDungeonProgress 
} from '@/lib/maze';

let progression = createPlayerProgression('player_123');
progression = updateDungeonProgress(progression, dungeonRun);

console.log(`Dungeons Completed: ${progression.dungeonsCompleted.length}`);
console.log(`Highest Floor: ${progression.highestDungeonFloor}`);
console.log(`Achievements: ${progression.achievements.length}`);
```

## Tips

1. **Use different algorithms** for different maze types
2. **Increase difficulty** gradually for better progression
3. **Add checkpoints** every 5-10 floors for player convenience
4. **Scale raid difficulty** based on player count
5. **Track statistics** for leaderboards and achievements

## Troubleshooting

**Maze generation is slow**
- Reduce floor count or maze size
- Use simpler algorithms (recursive_backtrack is fastest)

**No path between start and end**
- All algorithms guarantee connectivity
- Check if you're using the correct floor

**Trial scoring seems off**
- Review time limits and restrictions
- Check death penalties and bonuses

## Resources

- Full Documentation: [MAZE_SYSTEM.md](./MAZE_SYSTEM.md)
- Dungeon System: [DUNGEON_GENERATION.md](./DUNGEON_GENERATION.md)
- World System: [WORLD_GENERATION_SYSTEM.md](./WORLD_GENERATION_SYSTEM.md)
