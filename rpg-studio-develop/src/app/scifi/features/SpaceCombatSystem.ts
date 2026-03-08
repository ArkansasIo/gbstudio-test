import type { SciFiFeatureDefinition } from "./types";

export const SPACE_COMBAT_SYSTEM_FEATURE: SciFiFeatureDefinition = {
  id: "space_combat_system",
  name: "Space Combat System",
  summary: "Design combat encounter rules, fleet engagement logic, and weapon resolution pipelines.",
  status: "alpha",
  capabilities: [
    "Configure combat encounter parameters and fleet compositions",
    "Tune weapon firing sequences and damage resolution order",
    "Define victory, retreat, and destruction outcome conditions",
  ],
};

export function initSpaceCombatSystem(): SciFiFeatureDefinition {
  return SPACE_COMBAT_SYSTEM_FEATURE;
}
