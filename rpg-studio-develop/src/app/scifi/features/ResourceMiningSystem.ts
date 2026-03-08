import type { SciFiFeatureDefinition } from "./types";

export const RESOURCE_MINING_SYSTEM_FEATURE: SciFiFeatureDefinition = {
  id: "resource_mining_system",
  name: "Resource Mining System",
  summary: "Configure asteroid and planetary mining with drones, yield tables, and depletion cycles.",
  status: "alpha",
  capabilities: [
    "Define resource nodes with ore types and yield distributions",
    "Configure drone dispatch, travel time, and capacity limits",
    "Set node depletion rates and regeneration timers",
  ],
};

export function initResourceMiningSystem(): SciFiFeatureDefinition {
  return RESOURCE_MINING_SYSTEM_FEATURE;
}
