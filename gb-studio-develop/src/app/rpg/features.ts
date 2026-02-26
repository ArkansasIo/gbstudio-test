import { initAchievementSystem } from "./features/AchievementSystem";
import { initAnimationEditor } from "./features/AnimationEditor";
import { initBattleSystemDesigner } from "./features/BattleSystemDesigner";
import { initCharacterDatabase } from "./features/CharacterDatabase";
import { initCraftingSystem } from "./features/CraftingSystem";
import { initCutsceneDialogueEditor } from "./features/CutsceneDialogueEditor";
import { initEnemyAIEditor } from "./features/EnemyAIEditor";
import { initHUDOverlayEditor } from "./features/HUDOverlayEditor";
import { initImportExportTool } from "./features/ImportExportTool";
import { initItemInventorySystem } from "./features/ItemInventorySystem";
import { initLocalizationManager } from "./features/LocalizationManager";
import { initMapLinkingTool } from "./features/MapLinkingTool";
import { initMinigameEditor } from "./features/MinigameEditor";
import { initModdingSupport } from "./features/ModdingSupport";
import { initPluginScriptManager } from "./features/PluginScriptManager";
import { initQuestSystem } from "./features/QuestSystem";
import { initSaveLoadManager } from "./features/SaveLoadManager";
import { initSkillAbilityEditor } from "./features/SkillAbilityEditor";
import { initSoundMusicManager } from "./features/SoundMusicManager";
import { initTilemapEditor } from "./features/TilemapEditor";
import { initVisualEventEditor } from "./features/VisualEventEditor";
import { initVisualScriptDebugger } from "./features/VisualScriptDebugger";
import type { RPGFeatureDefinition } from "./features/types";

export const RPG_FEATURE_DEFINITIONS: RPGFeatureDefinition[] = [
  initVisualEventEditor(),
  initTilemapEditor(),
  initCharacterDatabase(),
  initItemInventorySystem(),
  initQuestSystem(),
  initSkillAbilityEditor(),
  initBattleSystemDesigner(),
  initCutsceneDialogueEditor(),
  initAnimationEditor(),
  initMapLinkingTool(),
  initSaveLoadManager(),
  initPluginScriptManager(),
  initVisualScriptDebugger(),
  initHUDOverlayEditor(),
  initEnemyAIEditor(),
  initSoundMusicManager(),
  initAchievementSystem(),
  initCraftingSystem(),
  initMinigameEditor(),
  initImportExportTool(),
  initLocalizationManager(),
  initModdingSupport(),
];

// Backward-compatible name-only export used by current startup logging.
export const RPG_FEATURES = RPG_FEATURE_DEFINITIONS.map((feature) => feature.name);
