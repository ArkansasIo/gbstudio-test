export interface PixelColorIndexEntry {
  index: number;
  argb: number;
  hex: string;
  name: string;
  group: "base" | "cube" | "grayscale";
}

const toArgb = (r: number, g: number, b: number): number =>
  ((0xff << 24) | (r << 16) | (g << 8) | b) >>> 0;

const toHex = (argb: number): string =>
  `#${(argb >>> 0).toString(16).padStart(8, "0").toUpperCase()}`;

// Base 16 follows common indexed palette conventions with editor-friendly naming.
const baseColors: Array<{ rgb: [number, number, number]; name: string }> = [
  { rgb: [0, 0, 0], name: "Black" },
  { rgb: [128, 0, 0], name: "Maroon" },
  { rgb: [0, 128, 0], name: "Green" },
  { rgb: [128, 128, 0], name: "Olive" },
  { rgb: [0, 0, 128], name: "Navy" },
  { rgb: [128, 0, 128], name: "Purple" },
  { rgb: [0, 128, 128], name: "Teal" },
  { rgb: [192, 192, 192], name: "Silver" },
  { rgb: [128, 128, 128], name: "Gray" },
  { rgb: [255, 0, 0], name: "Red" },
  { rgb: [0, 255, 0], name: "Lime" },
  { rgb: [255, 255, 0], name: "Yellow" },
  { rgb: [0, 0, 255], name: "Blue" },
  { rgb: [255, 0, 255], name: "Magenta" },
  { rgb: [0, 255, 255], name: "Cyan" },
  { rgb: [255, 255, 255], name: "White" },
];

const cubeSteps = [0, 95, 135, 175, 215, 255];

const buildColorIndex = (): PixelColorIndexEntry[] => {
  const entries: PixelColorIndexEntry[] = [];

  baseColors.forEach((base, idx) => {
    const [r, g, b] = base.rgb;
    const argb = toArgb(r, g, b);
    entries.push({
      index: idx,
      argb,
      hex: toHex(argb),
      name: base.name,
      group: "base",
    });
  });

  let idx = 16;
  for (let r = 0; r < 6; r++) {
    for (let g = 0; g < 6; g++) {
      for (let b = 0; b < 6; b++) {
        const argb = toArgb(cubeSteps[r], cubeSteps[g], cubeSteps[b]);
        entries.push({
          index: idx,
          argb,
          hex: toHex(argb),
          name: `Cube ${r}${g}${b}`,
          group: "cube",
        });
        idx += 1;
      }
    }
  }

  for (let i = 0; i < 24; i++) {
    const v = 8 + i * 10;
    const argb = toArgb(v, v, v);
    entries.push({
      index: idx,
      argb,
      hex: toHex(argb),
      name: `Gray ${i + 1}`,
      group: "grayscale",
    });
    idx += 1;
  }

  return entries;
};

export const FULL_PIXEL_ART_COLOR_INDEX: PixelColorIndexEntry[] = buildColorIndex();

export const FULL_PIXEL_ART_PALETTE: number[] = FULL_PIXEL_ART_COLOR_INDEX.map(
  (entry) => entry.argb,
);

export const PIXEL_ART_COLOR_INDEX_BY_VALUE: Record<number, PixelColorIndexEntry> =
  FULL_PIXEL_ART_COLOR_INDEX.reduce<Record<number, PixelColorIndexEntry>>(
    (acc, entry) => {
      acc[entry.argb] = entry;
      return acc;
    },
    {},
  );

export const getPixelColorByIndex = (index: number): PixelColorIndexEntry =>
  FULL_PIXEL_ART_COLOR_INDEX[Math.max(0, Math.min(255, index))];

export const findClosestPixelColorIndex = (argb: number): PixelColorIndexEntry => {
  const targetR = (argb >>> 16) & 0xff;
  const targetG = (argb >>> 8) & 0xff;
  const targetB = argb & 0xff;
  let closest = FULL_PIXEL_ART_COLOR_INDEX[0];
  let closestDist = Number.MAX_SAFE_INTEGER;

  for (const entry of FULL_PIXEL_ART_COLOR_INDEX) {
    const r = (entry.argb >>> 16) & 0xff;
    const g = (entry.argb >>> 8) & 0xff;
    const b = entry.argb & 0xff;
    const dr = targetR - r;
    const dg = targetG - g;
    const db = targetB - b;
    const dist = dr * dr + dg * dg + db * db;
    if (dist < closestDist) {
      closestDist = dist;
      closest = entry;
      if (dist === 0) {
        break;
      }
    }
  }

  return closest;
};

