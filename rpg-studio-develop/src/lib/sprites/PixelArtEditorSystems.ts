import { FULL_PIXEL_ART_PALETTE } from "./PixelArtColorIndex";

export type PixelTool =
  | "pencil"
  | "eraser"
  | "fill"
  | "line"
  | "rectangle"
  | "ellipse"
  | "color_picker"
  | "tile_stamp"
  | "mirror_pencil";

export interface PixelLayer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  pixels: Uint32Array;
}

export interface TileMapGrid {
  width: number;
  height: number;
  tileSize: number;
  tiles: Uint16Array;
}

export interface AnimationFrame {
  frameId: string;
  durationMs: number;
  layerIds: string[];
}

export interface PixelProject {
  id: string;
  width: number;
  height: number;
  palette: number[];
  activeColor: number;
  activeTool: PixelTool;
  layers: PixelLayer[];
  tileMap: TileMapGrid;
  animationFrames: AnimationFrame[];
}

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const indexFor = (x: number, y: number, width: number) => y * width + x;

const createLayer = (id: string, name: string, width: number, height: number): PixelLayer => ({
  id,
  name,
  visible: true,
  opacity: 1,
  pixels: new Uint32Array(width * height),
});

const defaultPalette = (): number[] => [...FULL_PIXEL_ART_PALETTE];

export const createPixelArtProject = (
  id: string,
  width = 64,
  height = 64,
  tileSize = 8,
): PixelProject => {
  const baseLayer = createLayer("layer_base", "Base", width, height);

  return {
    id,
    width,
    height,
    palette: defaultPalette(),
    activeColor: FULL_PIXEL_ART_PALETTE[15],
    activeTool: "pencil",
    layers: [baseLayer],
    tileMap: {
      width: Math.max(1, Math.floor(width / tileSize)),
      height: Math.max(1, Math.floor(height / tileSize)),
      tileSize,
      tiles: new Uint16Array(
        Math.max(1, Math.floor(width / tileSize)) *
          Math.max(1, Math.floor(height / tileSize)),
      ),
    },
    animationFrames: [{ frameId: "frame_0", durationMs: 100, layerIds: [baseLayer.id] }],
  };
};

export const addPixelLayer = (
  project: PixelProject,
  layerId: string,
  name: string,
): PixelProject => ({
  ...project,
  layers: [...project.layers, createLayer(layerId, name, project.width, project.height)],
});

export const setPixelColor = (
  project: PixelProject,
  layerId: string,
  x: number,
  y: number,
  color: number,
): PixelProject => {
  if (x < 0 || y < 0 || x >= project.width || y >= project.height) {
    return project;
  }
  const layers = project.layers.map((layer) => {
    if (layer.id !== layerId) {
      return layer;
    }
    const nextPixels = layer.pixels.slice();
    nextPixels[indexFor(x, y, project.width)] = color >>> 0;
    return { ...layer, pixels: nextPixels };
  });
  return { ...project, layers };
};

export const floodFillPixels = (
  project: PixelProject,
  layerId: string,
  startX: number,
  startY: number,
  color: number,
): PixelProject => {
  const layer = project.layers.find((entry) => entry.id === layerId);
  if (!layer) return project;
  if (startX < 0 || startY < 0 || startX >= project.width || startY >= project.height) {
    return project;
  }

  const nextPixels = layer.pixels.slice();
  const startIndex = indexFor(startX, startY, project.width);
  const target = nextPixels[startIndex];
  const replacement = color >>> 0;
  if (target === replacement) {
    return project;
  }

  const stack: Array<[number, number]> = [[startX, startY]];
  while (stack.length > 0) {
    const [x, y] = stack.pop() as [number, number];
    const idx = indexFor(x, y, project.width);
    if (nextPixels[idx] !== target) continue;
    nextPixels[idx] = replacement;

    if (x > 0) stack.push([x - 1, y]);
    if (x + 1 < project.width) stack.push([x + 1, y]);
    if (y > 0) stack.push([x, y - 1]);
    if (y + 1 < project.height) stack.push([x, y + 1]);
  }

  return {
    ...project,
    layers: project.layers.map((entry) =>
      entry.id === layerId ? { ...entry, pixels: nextPixels } : entry,
    ),
  };
};

export const setTileAt = (
  project: PixelProject,
  tileX: number,
  tileY: number,
  tileIndex: number,
): PixelProject => {
  if (
    tileX < 0 ||
    tileY < 0 ||
    tileX >= project.tileMap.width ||
    tileY >= project.tileMap.height
  ) {
    return project;
  }
  const tiles = project.tileMap.tiles.slice();
  tiles[indexFor(tileX, tileY, project.tileMap.width)] = clamp(tileIndex, 0, 65535);
  return {
    ...project,
    tileMap: {
      ...project.tileMap,
      tiles,
    },
  };
};

export const addAnimationFrame = (
  project: PixelProject,
  frameId: string,
  durationMs = 100,
  layerIds: string[] = project.layers.map((layer) => layer.id),
): PixelProject => ({
  ...project,
  animationFrames: [
    ...project.animationFrames,
    {
      frameId,
      durationMs: clamp(durationMs, 16, 5000),
      layerIds,
    },
  ],
});

export const setActiveTool = (
  project: PixelProject,
  tool: PixelTool,
): PixelProject => ({
  ...project,
  activeTool: tool,
});

export const setActiveColor = (
  project: PixelProject,
  color: number,
): PixelProject => ({
  ...project,
  activeColor: color >>> 0,
});

export const PIXEL_ART_EDITOR_SYSTEMS = {
  tools: [
    "pencil",
    "eraser",
    "fill",
    "line",
    "rectangle",
    "ellipse",
    "color_picker",
    "tile_stamp",
    "mirror_pencil",
  ] as PixelTool[],
  supports: [
    "layered_editing",
    "tilemap_authoring",
    "palette_management",
    "animation_timeline",
    "flood_fill",
    "mirroring",
    "sprite_sheet_workflow",
  ],
};
