/**
 * RPG Workbench Auto-Implementation Generator
 * 
 * This script generates all the necessary files, types, components, and logic
 * for the complete RPG Workbench implementation.
 * 
 * Run with: ts-node scripts/generateRpgWorkbenchImplementation.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { RPG_MENU_TREE } from '../src/app/rpg/input/menuTree';

// ============================================================================
// CONFIGURATION
// ============================================================================

const OUTPUT_DIR = path.join(__dirname, '../src/app/rpg/generated');
const COMPONENTS_DIR = path.join(__dirname, '../src/components/rpg/generated');

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function toPascalCase(str: string): string {
  return str
    .split(/[\s-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/[\s_]+/g, '-');
}

// ============================================================================
// TYPE GENERATION
// ============================================================================

function generateDataTypes() {
  const content = `/**
 * Auto-generated RPG Data Types
 * Generated: ${new Date().toISOString()}
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

`;

  const outputPath = path.join(OUTPUT_DIR, 'types.ts');
  ensureDir(OUTPUT_DIR);
  fs.writeFileSync(outputPath, content);
  console.log(`✓ Generated types: ${outputPath}`);
}

// ============================================================================
// STATE MANAGEMENT GENERATION
// ============================================================================

function generateStateManagement() {
  const content = `/**
 * Auto-generated RPG State Management
 * Generated: ${new Date().toISOString()}
 */

import type {
  Character,
  Inventory,
  Quest,
  BattleState,
  GameSaveData,
  RPGAction,
  PanelState,
} from './types';

// ============================================================================
// INITIAL STATE
// ============================================================================

export interface RPGGameState {
  // Core game data
  characters: Character[];
  activeParty: string[];
  reserves: string[];
  inventory: Inventory;
  quests: Quest[];
  
  // Battle state
  battleState: BattleState | null;
  
  // UI state
  panelState: PanelState;
  
  // World state
  currentMap: string;
  playerPosition: { x: number; y: number };
  
  // Flags and variables
  flags: Record<string, boolean>;
  variables: Record<string, number>;
  
  // Meta
  playtime: number;
  saveSlots: number[];
}

export const createInitialRPGState = (): RPGGameState => ({
  characters: [],
  activeParty: [],
  reserves: [],
  inventory: {
    items: [],
    capacity: 100,
    gold: 0,
  },
  quests: [],
  battleState: null,
  panelState: {
    activePanel: null,
    panelData: {},
  },
  currentMap: 'start_map',
  playerPosition: { x: 0, y: 0 },
  flags: {},
  variables: {},
  playtime: 0,
  saveSlots: [],
});

// ============================================================================
// REDUCER
// ============================================================================

export function rpgGameReducer(
  state: RPGGameState,
  action: RPGAction
): RPGGameState {
  switch (action.type) {
    case 'OPEN_PANEL':
      return {
        ...state,
        panelState: {
          activePanel: action.payload.panelId,
          panelData: {
            ...state.panelState.panelData,
            [action.payload.panelId]: action.payload.data || {},
          },
        },
      };

    case 'CLOSE_PANEL':
      return {
        ...state,
        panelState: {
          ...state.panelState,
          activePanel: null,
        },
      };

    case 'ADD_CHARACTER':
      return {
        ...state,
        characters: [...state.characters, action.payload],
      };

    case 'REMOVE_CHARACTER':
      return {
        ...state,
        characters: state.characters.filter(c => c.id !== action.payload),
        activeParty: state.activeParty.filter(id => id !== action.payload),
        reserves: state.reserves.filter(id => id !== action.payload),
      };

    case 'UPDATE_CHARACTER':
      return {
        ...state,
        characters: state.characters.map(c =>
          c.id === action.payload.id
            ? { ...c, ...action.payload.updates }
            : c
        ),
      };

    case 'ADD_TO_PARTY':
      if (state.activeParty.length >= 4) {
        return state; // Party full
      }
      return {
        ...state,
        activeParty: [...state.activeParty, action.payload],
        reserves: state.reserves.filter(id => id !== action.payload),
      };

    case 'REMOVE_FROM_PARTY':
      return {
        ...state,
        activeParty: state.activeParty.filter(id => id !== action.payload),
        reserves: [...state.reserves, action.payload],
      };

    case 'ADD_ITEM':
      const existingItem = state.inventory.items.find(
        i => i.itemId === action.payload.itemId
      );
      
      if (existingItem) {
        return {
          ...state,
          inventory: {
            ...state.inventory,
            items: state.inventory.items.map(i =>
              i.itemId === action.payload.itemId
                ? { ...i, quantity: i.quantity + action.payload.quantity }
                : i
            ),
          },
        };
      }
      
      return {
        ...state,
        inventory: {
          ...state.inventory,
          items: [
            ...state.inventory.items,
            {
              itemId: action.payload.itemId,
              quantity: action.payload.quantity,
            },
          ],
        },
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        inventory: {
          ...state.inventory,
          items: state.inventory.items
            .map(i =>
              i.itemId === action.payload.itemId
                ? { ...i, quantity: i.quantity - action.payload.quantity }
                : i
            )
            .filter(i => i.quantity > 0),
        },
      };

    case 'START_QUEST':
      return {
        ...state,
        quests: state.quests.map(q =>
          q.id === action.payload ? { ...q, status: 'active' as const } : q
        ),
      };

    case 'COMPLETE_QUEST':
      return {
        ...state,
        quests: state.quests.map(q =>
          q.id === action.payload ? { ...q, status: 'completed' as const } : q
        ),
      };

    case 'START_BATTLE':
      return {
        ...state,
        battleState: {
          active: true,
          turn: 1,
          phase: 'player',
          playerParty: state.activeParty.map((charId, index) => {
            const char = state.characters.find(c => c.id === charId)!;
            return {
              characterId: charId,
              currentHp: char.stats.hp,
              currentMp: char.stats.mp,
              statusEffects: [],
              position: index,
            };
          }),
          enemies: action.payload.enemies,
          turnQueue: [],
        },
      };

    case 'END_BATTLE':
      return {
        ...state,
        battleState: null,
      };

    default:
      return state;
  }
}

// ============================================================================
// SELECTORS
// ============================================================================

export const selectActivePartyCharacters = (state: RPGGameState): Character[] =>
  state.activeParty
    .map(id => state.characters.find(c => c.id === id))
    .filter((c): c is Character => c !== undefined);

export const selectReserveCharacters = (state: RPGGameState): Character[] =>
  state.reserves
    .map(id => state.characters.find(c => c.id === id))
    .filter((c): c is Character => c !== undefined);

export const selectActiveQuests = (state: RPGGameState): Quest[] =>
  state.quests.filter(q => q.status === 'active');

export const selectCompletedQuests = (state: RPGGameState): Quest[] =>
  state.quests.filter(q => q.status === 'completed');

export const selectInventoryItems = (state: RPGGameState) =>
  state.inventory.items;

export const selectGold = (state: RPGGameState) =>
  state.inventory.gold;

export const selectIsInBattle = (state: RPGGameState) =>
  state.battleState !== null && state.battleState.active;

`;

  const outputPath = path.join(OUTPUT_DIR, 'state.ts');
  fs.writeFileSync(outputPath, content);
  console.log(`✓ Generated state management: ${outputPath}`);
}

// ============================================================================
// COMPONENT GENERATION
// ============================================================================

function generateToolComponent(tool: any) {
  const componentName = toPascalCase(tool.label);
  const fileName = toKebabCase(tool.label);
  
  const content = `/**
 * Auto-generated ${tool.label} Component
 * Generated: ${new Date().toISOString()}
 * 
 * Description: ${tool.description}
 * Category: ${tool.category}
 */

import React, { useState } from 'react';

export interface ${componentName}Props {
  onClose?: () => void;
}

export const ${componentName}Panel: React.FC<${componentName}Props> = ({ onClose }) => {
  const [data, setData] = useState<any>(null);

  return (
    <div
      style={{
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: 8,
        padding: 16,
        minWidth: 400,
        minHeight: 300,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: '1px solid #334155',
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 'bold' }}>
          ${tool.label}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              padding: '4px 12px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        )}
      </div>

      <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>
        ${tool.description}
      </div>

      <div style={{ color: '#e2e8f0' }}>
        {/* TODO: Implement ${tool.label} functionality */}
        <p>This is a placeholder for the ${tool.label} tool.</p>
        <p>Category: ${tool.category}</p>
        
        {/* Add your implementation here */}
      </div>
    </div>
  );
};

export default ${componentName}Panel;
`;

  const outputPath = path.join(COMPONENTS_DIR, `${fileName}-panel.tsx`);
  ensureDir(COMPONENTS_DIR);
  fs.writeFileSync(outputPath, content);
  return { componentName, fileName };
}

// ============================================================================
// ACTION HANDLER GENERATION
// ============================================================================

function generateActionHandlers() {
  const handlers: string[] = [];
  
  RPG_MENU_TREE.forEach(menu => {
    menu.subMenus.forEach(subMenu => {
      subMenu.actions.forEach(action => {
        const functionName = action.functionName.match(/^([A-Za-z_]\w*)/)?.[1] || action.id;
        const handlerName = toCamelCase(functionName);
        
        handlers.push(`
export const ${handlerName} = (
  state: RPGGameState,
  ...args: any[]
): RPGGameState => {
  console.log('[RPG ACTION] ${functionName}', args);
  
  // TODO: Implement ${action.label} logic
  
  return {
    ...state,
    panelState: {
      activePanel: '${action.id}',
      panelData: {
        ...state.panelState.panelData,
        ['${action.id}']: { timestamp: Date.now() },
      },
    },
  };
};
`);
      });
    });
  });

  const content = `/**
 * Auto-generated RPG Action Handlers
 * Generated: ${new Date().toISOString()}
 */

import type { RPGGameState } from './state';

${handlers.join('\n')}

// Export all handlers
export const actionHandlers = {
${handlers.map(h => {
  const match = h.match(/export const (\w+)/);
  return match ? `  ${match[1]},` : '';
}).filter(Boolean).join('\n')}
};
`;

  const outputPath = path.join(OUTPUT_DIR, 'actionHandlers.ts');
  fs.writeFileSync(outputPath, content);
  console.log(`✓ Generated ${handlers.length} action handlers: ${outputPath}`);
}

// ============================================================================
// PANEL REGISTRY GENERATION
// ============================================================================

function generatePanelRegistry(components: Array<{ componentName: string; fileName: string; tool: any }>) {
  const imports = components.map(c => 
    `import { ${c.componentName}Panel } from '../components/rpg/generated/${c.fileName}-panel';`
  ).join('\n');

  const registry = components.map(c => 
    `  '${c.tool.id}': ${c.componentName}Panel,`
  ).join('\n');

  const content = `/**
 * Auto-generated Panel Registry
 * Generated: ${new Date().toISOString()}
 */

import React from 'react';
${imports}

export const PANEL_REGISTRY: Record<string, React.FC<any>> = {
${registry}
};

export const getPanelComponent = (panelId: string): React.FC<any> | null => {
  return PANEL_REGISTRY[panelId] || null;
};
`;

  const outputPath = path.join(OUTPUT_DIR, 'panelRegistry.ts');
  fs.writeFileSync(outputPath, content);
  console.log(`✓ Generated panel registry: ${outputPath}`);
}

// ============================================================================
// MAIN GENERATION FUNCTION
// ============================================================================

async function generateAll() {
  console.log('🚀 Starting RPG Workbench Implementation Generation...\n');

  // Step 1: Generate types
  console.log('📝 Generating types...');
  generateDataTypes();

  // Step 2: Generate state management
  console.log('📝 Generating state management...');
  generateStateManagement();

  // Step 3: Generate action handlers
  console.log('📝 Generating action handlers...');
  generateActionHandlers();

  // Step 4: Generate components for all tools
  console.log('📝 Generating tool components...');
  const components: Array<{ componentName: string; fileName: string; tool: any }> = [];
  
  RPG_MENU_TREE.forEach(menu => {
    menu.subMenus.forEach(subMenu => {
      subMenu.tools.forEach(tool => {
        const result = generateToolComponent(tool);
        components.push({ ...result, tool });
      });
    });
  });

  console.log(`✓ Generated ${components.length} tool components`);

  // Step 5: Generate panel registry
  console.log('📝 Generating panel registry...');
  generatePanelRegistry(components);

  // Step 6: Generate index file
  const indexContent = `/**
 * Auto-generated RPG Workbench Implementation
 * Generated: ${new Date().toISOString()}
 */

export * from './types';
export * from './state';
export * from './actionHandlers';
export * from './panelRegistry';
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);

  console.log('\n✅ Generation complete!');
  console.log(`\nGenerated files:`);
  console.log(`  - ${OUTPUT_DIR}/types.ts`);
  console.log(`  - ${OUTPUT_DIR}/state.ts`);
  console.log(`  - ${OUTPUT_DIR}/actionHandlers.ts`);
  console.log(`  - ${OUTPUT_DIR}/panelRegistry.ts`);
  console.log(`  - ${OUTPUT_DIR}/index.ts`);
  console.log(`  - ${components.length} component files in ${COMPONENTS_DIR}`);
  console.log(`\nTotal: ${components.length + 5} files generated`);
}

// ============================================================================
// RUN
// ============================================================================

generateAll().catch(console.error);
