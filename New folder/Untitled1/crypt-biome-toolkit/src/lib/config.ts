import path from "node:path";
import { PipelineConfig } from "./types.js";

export function defaultConfig(): PipelineConfig {
  return {
    inputImage: path.resolve("assets/input/crypt_master_12x12.png"),
    outputDir: path.resolve("assets/output"),
    tileSize: 256,
    columns: 12,
    rows: 12,
    mapWidth: 64,
    mapHeight: 64
  };
}
