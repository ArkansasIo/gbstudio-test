import path from "node:path";
import sharp from "sharp";
import { PipelineConfig } from "./types.js";
import { ensureDir } from "./utils.js";

type VariantName = "lava" | "frost" | "cursed";

async function createElementalVariant(inputPath: string, outputPath: string, name: VariantName): Promise<void> {
  const image = sharp(inputPath);

  if (name === "lava") {
    await image.modulate({ brightness: 1.12, saturation: 1.35, hue: 18 }).tint({ r: 255, g: 145, b: 85 }).png().toFile(outputPath);
    return;
  }

  if (name === "frost") {
    await image.modulate({ brightness: 1.06, saturation: 0.75, hue: 205 }).tint({ r: 170, g: 210, b: 255 }).png().toFile(outputPath);
    return;
  }

  await image.modulate({ brightness: 0.9, saturation: 1.18, hue: 285 }).tint({ r: 165, g: 95, b: 185 }).png().toFile(outputPath);
}

async function createPixelVariant(inputPath: string, outputPath: string, tileSize: number): Promise<void> {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error("Could not read image dimensions for 8-bit conversion.");
  }

  const scaleFactor = 4;
  const downWidth = Math.max(1, Math.floor(metadata.width / scaleFactor));
  const downHeight = Math.max(1, Math.floor(metadata.height / scaleFactor));

  const rawBuffer = await image
    .resize(downWidth, downHeight, { kernel: sharp.kernel.nearest })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const levels = 6;
  const quantize = (value: number): number => {
    const normalized = value / 255;
    const snapped = Math.round(normalized * (levels - 1)) / (levels - 1);
    return Math.max(0, Math.min(255, Math.round(snapped * 255)));
  };

  for (let i = 0; i < rawBuffer.length; i += 4) {
    rawBuffer[i] = quantize(rawBuffer[i]);
    rawBuffer[i + 1] = quantize(rawBuffer[i + 1]);
    rawBuffer[i + 2] = quantize(rawBuffer[i + 2]);
  }

  await sharp(rawBuffer, { raw: { width: downWidth, height: downHeight, channels: 4 } })
    .resize(metadata.width, metadata.height, { kernel: sharp.kernel.nearest })
    .png()
    .toFile(outputPath);

  const tilePreviewPath = outputPath.replace(".png", `.tile${tileSize}.png`);
  await sharp(outputPath)
    .extract({ left: 0, top: 0, width: tileSize, height: tileSize })
    .png()
    .toFile(tilePreviewPath);
}

export async function generateVariants(config: PipelineConfig): Promise<string[]> {
  const variantDir = path.join(config.outputDir, "variants");
  await ensureDir(variantDir);

  const results: string[] = [];

  for (const name of ["lava", "frost", "cursed"] as const) {
    const outputPath = path.join(variantDir, `crypt-biome-${name}.png`);
    await createElementalVariant(config.inputImage, outputPath, name);
    results.push(outputPath);
  }

  const pixelPath = path.join(variantDir, "crypt-biome-8bit.png");
  await createPixelVariant(config.inputImage, pixelPath, config.tileSize);
  results.push(pixelPath);

  return results;
}
