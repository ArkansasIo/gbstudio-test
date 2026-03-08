import type { SciFiFeatureDefinition } from "./types";

export const CREW_MANAGEMENT_SYSTEM_FEATURE: SciFiFeatureDefinition = {
  id: "crew_management_system",
  name: "Crew Management System",
  summary: "Manage crew profiles, station assignments, morale events, and skill progression.",
  status: "alpha",
  capabilities: [
    "Create and edit crew member profiles with traits and skills",
    "Assign crew to ship stations and manage shift rotations",
    "Author morale events and crew reaction behaviours",
  ],
};

export function initCrewManagementSystem(): SciFiFeatureDefinition {
  return CREW_MANAGEMENT_SYSTEM_FEATURE;
}
