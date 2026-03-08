/**
 * MAGA (Magic Academy Guild Alliance) – Public API
 *
 * Re-exports everything from the individual MAGA modules so that
 * consumers can import from a single entry point:
 *
 *   import { magaClasses, magaRanks, magaTitles, generateName } from 'app/rpg/data/maga';
 */

export * from './types';
export * from './classes';
export * from './ranks';
export * from './titles';
export * from './stats';
export * from './names';
