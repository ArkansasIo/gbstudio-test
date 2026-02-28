/**
 * Maze Generation Algorithms
 * Recursive Backtracking, Prim's, Kruskal's, Wilson's
 */

import { SeededRNG } from '../world/rng';
import type { MazeCell, Direction } from './types';

const DIRECTIONS: Direction[] = ['north', 'south', 'east', 'west'];

const OPPOSITE: Record<Direction, Direction> = {
  north: 'south',
  south: 'north',
  east: 'west',
  west: 'east'
};

/**
 * Get neighbor coordinates
 */
function getNeighbor(x: number, y: number, dir: Direction): { x: number; y: number } {
  switch (dir) {
    case 'north': return { x, y: y - 1 };
    case 'south': return { x, y: y + 1 };
    case 'east': return { x: x + 1, y };
    case 'west': return { x: x - 1, y };
  }
}

/**
 * Check if coordinates are valid
 */
function isValid(x: number, y: number, width: number, height: number): boolean {
  return x >= 0 && x < width && y >= 0 && y < height;
}

/**
 * Initialize maze grid with all walls
 */
export function initializeMaze(width: number, height: number, floor: number): MazeCell[][] {
  const cells: MazeCell[][] = [];
  
  for (let y = 0; y < height; y++) {
    cells[y] = [];
    for (let x = 0; x < width; x++) {
      cells[y][x] = {
        x,
        y,
        floor,
        walls: {
          north: true,
          south: true,
          east: true,
          west: true
        },
        visited: false,
        isStart: false,
        isEnd: false,
        isCheckpoint: false
      };
    }
  }
  
  return cells;
}

/**
 * Recursive Backtracking Algorithm
 * Creates perfect mazes with long corridors
 */
export function recursiveBacktrack(
  cells: MazeCell[][],
  rng: SeededRNG,
  startX = 0,
  startY = 0
): void {
  const width = cells[0].length;
  const height = cells.length;
  const stack: { x: number; y: number }[] = [];
  
  let current = { x: startX, y: startY };
  cells[current.y][current.x].visited = true;
  
  while (true) {
    // Get unvisited neighbors
    const neighbors: { x: number; y: number; dir: Direction }[] = [];
    
    for (const dir of DIRECTIONS) {
      const next = getNeighbor(current.x, current.y, dir);
      if (isValid(next.x, next.y, width, height) && !cells[next.y][next.x].visited) {
        neighbors.push({ ...next, dir });
      }
    }
    
    if (neighbors.length > 0) {
      // Choose random neighbor
      const chosen = neighbors[rng.int(0, neighbors.length - 1)];
      
      // Remove walls
      cells[current.y][current.x].walls[chosen.dir] = false;
      cells[chosen.y][chosen.x].walls[OPPOSITE[chosen.dir]] = false;
      
      // Mark as visited
      cells[chosen.y][chosen.x].visited = true;
      
      // Push current to stack
      stack.push(current);
      
      // Move to chosen cell
      current = { x: chosen.x, y: chosen.y };
    } else if (stack.length > 0) {
      // Backtrack
      current = stack.pop()!;
    } else {
      // Done
      break;
    }
  }
}

/**
 * Prim's Algorithm
 * Creates mazes with many short dead ends
 */
export function prims(cells: MazeCell[][], rng: SeededRNG, startX = 0, startY = 0): void {
  const width = cells[0].length;
  const height = cells.length;
  
  const walls: { x: number; y: number; dir: Direction }[] = [];
  
  // Start with random cell
  cells[startY][startX].visited = true;
  
  // Add walls of starting cell
  for (const dir of DIRECTIONS) {
    const next = getNeighbor(startX, startY, dir);
    if (isValid(next.x, next.y, width, height)) {
      walls.push({ x: startX, y: startY, dir });
    }
  }
  
  while (walls.length > 0) {
    // Pick random wall
    const idx = rng.int(0, walls.length - 1);
    const wall = walls[idx];
    walls.splice(idx, 1);
    
    const next = getNeighbor(wall.x, wall.y, wall.dir);
    
    if (!isValid(next.x, next.y, width, height)) continue;
    
    const current = cells[wall.y][wall.x];
    const neighbor = cells[next.y][next.x];
    
    // If only one cell is visited, connect them
    if (current.visited !== neighbor.visited) {
      current.walls[wall.dir] = false;
      neighbor.walls[OPPOSITE[wall.dir]] = false;
      
      // Mark unvisited cell as visited
      const unvisited = current.visited ? neighbor : current;
      unvisited.visited = true;
      
      // Add walls of newly visited cell
      const ux = unvisited.x;
      const uy = unvisited.y;
      
      for (const dir of DIRECTIONS) {
        const n = getNeighbor(ux, uy, dir);
        if (isValid(n.x, n.y, width, height) && !cells[n.y][n.x].visited) {
          walls.push({ x: ux, y: uy, dir });
        }
      }
    }
  }
}

/**
 * Kruskal's Algorithm
 * Creates mazes with uniform texture
 */
export function kruskal(cells: MazeCell[][], rng: SeededRNG): void {
  const width = cells[0].length;
  const height = cells.length;
  
  // Union-Find data structure
  const parent: number[] = [];
  const rank: number[] = [];
  
  const getIndex = (x: number, y: number) => y * width + x;
  
  // Initialize sets
  for (let i = 0; i < width * height; i++) {
    parent[i] = i;
    rank[i] = 0;
  }
  
  const find = (i: number): number => {
    if (parent[i] !== i) {
      parent[i] = find(parent[i]);
    }
    return parent[i];
  };
  
  const union = (i: number, j: number): void => {
    const ri = find(i);
    const rj = find(j);
    
    if (ri === rj) return;
    
    if (rank[ri] < rank[rj]) {
      parent[ri] = rj;
    } else if (rank[ri] > rank[rj]) {
      parent[rj] = ri;
    } else {
      parent[rj] = ri;
      rank[ri]++;
    }
  };
  
  // Create list of all walls
  const walls: { x: number; y: number; dir: Direction }[] = [];
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x < width - 1) walls.push({ x, y, dir: 'east' });
      if (y < height - 1) walls.push({ x, y, dir: 'south' });
    }
  }
  
  // Shuffle walls
  for (let i = walls.length - 1; i > 0; i--) {
    const j = rng.int(0, i);
    [walls[i], walls[j]] = [walls[j], walls[i]];
  }
  
  // Process walls
  for (const wall of walls) {
    const next = getNeighbor(wall.x, wall.y, wall.dir);
    
    const idx1 = getIndex(wall.x, wall.y);
    const idx2 = getIndex(next.x, next.y);
    
    // If cells are in different sets, connect them
    if (find(idx1) !== find(idx2)) {
      cells[wall.y][wall.x].walls[wall.dir] = false;
      cells[next.y][next.x].walls[OPPOSITE[wall.dir]] = false;
      union(idx1, idx2);
    }
  }
  
  // Mark all as visited
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      cells[y][x].visited = true;
    }
  }
}

/**
 * Wilson's Algorithm
 * Creates unbiased random mazes
 */
export function wilson(cells: MazeCell[][], rng: SeededRNG): void {
  const width = cells[0].length;
  const height = cells.length;
  
  // Mark random cell as visited
  const startX = rng.int(0, width - 1);
  const startY = rng.int(0, height - 1);
  cells[startY][startX].visited = true;
  
  // Get unvisited cells
  const getUnvisited = (): { x: number; y: number }[] => {
    const unvisited: { x: number; y: number }[] = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (!cells[y][x].visited) {
          unvisited.push({ x, y });
        }
      }
    }
    return unvisited;
  };
  
  while (true) {
    const unvisited = getUnvisited();
    if (unvisited.length === 0) break;
    
    // Start random walk from random unvisited cell
    let current = unvisited[rng.int(0, unvisited.length - 1)];
    const path: { x: number; y: number; dir: Direction }[] = [];
    const pathSet = new Set<string>();
    
    // Random walk until we hit a visited cell
    while (!cells[current.y][current.x].visited) {
      const key = `${current.x},${current.y}`;
      
      // If we've been here before in this walk, erase loop
      if (pathSet.has(key)) {
        while (path.length > 0) {
          const last = path[path.length - 1];
          if (last.x === current.x && last.y === current.y) break;
          pathSet.delete(`${last.x},${last.y}`);
          path.pop();
        }
      }
      
      // Choose random direction
      const validDirs: Direction[] = [];
      for (const dir of DIRECTIONS) {
        const next = getNeighbor(current.x, current.y, dir);
        if (isValid(next.x, next.y, width, height)) {
          validDirs.push(dir);
        }
      }
      
      const dir = validDirs[rng.int(0, validDirs.length - 1)];
      path.push({ ...current, dir });
      pathSet.add(key);
      
      const next = getNeighbor(current.x, current.y, dir);
      current = next;
    }
    
    // Carve path
    for (const step of path) {
      const next = getNeighbor(step.x, step.y, step.dir);
      
      cells[step.y][step.x].walls[step.dir] = false;
      cells[next.y][next.x].walls[OPPOSITE[step.dir]] = false;
      cells[step.y][step.x].visited = true;
    }
  }
}
