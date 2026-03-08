export type SciFiFeatureStatus = "planned" | "in_progress" | "alpha" | "stable";

export interface SciFiFeatureDefinition {
  id: string;
  name: string;
  summary: string;
  status: SciFiFeatureStatus;
  capabilities: string[];
}
