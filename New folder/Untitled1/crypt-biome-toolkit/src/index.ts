import { defaultConfig } from "./lib/config.js";
import { generateProceduralDungeon } from "./lib/dungeon.js";
import { generateCollisionAndAutotileRules } from "./lib/rules.js";
import { sliceTileset } from "./lib/slice.js";
import { generateTemplateTmx, generateTsx } from "./lib/tiled.js";
import { parseArgs } from "./lib/utils.js";
import { generateVariants } from "./lib/variants.js";

async function run(): Promise<void> {
  const [, , command = "pipeline", ...args] = process.argv;
  const config = parseArgs(args, defaultConfig());

  if (!["pipeline", "slice", "tmx", "rules", "variants", "dungeon"].includes(command)) {
    throw new Error(
      `Unknown command '${command}'. Use one of: pipeline, slice, tmx, rules, variants, dungeon.`
    );
  }

  const manifest = await sliceTileset(config);

  if (command === "slice") {
    console.log("Sliced tiles and wrote tileset.manifest.json");
    return;
  }

  if (command === "tmx" || command === "pipeline") {
    const tsxPath = await generateTsx(config, manifest);
    const tmxPath = await generateTemplateTmx(config, manifest);
    console.log(`Generated TSX: ${tsxPath}`);
    console.log(`Generated template TMX: ${tmxPath}`);
  }

  if (command === "rules" || command === "pipeline") {
    const rulePaths = await generateCollisionAndAutotileRules(config, manifest);
    console.log(`Generated collision rules: ${rulePaths.collisionPath}`);
    console.log(`Generated autotile rules: ${rulePaths.autotilePath}`);
  }

  if (command === "variants" || command === "pipeline") {
    const variantPaths = await generateVariants(config);
    console.log(`Generated variants:\n${variantPaths.join("\n")}`);
  }

  if (command === "dungeon" || command === "pipeline") {
    const dungeonPath = await generateProceduralDungeon(config, manifest);
    console.log(`Generated procedural dungeon TMX: ${dungeonPath}`);
  }
}

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Pipeline failed: ${message}`);
  process.exitCode = 1;
});
