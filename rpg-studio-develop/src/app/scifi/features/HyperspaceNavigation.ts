import type { SciFiFeatureDefinition } from "./types";

export const HYPERSPACE_NAVIGATION_FEATURE: SciFiFeatureDefinition = {
  id: "hyperspace_navigation",
  name: "Hyperspace Navigation",
  summary: "Configure FTL jump mechanics, course plotting rules, hazard zones, and emergency drop conditions.",
  status: "alpha",
  capabilities: [
    "Define hyperspace lane routes and jump prerequisites",
    "Set FTL drive charge time, fuel cost, and cooldown rules",
    "Configure hazard zones that force emergency hyperspace drops",
  ],
};

export function initHyperspaceNavigation(): SciFiFeatureDefinition {
  return HYPERSPACE_NAVIGATION_FEATURE;
}
