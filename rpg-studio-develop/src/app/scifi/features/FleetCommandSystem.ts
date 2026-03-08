import type { SciFiFeatureDefinition } from "./types";

export const FLEET_COMMAND_SYSTEM_FEATURE: SciFiFeatureDefinition = {
  id: "fleet_command_system",
  name: "Fleet Command System",
  summary: "Compose multi-ship fleets, assign command roles, and configure tactical formation orders.",
  status: "alpha",
  capabilities: [
    "Assemble named fleets from ship instance pools",
    "Assign flagship, escort, and support command roles",
    "Define formation presets and tactical stance behaviours",
  ],
};

export function initFleetCommandSystem(): SciFiFeatureDefinition {
  return FLEET_COMMAND_SYSTEM_FEATURE;
}
