import fs from "node:fs/promises";
import path from "node:path";
import { PipelineConfig, TileManifest } from "./types.js";

export async function generateCollisionAndAutotileRules(
  config: PipelineConfig,
  manifest: TileManifest
): Promise<{ collisionPath: string; autotilePath: string }> {
  const collision = {
    schema: "crypt-biome/collision-rules/v1",
    generatedAt: new Date().toISOString(),
    defaultBlocked: false,
    tileRules: manifest.tiles.map((tile) => ({
      gid: tile.gid,
      id: tile.id,
      category: tile.category,
      blocked: !tile.walkable
    }))
  };

  const wallGids = manifest.tiles.filter((tile) => tile.category === "wall").map((tile) => tile.gid);
  const fallback = wallGids[0] ?? 1;

  const autotile = {
    schema: "crypt-biome/autotile-rules/v1",
    mode: "4bit",
    category: "wall",
    bitmaskLegend: {
      up: 1,
      right: 2,
      down: 4,
      left: 8
    },
    maskToGid: Array.from({ length: 16 }, (_, mask) => ({
      mask,
      gid: wallGids[mask % Math.max(1, wallGids.length)] ?? fallback
    }))
  };

  const collisionPath = path.join(config.outputDir, "collision-rules.json");
  const autotilePath = path.join(config.outputDir, "autotile-rules-wall-4bit.json");

  await fs.writeFile(collisionPath, JSON.stringify(collision, null, 2), "utf-8");
  await fs.writeFile(autotilePath, JSON.stringify(autotile, null, 2), "utf-8");

  return { collisionPath, autotilePath };
}
