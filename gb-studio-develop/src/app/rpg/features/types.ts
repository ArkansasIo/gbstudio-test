export type RPGFeatureStatus = "planned" | "in_progress" | "alpha" | "stable";

export interface RPGFeatureDefinition {
  id: string;
  name: string;
  summary: string;
  status: RPGFeatureStatus;
  capabilities: string[];
}
