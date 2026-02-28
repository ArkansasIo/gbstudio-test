/**
 * Tiled Map Editor Exporter
 * Generates .tsx (tileset) and .tmx (map) files
 */

import * as fs from 'fs';
import { TiledTileset, TiledMap, TiledMapLayer, TilesetConfig } from './types';
import { CRYPT_TILES, CRYPT_TILESET_CONFIG } from './cryptTileDefinitions';

/**
 * Generate Tiled TSX tileset file
 */
export function generateTiledTileset(
  config: TilesetConfig,
  imagePath: string,
  outputPath: string
): void {
  const tileset: TiledTileset = {
    version: '1.10',
    tiledversion: '1.10.2',
    name: config.name,
    tilewidth: config.tileWidth,
    tileheight: config.tileHeight,
    tilecount: config.tileCount,
    columns: config.columns,
    image: imagePath,
    imagewidth: config.columns * config.tileWidth,
    imageheight: config.rows * config.tileHeight,
    margin: config.margin,
    spacing: config.spacing,
    tiles: CRYPT_TILES.map(tile => ({
      id: tile.id,
      type: tile.category,
      properties: [
        { name: 'variant', type: 'string', value: tile.variant },
        { name: 'collision', type: 'string', value: tile.collision },
        { name: 'walkable', type: 'bool', value: tile.walkable },
        { name: 'transparent', type: 'bool', value: tile.transparent },
        { name: 'description', type: 'string', value: tile.description }
      ],
      ...(tile.collision !== 'none' && {
        objectgroup: {
          objects: [
            {
              id: 1,
              name: 'collision',
              type: 'collision',
              x: 0,
              y: 0,
              width: tile.collision === 'full' ? config.tileWidth : config.tileWidth / 2,
              height: tile.collision === 'full' ? config.tileHeight : config.tileHeight / 2,
              rotation: 0,
              visible: true
            }
          ]
        }
      }),
      ...(tile.animated && {
        animation: tile.frames?.map((frameId, index) => ({
          tileid: frameId,
          duration: 200 // 200ms per frame
        }))
      })
    }))
  };

  const xml = generateTilesetXML(tileset);
  fs.writeFileSync(outputPath, xml);
}

/**
 * Generate XML for TSX file
 */
function generateTilesetXML(tileset: TiledTileset): string {
  const lines: string[] = [];
  
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push(`<tileset version="${tileset.version}" tiledversion="${tileset.tiledversion}" name="${tileset.name}" tilewidth="${tileset.tilewidth}" tileheight="${tileset.tileheight}" tilecount="${tileset.tilecount}" columns="${tileset.columns}">`);
  lines.push(`  <image source="${tileset.image}" width="${tileset.imagewidth}" height="${tileset.imageheight}"/>`);
  
  tileset.tiles.forEach(tile => {
    lines.push(`  <tile id="${tile.id}" type="${tile.type || ''}">`);
    
    if (tile.properties && tile.properties.length > 0) {
      lines.push('    <properties>');
      tile.properties.forEach(prop => {
        lines.push(`      <property name="${prop.name}" type="${prop.type}" value="${prop.value}"/>`);
      });
      lines.push('    </properties>');
    }
    
    if (tile.objectgroup) {
      lines.push('    <objectgroup draworder="index">');
      tile.objectgroup.objects.forEach(obj => {
        lines.push(`      <object id="${obj.id}" name="${obj.name}" type="${obj.type}" x="${obj.x}" y="${obj.y}" width="${obj.width}" height="${obj.height}"/>`);
      });
      lines.push('    </objectgroup>');
    }
    
    lines.push('  </tile>');
  });
  
  lines.push('</tileset>');
  return lines.join('\n');
}

/**
 * Generate Tiled TMX map file
 */
export function generateTiledMap(
  width: number,
  height: number,
  tilesetPath: string,
  layers: TiledMapLayer[],
  outputPath: string
): void {
  const map: TiledMap = {
    version: '1.10',
    tiledversion: '1.10.2',
    orientation: 'isometric',
    renderorder: 'right-down',
    width,
    height,
    tilewidth: CRYPT_TILESET_CONFIG.tileWidth,
    tileheight: CRYPT_TILESET_CONFIG.tileHeight,
    infinite: false,
    layers,
    tilesets: [
      {
        firstgid: 1,
        source: tilesetPath
      }
    ]
  };

  const xml = generateMapXML(map);
  fs.writeFileSync(outputPath, xml);
}

/**
 * Generate XML for TMX file
 */
function generateMapXML(map: TiledMap): string {
  const lines: string[] = [];
  
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push(`<map version="${map.version}" tiledversion="${map.tiledversion}" orientation="${map.orientation}" renderorder="${map.renderorder}" width="${map.width}" height="${map.height}" tilewidth="${map.tilewidth}" tileheight="${map.tileheight}" infinite="${map.infinite ? 1 : 0}" nextlayerid="${map.layers.length + 1}" nextobjectid="1">`);
  
  map.tilesets.forEach(tileset => {
    lines.push(`  <tileset firstgid="${tileset.firstgid}" source="${tileset.source}"/>`);
  });
  
  map.layers.forEach(layer => {
    if (layer.type === 'tilelayer') {
      lines.push(`  <layer id="${layer.id}" name="${layer.name}" width="${layer.width}" height="${layer.height}" opacity="${layer.opacity}" visible="${layer.visible ? 1 : 0}">`);
      
      if (layer.data) {
        lines.push('    <data encoding="csv">');
        const rows: string[] = [];
        for (let y = 0; y < layer.height; y++) {
          const row = layer.data.slice(y * layer.width, (y + 1) * layer.width);
          rows.push(row.join(','));
        }
        lines.push(rows.join(',\n'));
        lines.push('    </data>');
      }
      
      lines.push('  </layer>');
    }
  });
  
  lines.push('</map>');
  return lines.join('\n');
}

/**
 * Generate empty map template
 */
export function generateEmptyMap(
  width: number,
  height: number,
  tilesetPath: string,
  outputPath: string
): void {
  const layers: TiledMapLayer[] = [
    {
      id: 1,
      name: 'Floor',
      type: 'tilelayer',
      visible: true,
      opacity: 1,
      x: 0,
      y: 0,
      width,
      height,
      data: Array(width * height).fill(0)
    },
    {
      id: 2,
      name: 'Walls',
      type: 'tilelayer',
      visible: true,
      opacity: 1,
      x: 0,
      y: 0,
      width,
      height,
      data: Array(width * height).fill(0)
    },
    {
      id: 3,
      name: 'Props',
      type: 'tilelayer',
      visible: true,
      opacity: 1,
      x: 0,
      y: 0,
      width,
      height,
      data: Array(width * height).fill(0)
    }
  ];

  generateTiledMap(width, height, tilesetPath, layers, outputPath);
}
