/**
 * RPG State Context for sharing state across components
 */

import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { createInitialRPGState, rpgGameReducer, type RPGGameState, type RPGAction } from '../generated';
import { createInitialGameData } from '../data/initialGameData';

interface RPGStateContextValue {
  rpgState: RPGGameState;
  dispatchRPG: React.Dispatch<RPGAction>;
}

const RPGStateContext = createContext<RPGStateContextValue | null>(null);

export const useRPGState = () => {
  const context = useContext(RPGStateContext);
  if (!context) {
    throw new Error('useRPGState must be used within RPGStateProvider');
  }
  return context;
};

interface RPGStateProviderProps {
  children: ReactNode;
}

export const RPGStateProvider: React.FC<RPGStateProviderProps> = ({ children }) => {
  const [rpgState, dispatchRPG] = useReducer(
    rpgGameReducer,
    null,
    () => {
      const initialState = createInitialRPGState();
      const gameData = createInitialGameData();
      return { ...initialState, ...gameData };
    }
  );

  // Auto-save to localStorage every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem('rpg-autosave', JSON.stringify(rpgState));
        console.log('[RPG] Auto-saved game state');
      } catch (error) {
        console.error('[RPG] Failed to auto-save:', error);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [rpgState]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rpg-autosave');
      if (saved) {
        const loadedState = JSON.parse(saved);
        // Merge loaded state with current state
        Object.keys(loadedState).forEach(key => {
          if (key !== 'panelState') { // Don't restore panel state
            (rpgState as any)[key] = loadedState[key];
          }
        });
        console.log('[RPG] Loaded auto-saved game state');
      }
    } catch (error) {
      console.error('[RPG] Failed to load auto-save:', error);
    }
  }, []);

  return (
    <RPGStateContext.Provider value={{ rpgState, dispatchRPG }}>
      {children}
    </RPGStateContext.Provider>
  );
};
