import type { RPGFeatureDefinition } from "./types";

export const CHARACTER_DATABASE_FEATURE: RPGFeatureDefinition = {
  id: "character_database",
  name: "Character/Enemy Database Editor",
  summary: "Maintain reusable actor and enemy records with stats and metadata.",
  status: "alpha",
  capabilities: [
    "Create character and enemy entries",
    "Validate stat blocks and roles",
    "Tag entities for encounter usage",
  ],
};

export function initCharacterDatabase(): RPGFeatureDefinition {
  return CHARACTER_DATABASE_FEATURE;
}
