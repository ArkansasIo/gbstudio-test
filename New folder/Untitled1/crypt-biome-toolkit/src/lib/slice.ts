import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { PipelineConfig, TileCategory, TileInfo, TileManifest } from "./types.js";
import { ensureDir } from "./utils.js";

function categoryForRow(row: number): TileCategory {
  if (row <= 1) {
    return "floor";
  }
  if (row <= 4) {
    return "wall";
  }
  if (row <= 6) {
    return "structure";
  }
  if (row <= 9) {
    return "entrance";
  }
  if (row === 10) {
    return "prop";
  }
  return "debris";
}

function isWalkable(category: TileCategory): boolean {
  return category === "floor" || category === "debris";
}

export async function sliceTileset(config: PipelineConfig): Promise<TileManifest> {
  const tilesDir = path.join(config.outputDir, "tiles");
  await ensureDir(config.outputDir);
  await ensureDir(tilesDir);

  const image = sharp(config.inputImage);
  const metadata = await image.metadata();

  const expectedWidth = config.columns * config.tileSize;
  const expectedHeight = config.rows * config.tileSize;

  if (metadata.width !== expectedWidth || metadata.height !== expectedHeight) {
    throw new Error(
      `Input image must be exactly ${expectedWidth}x${expectedHeight}px for ${config.columns}x${config.rows} at tile size ${config.tileSize}.`
    );
  }

  const copiedSource = path.join(config.outputDir, "tileset_master.png");
  await fs.copyFile(config.inputImage, copiedSource);

  const tiles: TileInfo[] = [];

  for (let row = 0; row < config.rows; row += 1) {
    for (let col = 0; col < config.columns; col += 1) {
      const id = row * config.columns + col;
      const gid = id + 1;
      const fileName = `tile_${String(id).padStart(3, "0")}.png`;
      const filePath = path.join(tilesDir, fileName);
      const category = categoryForRow(row);

      await image
        .clone()
        .extract({
          left: col * config.tileSize,
          top: row * config.tileSize,
          width: config.tileSize,
          height: config.tileSize
        })
        .png()
        .toFile(filePath);

      tiles.push({
        id,
        gid,
        row,
        col,
        fileName,
        filePath,
        category,
        walkable: isWalkable(category)
      });
    }
  }

  const manifest: TileManifest = {
    meta: {
      tileSize: config.tileSize,
      columns: config.columns,
      rows: config.rows,
      tileCount: config.columns * config.rows,
      sourceImage: copiedSource,
      generatedAt: new Date().toISOString()
    },
    tiles
  };

  await fs.writeFile(path.join(config.outputDir, "tileset.manifest.json"), JSON.stringify(manifest, null, 2), "utf-8");
  return manifest;
}
