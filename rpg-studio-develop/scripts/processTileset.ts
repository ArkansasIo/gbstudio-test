#!/usr/bin/env ts-node
/// <reference types="node" />

/**
 * Tileset Processing CLI
 * Process crypt tileset: slice, generate metadata, create variants
 */

import * as path from 'path';
import * as fs from 'fs';
import {
  CRYPT_TILESET_CONFIG,
  generateSliceBatchScript,
  generateSliceManifest,
  generateTiledTileset,
  generateEmptyMap,
  exportCollisionJSON,
  generateVariantBatchScript,
  generateVariantMetadata,
  generateVariantCSS,
  exportVariantShaders,
  validateTilesetDimensions
} from '../src/lib/tileset';

const ASSETS_DIR = path.join(__dirname, '../assets/tilesets');
const OUTPUT_DIR = path.join(__dirname, '../output/tilesets');

interface ProcessOptions {
  inputImage: string;
  slice: boolean;
  tiled: boolean;
  collision: boolean;
  variants: boolean;
  all: boolean;
}

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function processSlicing(inputImage: string): void {
  console.log('📐 Generating slice scripts...');
  
  const sliceDir = path.join(OUTPUT_DIR, 'sliced');
  ensureDir(sliceDir);

  // Generate batch script
  const scriptPath = path.join(OUTPUT_DIR, 'slice_tileset.bat');
  generateSliceBatchScript(
    {
      inputPath: inputImage,
      outputDir: sliceDir,
      config: CRYPT_TILESET_CONFIG,
      format: 'png',
      namePattern: 'crypt_tile_{id}'
    },
    scriptPath
  );
  console.log(`✅ Slice script: ${scriptPath}`);

  // Generate manifest
  const manifestPath = path.join(OUTPUT_DIR, 'slice_manifest.json');
  generateSliceManifest(
    {
      inputPath: inputImage,
      outputDir: sliceDir,
      config: CRYPT_TILESET_CONFIG,
      format: 'png',
      namePattern: 'crypt_tile_{id}'
    },
    manifestPath
  );
  console.log(`✅ Slice manifest: ${manifestPath}`);
}

function processTiled(inputImage: string): void {
  console.log('🗺️  Generating Tiled files...');
  
  const tiledDir = path.join(OUTPUT_DIR, 'tiled');
  ensureDir(tiledDir);

  // Generate TSX tileset
  const tsxPath = path.join(tiledDir, 'crypt_tileset.tsx');
  generateTiledTileset(
    CRYPT_TILESET_CONFIG,
    path.relative(tiledDir, inputImage),
    tsxPath
  );
  console.log(`✅ Tileset file: ${tsxPath}`);

  // Generate empty map template
  const tmxPath = path.join(tiledDir, 'crypt_map_template.tmx');
  generateEmptyMap(
    50,
    40,
    './crypt_tileset.tsx',
    tmxPath
  );
  console.log(`✅ Map template: ${tmxPath}`);
}

function processCollision(): void {
  console.log('💥 Generating collision data...');
  
  const collisionPath = path.join(OUTPUT_DIR, 'collision_data.json');
  exportCollisionJSON(collisionPath);
  console.log(`✅ Collision data: ${collisionPath}`);
}

function processVariants(inputImage: string): void {
  console.log('🎨 Generating variants...');
  
  const variantsDir = path.join(OUTPUT_DIR, 'variants');
  ensureDir(variantsDir);

  // Generate variant batch script
  const scriptPath = path.join(OUTPUT_DIR, 'generate_variants.bat');
  generateVariantBatchScript(inputImage, variantsDir, scriptPath);
  console.log(`✅ Variant script: ${scriptPath}`);

  // Generate variant metadata
  const metadataPath = path.join(variantsDir, 'variants.json');
  generateVariantMetadata(metadataPath);
  console.log(`✅ Variant metadata: ${metadataPath}`);

  // Generate CSS filters
  const cssPath = path.join(variantsDir, 'variants.css');
  generateVariantCSS(cssPath);
  console.log(`✅ Variant CSS: ${cssPath}`);

  // Generate shaders
  const shadersDir = path.join(variantsDir, 'shaders');
  ensureDir(shadersDir);
  exportVariantShaders(shadersDir);
  console.log(`✅ Variant shaders: ${shadersDir}`);
}

function validateTileset(inputImage: string): void {
  console.log('🔍 Validating tileset...');
  
  const validation = validateTilesetDimensions(CRYPT_TILESET_CONFIG);
  
  if (validation.valid) {
    console.log('✅ Tileset configuration is valid');
    console.log(`   Expected dimensions: ${validation.expectedWidth}x${validation.expectedHeight}`);
  } else {
    console.error('❌ Tileset configuration errors:');
    validation.errors.forEach(error => console.error(`   - ${error}`));
  }
}

function main(): void {
  const args = process.argv.slice(2);
  
  const options: ProcessOptions = {
    inputImage: args.find(arg => !arg.startsWith('--')) || path.join(ASSETS_DIR, 'crypt_tileset.png'),
    slice: args.includes('--slice'),
    tiled: args.includes('--tiled'),
    collision: args.includes('--collision'),
    variants: args.includes('--variants'),
    all: args.includes('--all') || args.length === 0
  };

  console.log('🎮 Tileset Processing Tool');
  console.log('==========================\n');
  console.log(`Input: ${options.inputImage}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  ensureDir(OUTPUT_DIR);

  // Validate first
  validateTileset(options.inputImage);
  console.log('');

  // Process based on options
  if (options.all || options.slice) {
    processSlicing(options.inputImage);
    console.log('');
  }

  if (options.all || options.tiled) {
    processTiled(options.inputImage);
    console.log('');
  }

  if (options.all || options.collision) {
    processCollision();
    console.log('');
  }

  if (options.all || options.variants) {
    processVariants(options.inputImage);
    console.log('');
  }

  console.log('✨ Processing complete!');
  console.log('\nNext steps:');
  console.log('1. Run the slice script to extract individual tiles');
  console.log('2. Run the variant script to generate color variants');
  console.log('3. Open the .tmx file in Tiled Map Editor');
  console.log('4. Use collision_data.json in your game engine');
}

// Run if executed directly
if (require.main === module) {
  main();
}
