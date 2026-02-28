/**
 * Tileset Variant Generator
 * Creates color variants (lava, frost, cursed, etc.)
 */

import * as fs from 'fs';
import { TilesetVariant } from './types';

export const TILESET_VARIANTS: Record<string, TilesetVariant> = {
  default: {
    name: 'Default Crypt',
    baseColor: '#4a4a4a',
    accentColor: '#8b0000',
    description: 'Standard dark crypt with blood accents'
  },
  
  lava: {
    name: 'Lava Crypt',
    baseColor: '#2a1a0a',
    accentColor: '#ff4500',
    description: 'Volcanic crypt with lava flows'
  },
  
  frost: {
    name: 'Frost Crypt',
    baseColor: '#d0e8f0',
    accentColor: '#4169e1',
    description: 'Frozen crypt with ice crystals'
  },
  
  cursed: {
    name: 'Cursed Crypt',
    baseColor: '#1a0a2e',
    accentColor: '#9400d3',
    description: 'Cursed crypt with purple miasma'
  },
  
  toxic: {
    name: 'Toxic Crypt',
    baseColor: '#1a2a1a',
    accentColor: '#00ff00',
    description: 'Poisonous crypt with toxic sludge'
  },
  
  holy: {
    name: 'Holy Crypt',
    baseColor: '#f5f5dc',
    accentColor: '#ffd700',
    description: 'Sanctified crypt with golden light'
  },
  
  shadow: {
    name: 'Shadow Crypt',
    baseColor: '#0a0a0a',
    accentColor: '#4b0082',
    description: 'Shadow realm crypt with void energy'
  },
  
  blood: {
    name: 'Blood Crypt',
    baseColor: '#3a0a0a',
    accentColor: '#8b0000',
    description: 'Blood-soaked sacrificial crypt'
  }
};

export interface ColorTransform {
  hueShift: number;      // -180 to 180
  saturation: number;    // 0 to 2 (1 = no change)
  brightness: number;    // 0 to 2 (1 = no change)
  contrast: number;      // 0 to 2 (1 = no change)
}

/**
 * Generate color transform for variant
 */
export function getVariantTransform(variantName: string): ColorTransform {
  const transforms: Record<string, ColorTransform> = {
    lava: {
      hueShift: 15,
      saturation: 1.5,
      brightness: 1.2,
      contrast: 1.3
    },
    frost: {
      hueShift: -120,
      saturation: 0.7,
      brightness: 1.3,
      contrast: 1.1
    },
    cursed: {
      hueShift: -60,
      saturation: 1.8,
      brightness: 0.8,
      contrast: 1.4
    },
    toxic: {
      hueShift: 90,
      saturation: 2.0,
      brightness: 1.1,
      contrast: 1.2
    },
    holy: {
      hueShift: 30,
      saturation: 0.5,
      brightness: 1.5,
      contrast: 0.9
    },
    shadow: {
      hueShift: -90,
      saturation: 0.3,
      brightness: 0.5,
      contrast: 1.5
    },
    blood: {
      hueShift: 0,
      saturation: 2.0,
      brightness: 0.7,
      contrast: 1.4
    }
  };

  return transforms[variantName] || {
    hueShift: 0,
    saturation: 1,
    brightness: 1,
    contrast: 1
  };
}

/**
 * Generate ImageMagick commands for variants
 */
export function generateVariantCommands(
  inputPath: string,
  outputDir: string
): string[] {
  const commands: string[] = [];

  Object.keys(TILESET_VARIANTS).forEach(variantName => {
    if (variantName === 'default') return;

    const transform = getVariantTransform(variantName);
    const outputPath = `${outputDir}/crypt_tileset_${variantName}.png`;

    const cmd = [
      'magick convert',
      `"${inputPath}"`,
      `-modulate ${transform.brightness * 100},${transform.saturation * 100},${100 + transform.hueShift}`,
      `-brightness-contrast ${(transform.brightness - 1) * 50}x${(transform.contrast - 1) * 50}`,
      `"${outputPath}"`
    ].join(' ');

    commands.push(cmd);
  });

  return commands;
}

/**
 * Generate variant batch script
 */
export function generateVariantBatchScript(
  inputPath: string,
  outputDir: string,
  scriptPath: string
): void {
  const commands = generateVariantCommands(inputPath, outputDir);

  if (process.platform === 'win32') {
    const batchContent = [
      '@echo off',
      'echo Generating tileset variants...',
      `mkdir "${outputDir}" 2>nul`,
      ...commands,
      'echo Done!',
      'pause'
    ].join('\n');

    fs.writeFileSync(scriptPath, batchContent);
  } else {
    const shellContent = [
      '#!/bin/bash',
      'echo "Generating tileset variants..."',
      `mkdir -p "${outputDir}"`,
      ...commands,
      'echo "Done!"'
    ].join('\n');

    fs.writeFileSync(scriptPath, shellContent);
    fs.chmodSync(scriptPath, '755');
  }
}

/**
 * Generate variant metadata JSON
 */
export function generateVariantMetadata(outputPath: string): void {
  const metadata = {
    version: '1.0',
    baseVariant: 'default',
    variants: Object.entries(TILESET_VARIANTS).map(([key, variant]) => ({
      id: key,
      name: variant.name,
      baseColor: variant.baseColor,
      accentColor: variant.accentColor,
      description: variant.description,
      transform: key !== 'default' ? getVariantTransform(key) : null,
      filename: key === 'default' ? 'crypt_tileset.png' : `crypt_tileset_${key}.png`
    }))
  };

  fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
}

/**
 * Generate CSS filters for web-based variants
 */
export function generateCSSFilters(): Record<string, string> {
  const filters: Record<string, string> = {};

  Object.keys(TILESET_VARIANTS).forEach(variantName => {
    if (variantName === 'default') {
      filters[variantName] = 'none';
      return;
    }

    const transform = getVariantTransform(variantName);
    
    filters[variantName] = [
      `hue-rotate(${transform.hueShift}deg)`,
      `saturate(${transform.saturation})`,
      `brightness(${transform.brightness})`,
      `contrast(${transform.contrast})`
    ].join(' ');
  });

  return filters;
}

/**
 * Generate variant CSS file
 */
export function generateVariantCSS(outputPath: string): void {
  const filters = generateCSSFilters();
  
  const css = [
    '/* Tileset Variant Filters */',
    '/* Apply these classes to tileset images for instant variants */',
    '',
    ...Object.entries(filters).map(([variant, filter]) => 
      `.tileset-${variant} {\n  filter: ${filter};\n}`
    )
  ].join('\n\n');

  fs.writeFileSync(outputPath, css);
}

/**
 * Generate shader code for variants (GLSL)
 */
export function generateVariantShader(variantName: string): string {
  const transform = getVariantTransform(variantName);
  
  return `
// Tileset Variant Shader: ${variantName}
uniform sampler2D u_texture;
varying vec2 v_texCoord;

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec4 color = texture2D(u_texture, v_texCoord);
  vec3 hsv = rgb2hsv(color.rgb);
  
  // Apply hue shift
  hsv.x = mod(hsv.x + ${transform.hueShift / 360.0}, 1.0);
  
  // Apply saturation
  hsv.y *= ${transform.saturation};
  
  // Apply brightness
  hsv.z *= ${transform.brightness};
  
  vec3 rgb = hsv2rgb(hsv);
  
  // Apply contrast
  rgb = ((rgb - 0.5) * ${transform.contrast}) + 0.5;
  
  gl_FragColor = vec4(rgb, color.a);
}
`.trim();
}

/**
 * Export all variant shaders
 */
export function exportVariantShaders(outputDir: string): void {
  Object.keys(TILESET_VARIANTS).forEach(variantName => {
    if (variantName === 'default') return;

    const shader = generateVariantShader(variantName);
    const filename = `${outputDir}/variant_${variantName}.frag`;
    fs.writeFileSync(filename, shader);
  });
}
