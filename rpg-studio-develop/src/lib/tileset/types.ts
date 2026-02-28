/**
 * Tileset Processing Types
 * For isometric crypt tileset management
 */

export interface TilesetConfig {
  name: string;
  imagePath: string;
  tileWidth: number;
  tileHeight: number;
  columns: number;
  rows: number;
  spacing: number;
  margin: number;
  tileCount: number;
}

export interface Tile {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  category: TileCategory;
  variant?: string;
  collision: CollisionType;
  autotile?: AutotileRule;
  properties?: Record<string, any>;
}

export type TileCategory = 
  | 'floor'
  | 'wall'
  | 'structure'
  | 'entrance'
  | 'prop'
  | 'transition'
  | 'corner'
  | 'decoration';

export type CollisionType = 
  | 'none'
  | 'full'
  | 'half'
  | 'quarter'
  | 'custom';

export interface AutotileRule {
  type: 'blob' | 'wall' | 'floor' | 'corner';
  neighbors: number[];
  priority: number;
}

export interface TileLayer {
  name: string;
  type: 'base' | 'collision' | 'structural' | 'decoration' | 'overlay';
  tiles: number[][];
  opacity: number;
  visible: boolean;
  zIndex: number;
}

export interface TiledTileset {
  version: string;
  tiledversion: string;
  name: string;
  tilewidth: number;
  tileheight: number;
  tilecount: number;
  columns: number;
  image: string;
  imagewidth: number;
  imageheight: number;
  margin: number;
  spacing: number;
  tiles: TiledTile[];
}

export interface TiledTile {
  id: number;
  type?: string;
  properties?: TiledProperty[];
  objectgroup?: {
    objects: TiledObject[];
  };
}

export interface TiledProperty {
  name: string;
  type: 'string' | 'int' | 'float' | 'bool' | 'color' | 'file';
  value: any;
}

export interface TiledObject {
  id: number;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  visible: boolean;
  properties?: TiledProperty[];
}

export interface TiledMap {
  version: string;
  tiledversion: string;
  orientation: 'isometric' | 'orthogonal';
  renderorder: 'right-down' | 'right-up' | 'left-down' | 'left-up';
  width: number;
  height: number;
  tilewidth: number;
  tileheight: number;
  infinite: boolean;
  layers: TiledMapLayer[];
  tilesets: TiledMapTileset[];
}

export interface TiledMapLayer {
  id: number;
  name: string;
  type: 'tilelayer' | 'objectgroup';
  visible: boolean;
  opacity: number;
  x: number;
  y: number;
  width: number;
  height: number;
  data?: number[];
  objects?: TiledObject[];
}

export interface TiledMapTileset {
  firstgid: number;
  source: string;
}

export interface CryptTileDefinition {
  id: number;
  name: string;
  category: TileCategory;
  variant: string;
  collision: CollisionType;
  walkable: boolean;
  transparent: boolean;
  animated?: boolean;
  frames?: number[];
  description: string;
}

export interface TilesetVariant {
  name: string;
  baseColor: string;
  accentColor: string;
  description: string;
}
