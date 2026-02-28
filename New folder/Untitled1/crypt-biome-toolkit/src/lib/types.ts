export type TileCategory =
  | "floor"
  | "wall"
  | "structure"
  | "entrance"
  | "prop"
  | "debris";

export interface PipelineConfig {
  inputImage: string;
  outputDir: string;
  tileSize: number;
  columns: number;
  rows: number;
  mapWidth: number;
  mapHeight: number;
}

export interface TileInfo {
  id: number;
  gid: number;
  row: number;
  col: number;
  fileName: string;
  filePath: string;
  category: TileCategory;
  walkable: boolean;
}

export interface TileManifest {
  meta: {
    tileSize: number;
    columns: number;
    rows: number;
    tileCount: number;
    sourceImage: string;
    generatedAt: string;
  };
  tiles: TileInfo[];
}
