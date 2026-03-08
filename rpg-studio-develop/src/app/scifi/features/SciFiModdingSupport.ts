import type { SciFiFeatureDefinition } from "./types";

export const SCIFI_MODDING_SUPPORT_FEATURE: SciFiFeatureDefinition = {
  id: "scifi_modding_support",
  name: "SciFi Modding Support",
  summary: "Expose engine hooks, data overrides, and mod packaging tools for community content creators.",
  status: "planned",
  capabilities: [
    "Register custom ship, weapon, and species mod packages",
    "Expose hook points for scripted engine overrides",
    "Package and validate mod archives with manifest verification",
  ],
};

export function initSciFiModdingSupport(): SciFiFeatureDefinition {
  return SCIFI_MODDING_SUPPORT_FEATURE;
}
