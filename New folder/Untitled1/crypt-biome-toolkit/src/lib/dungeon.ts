import { PipelineConfig, TileManifest } from "./types.js";
import { generateDungeonTmx } from "./tiled.js";

interface Room {
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function intersects(a: Room, b: Room): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function carveRect(grid: number[][], x: number, y: number, w: number, h: number): void {
  for (let py = y; py < y + h; py += 1) {
    for (let px = x; px < x + w; px += 1) {
      if (grid[py]?.[px] !== undefined) {
        grid[py][px] = 1;
      }
    }
  }
}

function carveCorridor(grid: number[][], x1: number, y1: number, x2: number, y2: number): void {
  let x = x1;
  let y = y1;

  while (x !== x2) {
    grid[y][x] = 1;
    x += x < x2 ? 1 : -1;
  }
  while (y !== y2) {
    grid[y][x] = 1;
    y += y < y2 ? 1 : -1;
  }
  grid[y][x] = 1;
}

function buildDungeonMask(width: number, height: number): number[][] {
  const grid = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
  const rooms: Room[] = [];
  const targetRooms = Math.max(8, Math.floor((width * height) / 220));

  for (let attempt = 0; attempt < targetRooms * 10; attempt += 1) {
    const w = randomInt(5, 11);
    const h = randomInt(5, 11);
    const x = randomInt(1, Math.max(1, width - w - 2));
    const y = randomInt(1, Math.max(1, height - h - 2));

    const room: Room = { x, y, w, h, cx: Math.floor(x + w / 2), cy: Math.floor(y + h / 2) };
    if (rooms.some((other) => intersects(room, other))) {
      continue;
    }

    carveRect(grid, room.x, room.y, room.w, room.h);

    if (rooms.length > 0) {
      const prev = rooms[rooms.length - 1];
      carveCorridor(grid, prev.cx, prev.cy, room.cx, room.cy);
    }

    rooms.push(room);
    if (rooms.length >= targetRooms) {
      break;
    }
  }

  return grid;
}

function findGid(manifest: TileManifest, category: string, fallback = 1): number {
  return manifest.tiles.find((tile) => tile.category === category)?.gid ?? fallback;
}

export async function generateProceduralDungeon(
  config: PipelineConfig,
  manifest: TileManifest
): Promise<string> {
  const walkMask = buildDungeonMask(config.mapWidth, config.mapHeight);

  const floorGid = findGid(manifest, "floor", 1);
  const wallGid = findGid(manifest, "wall", floorGid);
  const propCandidates = manifest.tiles.filter((tile) => tile.category === "prop").map((tile) => tile.gid);

  const floors: number[][] = Array.from({ length: config.mapHeight }, () => Array.from({ length: config.mapWidth }, () => 0));
  const walls: number[][] = Array.from({ length: config.mapHeight }, () => Array.from({ length: config.mapWidth }, () => 0));
  const props: number[][] = Array.from({ length: config.mapHeight }, () => Array.from({ length: config.mapWidth }, () => 0));

  for (let y = 0; y < config.mapHeight; y += 1) {
    for (let x = 0; x < config.mapWidth; x += 1) {
      const isFloor = walkMask[y][x] === 1;

      if (isFloor) {
        floors[y][x] = floorGid;
        if (propCandidates.length > 0 && Math.random() < 0.04) {
          props[y][x] = propCandidates[randomInt(0, propCandidates.length - 1)];
        }
      } else {
        walls[y][x] = wallGid;
      }
    }
  }

  return generateDungeonTmx(config, "procedural-crypt-dungeon", floors, walls, props);
}
