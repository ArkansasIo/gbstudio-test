/**
 * Tileset Slicer
 * Slices a master tileset image into individual tile PNGs
 */

import * as fs from 'fs';
import * as path from 'path';
import { TilesetConfig } from './types';

export interface SliceOptions {
  inputPath: string;
  outputDir: string;
  config: TilesetConfig;
  format: 'png' | 'webp';
  namePattern: string; // e.g., "tile_{id}" or "crypt_{category}_{id}"
}

/**
 * Generate metadata for slicing (without actual image processing)
 * Actual slicing would require canvas/sharp library
 */
export function generateSliceMetadata(options: SliceOptions): SliceMetadata[] {
  const { config } = options;
  const metadata: SliceMetadata[] = [];

  for (let row = 0; row < config.rows; row++) {
    for (let col = 0; col < config.columns; col++) {
      const id = row * config.columns + col;
      const x = config.margin + col * (config.tileWidth + config.spacing);
      const y = config.margin + row * (config.tileHeight + config.spacing);

      metadata.push({
        id,
        row,
        col,
        sourceX: x,
        sourceY: y,
        width: config.tileWidth,
        height: config.tileHeight,
        outputPath: path.join(
          options.outputDir,
          `${options.namePattern.replace('{id}', id.toString().padStart(3, '0'))}.${options.format}`
        )
      });
    }
  }

  return metadata;
}

export interface SliceMetadata {
  id: number;
  row: number;
  col: number;
  sourceX: number;
  sourceY: number;
  width: number;
  height: number;
  outputPath: string;
}

/**
 * Generate slice commands for external tools
 */
export function generateSliceCommands(options: SliceOptions): string[] {
  const metadata = generateSliceMetadata(options);
  const commands: string[] = [];

  // ImageMagick commands
  metadata.forEach(tile => {
    const cmd = `magick convert "${options.inputPath}" -crop ${tile.width}x${tile.height}+${tile.sourceX}+${tile.sourceY} "${tile.outputPath}"`;
    commands.push(cmd);
  });

  return commands;
}

/**
 * Generate batch script for slicing
 */
export function generateSliceBatchScript(options: SliceOptions, scriptPath: string): void {
  const commands = generateSliceCommands(options);
  
  // Windows batch file
  if (process.platform === 'win32') {
    const batchContent = [
      '@echo off',
      'echo Slicing tileset...',
      `mkdir "${options.outputDir}" 2>nul`,
      ...commands,
      'echo Done!',
      'pause'
    ].join('\n');
    
    fs.writeFileSync(scriptPath, batchContent);
  } else {
    // Unix shell script
    const shellContent = [
      '#!/bin/bash',
      'echo "Slicing tileset..."',
      `mkdir -p "${options.outputDir}"`,
      ...commands,
      'echo "Done!"'
    ].join('\n');
    
    fs.writeFileSync(scriptPath, shellContent);
    fs.chmodSync(scriptPath, '755');
  }
}

/**
 * Generate slice manifest JSON
 */
export function generateSliceManifest(options: SliceOptions, outputPath: string): void {
  const metadata = generateSliceMetadata(options);
  
  const manifest = {
    version: '1.0',
    tileset: options.config.name,
    source: options.inputPath,
    outputDir: options.outputDir,
    format: options.format,
    tileCount: metadata.length,
    tiles: metadata.map(tile => ({
      id: tile.id,
      file: path.basename(tile.outputPath),
      position: { row: tile.row, col: tile.col },
      source: { x: tile.sourceX, y: tile.sourceY },
      size: { width: tile.width, height: tile.height }
    }))
  };

  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
}

/**
 * Validate tileset image dimensions
 */
export function validateTilesetDimensions(config: TilesetConfig): {
  valid: boolean;
  expectedWidth: number;
  expectedHeight: number;
  errors: string[];
} {
  const errors: string[] = [];
  
  const expectedWidth = config.margin * 2 + 
    config.columns * config.tileWidth + 
    (config.columns - 1) * config.spacing;
    
  const expectedHeight = config.margin * 2 + 
    config.rows * config.tileHeight + 
    (config.rows - 1) * config.spacing;

  if (config.tileCount !== config.rows * config.columns) {
    errors.push(`Tile count mismatch: expected ${config.rows * config.columns}, got ${config.tileCount}`);
  }

  return {
    valid: errors.length === 0,
    expectedWidth,
    expectedHeight,
    errors
  };
}
