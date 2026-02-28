import fs from "node:fs/promises";
import path from "node:path";
import { PipelineConfig } from "./types.js";

export async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

export function parseArgs(args: string[], config: PipelineConfig): PipelineConfig {
  const next = { ...config };

  for (let index = 0; index < args.length; index += 1) {
    const key = args[index];
    const value = args[index + 1];

    if (!key.startsWith("--") || value === undefined) {
      continue;
    }

    switch (key) {
      case "--input":
        next.inputImage = path.resolve(value);
        index += 1;
        break;
      case "--out":
        next.outputDir = path.resolve(value);
        index += 1;
        break;
      case "--tile":
        next.tileSize = Number(value);
        index += 1;
        break;
      case "--cols":
        next.columns = Number(value);
        index += 1;
        break;
      case "--rows":
        next.rows = Number(value);
        index += 1;
        break;
      case "--mapWidth":
        next.mapWidth = Number(value);
        index += 1;
        break;
      case "--mapHeight":
        next.mapHeight = Number(value);
        index += 1;
        break;
      default:
        break;
    }
  }

  return next;
}

export function toCsvRows(grid: number[][]): string {
  return grid.map((row) => row.join(",")).join(",\n");
}
