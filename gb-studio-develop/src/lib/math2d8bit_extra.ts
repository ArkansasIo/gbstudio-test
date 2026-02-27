// math2d8bit_extra.ts
// Additional 2D/8-bit math utilities for Game Boy and RPGs
// Includes geometry, pathfinding, interpolation, random, and stat formulas

import { Vec2 } from "./math2d8bit";

// --- Geometry ---
export function distance(a: Vec2, b: Vec2): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function manhattan(a: Vec2, b: Vec2): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function rectsOverlap(ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number): boolean {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

export function pointInRect(px: number, py: number, rx: number, ry: number, rw: number, rh: number): boolean {
  return px >= rx && px < rx + rw && py >= ry && py < ry + rh;
}

// --- Pathfinding (A* for grid) ---
export interface Node {
  x: number;
  y: number;
  cost: number;
  parent?: Node;
}

export function aStar(start: Vec2, goal: Vec2, grid: number[][]): Vec2[] {
  const open: Node[] = [{ x: start.x, y: start.y, cost: 0 }];
  const closed: Set<string> = new Set();
  const width = grid[0].length;
  const height = grid.length;
  function key(x: number, y: number) { return `${x},${y}`; }
  while (open.length) {
    open.sort((a, b) => a.cost + manhattan(a, goal) - (b.cost + manhattan(b, goal)));
    const current = open.shift();
    if (!current) {
      break;
    }
    if (current.x === goal.x && current.y === goal.y) {
      // Reconstruct path
      const path: Vec2[] = [];
      let n: Node | undefined = current;
      while (n) { path.unshift({ x: n.x, y: n.y }); n = n.parent; }
      return path;
    }
    closed.add(key(current.x, current.y));
    for (const [dx, dy] of [[0,1],[1,0],[0,-1],[-1,0]]) {
      const nx = current.x + dx, ny = current.y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      if (grid[ny][nx] !== 0) continue; // 0 = walkable
      if (closed.has(key(nx, ny))) continue;
      if (!open.some(n => n.x === nx && n.y === ny)) {
        open.push({ x: nx, y: ny, cost: current.cost + 1, parent: current });
      }
    }
  }
  return [];
}

// --- Interpolation ---
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function cubicLerp(a: number, b: number, c: number, d: number, t: number): number {
  // Catmull-Rom spline
  return 0.5 * ((2 * b) + (-a + c) * t + (2*a - 5*b + 4*c - d) * t * t + (-a + 3*b - 3*c + d) * t * t * t);
}

// --- Random Utilities ---
export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function weightedRandom(weights: number[]): number {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    if (r < weights[i]) return i;
    r -= weights[i];
  }
  return weights.length - 1;
}

// --- Stat/Formula Utilities ---
export function critChance(base: number, luck: number): boolean {
  // Example: 1% per 4 luck
  return Math.random() < (base + luck / 4) / 100;
}

export function evadeChance(base: number, agi: number): boolean {
  // Example: 1% per 5 agi
  return Math.random() < (base + agi / 5) / 100;
}

export function statusEffectChance(resist: number, power: number): boolean {
  // Example: chance = power - resist, min 5%, max 95%
  const chance = Math.max(0.05, Math.min(0.95, (power - resist) / 100));
  return Math.random() < chance;
}

// --- Miscellaneous ---
export function clamp8(n: number): number {
  return Math.max(0, Math.min(255, n));
}

export function wrap8(n: number): number {
  return ((n % 256) + 256) % 256;
}
