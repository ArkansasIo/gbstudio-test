/**
 * Battle System Utilities
 */

import type { Character, BattleActor, BattleAction, Skill } from '../generated/types';
import { skillsById } from '../data/sampleSkills';

export const calculateDamage = (
  attacker: Character,
  defender: Character,
  skill: Skill
): number => {
  const baseDamage = skill.type === 'magical' 
    ? attacker.stats.magicAttack 
    : attacker.stats.attack;
  
  const defense = skill.type === 'magical'
    ? defender.stats.magicDefense
    : defender.stats.defense;
  
  const skillPower = skill.power / 100;
  const damage = Math.max(1, Math.floor((baseDamage * skillPower) - (defense * 0.5)));
  
  // Add random variance (±10%)
  const variance = 0.9 + Math.random() * 0.2;
  return Math.floor(damage * variance);
};

export const calculateHitChance = (
  attacker: Character,
  defender: Character,
  skill: Skill
): boolean => {
  const baseAccuracy = skill.accuracy;
  const attackerSpeed = attacker.stats.speed;
  const defenderSpeed = defender.stats.speed;
  
  const speedModifier = (attackerSpeed - defenderSpeed) * 0.5;
  const finalAccuracy = Math.min(100, Math.max(0, baseAccuracy + speedModifier));
  
  return Math.random() * 100 < finalAccuracy;
};

export const calculateCriticalHit = (attacker: Character): boolean => {
  const critChance = attacker.stats.luck * 0.5; // 0.5% per luck point
  return Math.random() * 100 < critChance;
};

export const calculateTurnOrder = (actors: BattleActor[], characters: Character[]): string[] => {
  const actorsWithSpeed = actors.map(actor => {
    const character = characters.find(c => c.id === actor.characterId);
    return {
      id: actor.characterId,
      speed: character?.stats.speed || 0,
    };
  });
  
  // Sort by speed (descending)
  actorsWithSpeed.sort((a, b) => b.speed - a.speed);
  
  return actorsWithSpeed.map(a => a.id);
};

export const canUseSkill = (character: Character, skillId: string): boolean => {
  const skill = skillsById[skillId];
  if (!skill) return false;
  
  return character.stats.mp >= skill.mpCost;
};

export const applySkillEffect = (
  action: BattleAction,
  attacker: Character,
  target: Character
): { damage: number; critical: boolean; hit: boolean } => {
  const skill = skillsById[action.skillId || ''];
  if (!skill) {
    return { damage: 0, critical: false, hit: false };
  }
  
  const hit = calculateHitChance(attacker, target, skill);
  if (!hit) {
    return { damage: 0, critical: false, hit: false };
  }
  
  const critical = calculateCriticalHit(attacker);
  let damage = calculateDamage(attacker, target, skill);
  
  if (critical) {
    damage = Math.floor(damage * 1.5);
  }
  
  return { damage, critical, hit: true };
};

export const calculateExperienceGain = (
  characterLevel: number,
  enemyLevel: number,
  baseExp: number
): number => {
  const levelDiff = enemyLevel - characterLevel;
  const multiplier = 1 + (levelDiff * 0.1);
  return Math.max(1, Math.floor(baseExp * multiplier));
};

export const calculateLevelUp = (currentExp: number, currentLevel: number): boolean => {
  const expNeeded = currentLevel * 100 + Math.pow(currentLevel, 2) * 50;
  return currentExp >= expNeeded;
};
