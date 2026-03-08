import type { SciFiFeatureDefinition } from "./types";

export const MISSION_CONTRACT_SYSTEM_FEATURE: SciFiFeatureDefinition = {
  id: "mission_contract_system",
  name: "Mission & Contract System",
  summary: "Author story missions and repeatable contracts with branching objectives and reward tables.",
  status: "alpha",
  capabilities: [
    "Create multi-stage missions with branching success and failure paths",
    "Define objective markers, completion conditions, and time limits",
    "Configure credit, reputation, and item reward distributions",
  ],
};

export function initMissionContractSystem(): SciFiFeatureDefinition {
  return MISSION_CONTRACT_SYSTEM_FEATURE;
}
