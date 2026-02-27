/**
 * RPG Game Maker UI with Context Provider
 * Wraps the main UI with RPG state context
 */

import React from 'react';
import { RPGStateProvider } from 'app/rpg/context/RPGStateContext';
import RPGGameMakerUILayout from './RPGGameMakerUILayout';

export const RPGGameMakerWithContext: React.FC = () => {
  return (
    <RPGStateProvider>
      <RPGGameMakerUILayout />
    </RPGStateProvider>
  );
};

export default RPGGameMakerWithContext;
