import type { RPGFeatureDefinition } from "./types";

export const CRAFTING_SYSTEM_FEATURE: RPGFeatureDefinition = {
  id: "crafting_system",
  name: "Resource Gathering/Crafting System Editor",
  summary: "Define recipes, ingredients, and output rules for crafting loops.",
  status: "alpha",
  capabilities: [
    "Author crafting recipes",
    "Set ingredient requirements",
    "Specify produced items and XP rewards",
  ],
};

export function initCraftingSystem(): RPGFeatureDefinition {
  return CRAFTING_SYSTEM_FEATURE;
}
