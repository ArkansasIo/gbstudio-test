/**
 * Auto-generated RPG State Management
 * Generated: 2026-02-28T03:13:26.893Z
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

