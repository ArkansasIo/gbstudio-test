/**
 * Noise Generation
 * Value noise and fractal Brownian motion for terrain
 */

function hash2D(x: number, y: number, seed: number): number {
  let h = (x * 374761393 + y * 668265263 + seed * 1442695041) >>> 0;
  h = (h ^ (h >>> 13)) >>> 0;
  h = (h * 1274126177) >>> 0;
  return h >>> 0;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * Value noise in [0, 1)
 */
export function valueNoise2D(
  x: number,
  y: number,
  seed: number,
  cellSize: number
): number {
  const gx = Math.floor(x / cellSize);
  const gy = Math.floor(y / cellSize);

  const tx = smoothstep((x / cellSize) - gx);
  const ty = smoothstep((y / cellSize) - gy);

  const h00 = hash2D(gx, gy, seed);
  const h10 = hash2D(gx + 1, gy, seed);
  const h01 = hash2D(gx, gy + 1, seed);
  const h11 = hash2D(gx + 1, gy + 1, seed);

  const v00 = h00 / 0x100000000;
  const v10 = h10 / 0x100000000;
  const v01 = h01 / 0x100000000;
  const v11 = h11 / 0x100000000;

  const a = lerp(v00, v10, tx);
  const b = lerp(v01, v11, tx);
  return lerp(a, b, ty);
}

/**
 * Fractal Brownian Motion
 * Output approximately in [0, 1]
 */
export function fbm2D(
  x: number,
  y: number,
  seed: number,
  baseCell: number,
  octaves = 5,
  lacunarity = 2.0,
  gain = 0.5
): number {
  let amplitude = 1.0;
  let frequency = 1.0;
  let sum = 0.0;
  let norm = 0.0;

  for (let i = 0; i < octaves; i++) {
    const n = valueNoise2D(x * frequency, y * frequency, seed + i * 1013, baseCell);
    sum += n * amplitude;
    norm += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }

  return sum / Math.max(1e-9, norm);
}

/**
 * Ridged noise (for mountains)
 */
export function ridgedNoise2D(
  x: number,
  y: number,
  seed: number,
  baseCell: number,
  octaves = 5
): number {
  let amplitude = 1.0;
  let frequency = 1.0;
  let sum = 0.0;
  let norm = 0.0;

  for (let i = 0; i < octaves; i++) {
    let n = valueNoise2D(x * frequency, y * frequency, seed + i * 1013, baseCell);
    n = 1.0 - Math.abs(n * 2.0 - 1.0); // Ridge
    sum += n * amplitude;
    norm += amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
  }

  return sum / Math.max(1e-9, norm);
}
