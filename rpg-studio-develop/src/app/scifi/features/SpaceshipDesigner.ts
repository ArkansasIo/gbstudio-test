import type { SciFiFeatureDefinition } from "./types";

export const SPACESHIP_DESIGNER_FEATURE: SciFiFeatureDefinition = {
  id: "spaceship_designer",
  name: "Spaceship Designer",
  summary: "Design and configure ship hulls, hardpoints, module slots, and base stat profiles.",
  status: "alpha",
  capabilities: [
    "Define hull class geometry and compartments",
    "Assign weapon and module hardpoints",
    "Preview combined ship stats from loadout",
  ],
};

export function initSpaceshipDesigner(): SciFiFeatureDefinition {
  return SPACESHIP_DESIGNER_FEATURE;
}
