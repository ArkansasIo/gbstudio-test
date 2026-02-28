/**
 * Auto-generated RPG Data Types
 * Generated: 2026-02-28T03:13:26.891Z
 */

// ============================================================================
// CORE TYPES
// ============================================================================

export interface Position {
  x: number;
  y: number;
  mapId: string;
}

export interface Stats {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  attack: number;
  defense: number;
  magicAttack: number;
  magicDefense: number;
  speed: number;
  luck: number;
}

export interface Character {
  id: string;
  name: string;
  level: number;
  experience: number;
  stats: Stats;
  equipmentSlots: EquipmentSlot[];
  skills: string[];
  statusEffects: StatusEffect[];
  portrait?: string;
  class: string;
}

export interface EquipmentSlot {
  id: string;
  type: 'weapon' | 'armor' | 'accessory' | 'helmet' | 'shield';
  itemId: string | null;
}

export interface StatusEffect {
  id: string;
  name: string;
  duration: number;
  type: 'buff' | 'debuff' | 'neutral';
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: 'consumable' | 'equipment' | 'key' | 'material';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  stackable: boolean;
  maxStack: number;
  value: number;
  icon?: string;
}

export interface InventoryItem {
  itemId: string;
  quantity: number;
}

export interface Inventory {
  items: InventoryItem[];
  capacity: number;
  gold: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  objectives: QuestObjective[];
  status: 'available' | 'active' | 'completed' | 'failed';
  rewards: QuestReward[];
  level: number;
}

export interface QuestObjective {
  id: string;
  description: string;
  type: 'kill' | 'collect' | 'talk' | 'explore' | 'escort';
  target: string;
  current: number;
  required: number;
  completed: boolean;
}

export interface QuestReward {
  type: 'experience' | 'gold' | 'item';
  value: number;
  itemId?: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  type: 'physical' | 'magical' | 'support';
  mpCost: number;
  power: number;
  accuracy: number;
  targetType: 'single' | 'all' | 'self' | 'ally';
  element?: string;
  statusEffect?: string;
}

export interface BattleState {
  active: boolean;
  turn: number;
  phase: 'player' | 'enemy' | 'victory' | 'defeat';
  playerParty: BattleActor[];
  enemies: BattleActor[];
  turnQueue: string[];
  selectedAction?: BattleAction;
}

export interface BattleActor {
  characterId: string;
  currentHp: number;
  currentMp: number;
  statusEffects: StatusEffect[];
  position: number;
}

export interface BattleAction {
  type: 'attack' | 'skill' | 'item' | 'guard' | 'escape';
  actorId: string;
  targetId?: string;
  skillId?: string;
  itemId?: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: string;
  materials: { itemId: string; quantity: number }[];
  result: { itemId: string; quantity: number };
  stationRequired: string;
  level: number;
}

export interface CraftingStation {
  id: string;
  name: string;
  type: string;
  level: number;
  recipes: string[];
}

export interface SaveSlot {
  id: number;
  timestamp: number;
  playtime: number;
  location: string;
  level: number;
  data: GameSaveData;
}

export interface GameSaveData {
  version: string;
  characters: Character[];
  activeParty: string[];
  inventory: Inventory;
  quests: Quest[];
  position: Position;
  flags: Record<string, boolean>;
  variables: Record<string, number>;
}

// ============================================================================
// PANEL STATE TYPES
// ============================================================================

export interface PanelState {
  activePanel: string | null;
  panelData: Record<string, any>;
}

export interface PartyManagerState {
  party: Character[];
  reserves: Character[];
  selectedCharacterId: string | null;
}

export interface InventoryState {
  inventory: Inventory;
  selectedItemId: string | null;
  filter: string;
  sortBy: 'name' | 'type' | 'rarity' | 'value';
}

export interface QuestTrackerState {
  quests: Quest[];
  activeQuestId: string | null;
  filter: 'all' | 'active' | 'completed';
}

export interface BattleUIState {
  battleState: BattleState;
  selectedActorId: string | null;
  selectedTargetId: string | null;
  commandMenuOpen: boolean;
}

export interface WorldMapState {
  currentRegion: string;
  unlockedNodes: string[];
  selectedNodeId: string | null;
}

export interface CraftingState {
  station: CraftingStation | null;
  recipes: Recipe[];
  selectedRecipeId: string | null;
  materials: InventoryItem[];
}

// ============================================================================
// ACTION TYPES
// ============================================================================

export type RPGAction =
  | { type: 'OPEN_PANEL'; payload: { panelId: string; data?: any } }
  | { type: 'CLOSE_PANEL' }
  | { type: 'UPDATE_PANEL_DATA'; payload: { panelId: string; data: any } }
  | { type: 'ADD_CHARACTER'; payload: Character }
  | { type: 'REMOVE_CHARACTER'; payload: string }
  | { type: 'UPDATE_CHARACTER'; payload: { id: string; updates: Partial<Character> } }
  | { type: 'ADD_TO_PARTY'; payload: string }
  | { type: 'REMOVE_FROM_PARTY'; payload: string }
  | { type: 'ADD_ITEM'; payload: { itemId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string; quantity: number } }
  | { type: 'EQUIP_ITEM'; payload: { characterId: string; slotId: string; itemId: string } }
  | { type: 'UNEQUIP_ITEM'; payload: { characterId: string; slotId: string } }
  | { type: 'START_QUEST'; payload: string }
  | { type: 'COMPLETE_QUEST'; payload: string }
  | { type: 'UPDATE_QUEST_OBJECTIVE'; payload: { questId: string; objectiveId: string; progress: number } }
  | { type: 'START_BATTLE'; payload: { enemies: BattleActor[] } }
  | { type: 'END_BATTLE'; payload: { victory: boolean } }
  | { type: 'BATTLE_ACTION'; payload: BattleAction }
  | { type: 'CRAFT_ITEM'; payload: string }
  | { type: 'SAVE_GAME'; payload: number }
  | { type: 'LOAD_GAME'; payload: number };

