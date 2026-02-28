/**
 * Auto-generated Panel Registry
 * Generated: 2026-02-28T03:13:26.912Z
 */

import React from 'react';
import { SaveSlotBrowserPanel } from '../../../components/rpg/generated/save-slot-browser-panel';
import { ProfileSelectorPanel } from '../../../components/rpg/generated/profile-selector-panel';
import { LanguagePickerPanel } from '../../../components/rpg/generated/language-picker-panel';
import { AccessibilityPresetsPanel } from '../../../components/rpg/generated/accessibility-presets-panel';
import { PartyManagerPanel } from '../../../components/rpg/generated/party-manager-panel';
import { InventoryGridPanel } from '../../../components/rpg/generated/inventory-grid-panel';
import { EquipmentInspectorPanel } from '../../../components/rpg/generated/equipment-inspector-panel';
import { SaveSlotManagerPanel } from '../../../components/rpg/generated/save-slot-manager-panel';
import { CheckpointBrowserPanel } from '../../../components/rpg/generated/checkpoint-browser-panel';
import { StatGraphPanel } from '../../../components/rpg/generated/stat-graph-panel';
import { LevelCurveViewerPanel } from '../../../components/rpg/generated/level-curve-viewer-panel';
import { TraitMatrixPanel } from '../../../components/rpg/generated/trait-matrix-panel';
import { EquipmentSlotsPanel } from '../../../components/rpg/generated/equipment-slots-panel';
import { SetBonusPreviewPanel } from '../../../components/rpg/generated/set-bonus-preview-panel';
import { WorldMapPanel } from '../../../components/rpg/generated/world-map-panel';
import { RegionMarkersPanel } from '../../../components/rpg/generated/region-markers-panel';
import { TeleportNodesPanel } from '../../../components/rpg/generated/teleport-nodes-panel';
import { QuestTrackerPanel } from '../../../components/rpg/generated/quest-tracker-panel';
import { ObjectiveTimelinePanel } from '../../../components/rpg/generated/objective-timeline-panel';
import { LoreJournalPanel } from '../../../components/rpg/generated/lore-journal-panel';
import { TurnQueuePanel } from '../../../components/rpg/generated/turn-queue-panel';
import { SkillPalettePanel } from '../../../components/rpg/generated/skill-palette-panel';
import { TargetPreviewPanel } from '../../../components/rpg/generated/target-preview-panel';
import { SummonDeckPanel } from '../../../components/rpg/generated/summon-deck-panel';
import { EscapeProbabilityMeterPanel } from '../../../components/rpg/generated/escape-probability-meter-panel';
import { TextSizeSliderPanel } from '../../../components/rpg/generated/text-size-slider-panel';
import { ContrastProfilesPanel } from '../../../components/rpg/generated/contrast-profiles-panel';
import { ColorblindModesPanel } from '../../../components/rpg/generated/colorblind-modes-panel';
import { DebugConsolePanel } from '../../../components/rpg/generated/debug-console-panel';
import { ProfilerOverlayPanel } from '../../../components/rpg/generated/profiler-overlay-panel';
import { ScriptTraceMonitorPanel } from '../../../components/rpg/generated/script-trace-monitor-panel';
import { CraftingStationEditorPanel } from '../../../components/rpg/generated/crafting-station-editor-panel';
import { ResourceNodeEditorPanel } from '../../../components/rpg/generated/resource-node-editor-panel';
import { HousingLayoutEditorPanel } from '../../../components/rpg/generated/housing-layout-editor-panel';
import { FurniturePlacementGridPanel } from '../../../components/rpg/generated/furniture-placement-grid-panel';
import { ChatChannelManagerPanel } from '../../../components/rpg/generated/chat-channel-manager-panel';
import { PresenceStateEditorPanel } from '../../../components/rpg/generated/presence-state-editor-panel';
import { GuildRankEditorPanel } from '../../../components/rpg/generated/guild-rank-editor-panel';
import { GuildBankAuditorPanel } from '../../../components/rpg/generated/guild-bank-auditor-panel';
import { MatchmakingRuleEditorPanel } from '../../../components/rpg/generated/matchmaking-rule-editor-panel';
import { LfgBoardModeratorPanel } from '../../../components/rpg/generated/lfg-board-moderator-panel';
import { SeasonTrackEditorPanel } from '../../../components/rpg/generated/season-track-editor-panel';
import { RewardClaimDebuggerPanel } from '../../../components/rpg/generated/reward-claim-debugger-panel';
import { EventRotationEditorPanel } from '../../../components/rpg/generated/event-rotation-editor-panel';
import { TelemetryKpiViewerPanel } from '../../../components/rpg/generated/telemetry-kpi-viewer-panel';
import { ServerShardPanelPanel } from '../../../components/rpg/generated/server-shard-panel-panel';
import { MaintenanceModeSwitchPanel } from '../../../components/rpg/generated/maintenance-mode-switch-panel';
import { EconomyAnomalyDetectorPanel } from '../../../components/rpg/generated/economy-anomaly-detector-panel';
import { AntiCheatRuleEditorPanel } from '../../../components/rpg/generated/anti-cheat-rule-editor-panel';

export const PANEL_REGISTRY: Record<string, React.FC<any>> = {
  'save-slot-browser': SaveSlotBrowserPanel,
  'profile-selector': ProfileSelectorPanel,
  'language-picker': LanguagePickerPanel,
  'accessibility-presets': AccessibilityPresetsPanel,
  'party-manager': PartyManagerPanel,
  'inventory-grid': InventoryGridPanel,
  'equipment-inspector': EquipmentInspectorPanel,
  'save-slot-manager': SaveSlotManagerPanel,
  'checkpoint-browser': CheckpointBrowserPanel,
  'stat-graph': StatGraphPanel,
  'level-curve-viewer': LevelCurveViewerPanel,
  'trait-matrix': TraitMatrixPanel,
  'equipment-slots': EquipmentSlotsPanel,
  'set-bonus-preview': SetBonusPreviewPanel,
  'world-map-tool': WorldMapPanel,
  'region-markers': RegionMarkersPanel,
  'teleport-nodes': TeleportNodesPanel,
  'quest-tracker-tool': QuestTrackerPanel,
  'objective-timeline': ObjectiveTimelinePanel,
  'lore-journal': LoreJournalPanel,
  'turn-queue': TurnQueuePanel,
  'skill-palette': SkillPalettePanel,
  'target-preview': TargetPreviewPanel,
  'summon-deck': SummonDeckPanel,
  'escape-meter': EscapeProbabilityMeterPanel,
  'text-size-slider': TextSizeSliderPanel,
  'contrast-profiles': ContrastProfilesPanel,
  'colorblind-modes': ColorblindModesPanel,
  'debug-console': DebugConsolePanel,
  'profiler-overlay': ProfilerOverlayPanel,
  'script-trace-monitor': ScriptTraceMonitorPanel,
  'crafting-station-editor': CraftingStationEditorPanel,
  'resource-node-editor': ResourceNodeEditorPanel,
  'housing-layout-editor': HousingLayoutEditorPanel,
  'furniture-placement-grid': FurniturePlacementGridPanel,
  'chat-channel-manager': ChatChannelManagerPanel,
  'presence-state-editor': PresenceStateEditorPanel,
  'guild-rank-editor': GuildRankEditorPanel,
  'guild-bank-auditor': GuildBankAuditorPanel,
  'matchmaking-rule-editor': MatchmakingRuleEditorPanel,
  'lfg-board-moderator': LfgBoardModeratorPanel,
  'season-track-editor': SeasonTrackEditorPanel,
  'reward-claim-debugger': RewardClaimDebuggerPanel,
  'event-rotation-editor': EventRotationEditorPanel,
  'telemetry-kpi-viewer': TelemetryKpiViewerPanel,
  'server-shard-panel': ServerShardPanelPanel,
  'maintenance-mode-switch': MaintenanceModeSwitchPanel,
  'economy-anomaly-detector': EconomyAnomalyDetectorPanel,
  'anti-cheat-rule-editor': AntiCheatRuleEditorPanel,
};

export const getPanelComponent = (panelId: string): React.FC<any> | null => {
  return PANEL_REGISTRY[panelId] || null;
};
