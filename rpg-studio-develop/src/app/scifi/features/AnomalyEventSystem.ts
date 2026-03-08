import type { SciFiFeatureDefinition } from "./types";

export const ANOMALY_EVENT_SYSTEM_FEATURE: SciFiFeatureDefinition = {
  id: "anomaly_event_system",
  name: "Anomaly Event System",
  summary: "Create stellar anomalies and dynamic space events that alter navigation and gameplay conditions.",
  status: "planned",
  capabilities: [
    "Define anomaly types such as black holes, pulsars, and wormholes",
    "Configure event trigger conditions and sector-wide effects",
    "Set anomaly lifespan, decay, and player interaction hooks",
  ],
};

export function initAnomalyEventSystem(): SciFiFeatureDefinition {
  return ANOMALY_EVENT_SYSTEM_FEATURE;
}
