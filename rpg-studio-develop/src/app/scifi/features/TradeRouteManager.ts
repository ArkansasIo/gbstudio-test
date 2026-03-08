import type { SciFiFeatureDefinition } from "./types";

export const TRADE_ROUTE_MANAGER_FEATURE: SciFiFeatureDefinition = {
  id: "trade_route_manager",
  name: "Trade Route Manager",
  summary: "Design trade routes between stations with commodity flows, profit margins, and hazard ratings.",
  status: "alpha",
  capabilities: [
    "Map station-to-station trade corridors on the galaxy canvas",
    "Define commodity supply and demand profiles per station",
    "Simulate profit margins and update market prices dynamically",
  ],
};

export function initTradeRouteManager(): SciFiFeatureDefinition {
  return TRADE_ROUTE_MANAGER_FEATURE;
}
