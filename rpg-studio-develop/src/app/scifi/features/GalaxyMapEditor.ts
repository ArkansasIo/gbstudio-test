import type { SciFiFeatureDefinition } from "./types";

export const GALAXY_MAP_EDITOR_FEATURE: SciFiFeatureDefinition = {
  id: "galaxy_map_editor",
  name: "Galaxy Map Editor",
  summary: "Create and edit the galaxy by placing star systems, sectors, anomalies, and trade lanes.",
  status: "alpha",
  capabilities: [
    "Place and name star systems on a galactic canvas",
    "Define sector boundaries and faction territories",
    "Configure hyperspace routes and travel restrictions",
  ],
};

export function initGalaxyMapEditor(): SciFiFeatureDefinition {
  return GALAXY_MAP_EDITOR_FEATURE;
}
