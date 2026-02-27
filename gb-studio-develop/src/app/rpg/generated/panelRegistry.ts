/**
 * Auto-generated Panel Registry
 * Generated: 2026-02-27T23:35:00.000Z
 */

import React from 'react';
import { EquipmentInspectorPanel } from '../../../components/rpg/generated/equipment-inspector-panel';
import { SkillPalettePanel } from '../../../components/rpg/generated/skill-palette-panel';
import { PartyManagerPanel } from '../../../components/rpg/generated/party-manager-panel';

export const PANEL_REGISTRY: Record<string, React.FC<any>> = {
  'equipment-inspector': EquipmentInspectorPanel,
  'skill-palette': SkillPalettePanel,
  'party-manager': PartyManagerPanel,
};

export const getPanelComponent = (panelId: string): React.FC<any> | null => {
  return PANEL_REGISTRY[panelId] || null;
};