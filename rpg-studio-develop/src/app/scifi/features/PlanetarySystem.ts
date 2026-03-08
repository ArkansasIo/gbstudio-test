import type { SciFiFeatureDefinition } from "./types";

export const PLANETARY_SYSTEM_FEATURE: SciFiFeatureDefinition = {
  id: "planetary_system",
  name: "Planetary System",
  summary: "Build star systems with planetary bodies, moons, orbital mechanics, and surface data.",
  status: "alpha",
  capabilities: [
    "Place stars, planets, moons, and asteroid belts in orbital layout",
    "Define planetary surface biomes, resources, and settlements",
    "Configure atmospheric and gravity parameters for landing rules",
  ],
};

export function initPlanetarySystem(): SciFiFeatureDefinition {
  return PLANETARY_SYSTEM_FEATURE;
}
