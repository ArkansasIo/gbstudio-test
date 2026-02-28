import fs from "node:fs/promises";
import path from "node:path";
import { PipelineConfig, TileManifest } from "./types.js";
import { toCsvRows } from "./utils.js";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function generateTsx(config: PipelineConfig, manifest: TileManifest): Promise<string> {
  const outputPath = path.join(config.outputDir, "crypt-biome.tsx");
  const relativeImagePath = "tileset_master.png";

  const tilePropsXml = manifest.tiles
    .map(
      (tile) =>
        `  <tile id="${tile.id}">\n` +
        "    <properties>\n" +
        `      <property name="category" value="${tile.category}"/>\n` +
        `      <property name="walkable" type="bool" value="${tile.walkable ? "true" : "false"}"/>\n` +
        "    </properties>\n" +
        "  </tile>"
    )
    .join("\n");

  const tsx =
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
    `<tileset version="1.10" tiledversion="1.10.2" name="crypt-biome" tilewidth="${config.tileSize}" tileheight="${config.tileSize}" tilecount="${manifest.meta.tileCount}" columns="${config.columns}">\n` +
    `  <image source="${escapeXml(relativeImagePath)}" width="${config.columns * config.tileSize}" height="${config.rows * config.tileSize}"/>\n` +
    `${tilePropsXml}\n` +
    "</tileset>\n";

  await fs.writeFile(outputPath, tsx, "utf-8");
  return outputPath;
}

export async function generateTemplateTmx(config: PipelineConfig, manifest: TileManifest): Promise<string> {
  const outputPath = path.join(config.outputDir, "crypt-biome-template.tmx");

  const floorTile = manifest.tiles.find((tile) => tile.category === "floor")?.gid ?? 1;
  const width = config.mapWidth;
  const height = config.mapHeight;

  const baseGrid: number[][] = Array.from({ length: height }, () => Array.from({ length: width }, () => floorTile));
  const propsGrid: number[][] = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));

  const tmx =
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
    `<map version="1.10" tiledversion="1.10.2" orientation="isometric" renderorder="right-down" width="${width}" height="${height}" tilewidth="${config.tileSize}" tileheight="${config.tileSize}" infinite="0" nextlayerid="4" nextobjectid="1">\n` +
    "  <tileset firstgid=\"1\" source=\"crypt-biome.tsx\"/>\n" +
    "  <layer id=\"1\" name=\"Floors\" width=\"" +
    width +
    "\" height=\"" +
    height +
    "\">\n" +
    "    <data encoding=\"csv\">\n" +
    `${toCsvRows(baseGrid)}\n` +
    "    </data>\n" +
    "  </layer>\n" +
    "  <layer id=\"2\" name=\"CollisionWalls\" width=\"" +
    width +
    "\" height=\"" +
    height +
    "\">\n" +
    "    <data encoding=\"csv\">\n" +
    `${toCsvRows(Array.from({ length: height }, () => Array.from({ length: width }, () => 0)))}\n` +
    "    </data>\n" +
    "  </layer>\n" +
    "  <layer id=\"3\" name=\"Props\" width=\"" +
    width +
    "\" height=\"" +
    height +
    "\">\n" +
    "    <data encoding=\"csv\">\n" +
    `${toCsvRows(propsGrid)}\n` +
    "    </data>\n" +
    "  </layer>\n" +
    "</map>\n";

  await fs.writeFile(outputPath, tmx, "utf-8");
  return outputPath;
}

export async function generateDungeonTmx(
  config: PipelineConfig,
  mapName: string,
  floors: number[][],
  walls: number[][],
  props: number[][]
): Promise<string> {
  const outputPath = path.join(config.outputDir, `${mapName}.tmx`);
  const width = floors[0]?.length ?? 0;
  const height = floors.length;

  const tmx =
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
    `<map version="1.10" tiledversion="1.10.2" orientation="isometric" renderorder="right-down" width="${width}" height="${height}" tilewidth="${config.tileSize}" tileheight="${config.tileSize}" infinite="0" nextlayerid="4" nextobjectid="1">\n` +
    "  <tileset firstgid=\"1\" source=\"crypt-biome.tsx\"/>\n" +
    `  <layer id="1" name="Floors" width="${width}" height="${height}">\n` +
    "    <data encoding=\"csv\">\n" +
    `${toCsvRows(floors)}\n` +
    "    </data>\n" +
    "  </layer>\n" +
    `  <layer id="2" name="CollisionWalls" width="${width}" height="${height}">\n` +
    "    <data encoding=\"csv\">\n" +
    `${toCsvRows(walls)}\n` +
    "    </data>\n" +
    "  </layer>\n" +
    `  <layer id="3" name="Props" width="${width}" height="${height}">\n` +
    "    <data encoding=\"csv\">\n" +
    `${toCsvRows(props)}\n` +
    "    </data>\n" +
    "  </layer>\n" +
    "</map>\n";

  await fs.writeFile(outputPath, tmx, "utf-8");
  return outputPath;
}
