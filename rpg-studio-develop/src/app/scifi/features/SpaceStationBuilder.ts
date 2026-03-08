import type { SciFiFeatureDefinition } from "./types";

export const SPACE_STATION_BUILDER_FEATURE: SciFiFeatureDefinition = {
  id: "space_station_builder",
  name: "Space Station Builder",
  summary: "Assemble modular space stations with docking bays, service facilities, and faction ownership.",
  status: "alpha",
  capabilities: [
    "Drag and drop station modules onto a spatial canvas",
    "Configure docking bay capacity and landing fee rules",
    "Assign faction ownership and service inventory",
  ],
};

export function initSpaceStationBuilder(): SciFiFeatureDefinition {
  return SPACE_STATION_BUILDER_FEATURE;
}
