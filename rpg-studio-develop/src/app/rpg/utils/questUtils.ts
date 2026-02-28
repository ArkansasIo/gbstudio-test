/**
 * Quest System Utilities
 */

import type { Quest, QuestObjective } from '../generated/types';

export const updateQuestProgress = (
  quest: Quest,
  objectiveId: string,
  progress: number
): Quest => {
  return {
    ...quest,
    objectives: quest.objectives.map(obj =>
      obj.id === objectiveId
        ? {
            ...obj,
            current: Math.min(obj.current + progress, obj.required),
            completed: obj.current + progress >= obj.required,
          }
        : obj
    ),
  };
};

export const isQuestComplete = (quest: Quest): boolean => {
  return quest.objectives.every(obj => obj.completed);
};

export const getQuestProgress = (quest: Quest): number => {
  const totalObjectives = quest.objectives.length;
  const completedObjectives = quest.objectives.filter(obj => obj.completed).length;
  return Math.floor((completedObjectives / totalObjectives) * 100);
};

export const canStartQuest = (quest: Quest, playerLevel: number): boolean => {
  return quest.status === 'available' && playerLevel >= quest.level;
};

export const getActiveObjectives = (quest: Quest): QuestObjective[] => {
  return quest.objectives.filter(obj => !obj.completed);
};

export const getCompletedObjectives = (quest: Quest): QuestObjective[] => {
  return quest.objectives.filter(obj => obj.completed);
};

export const calculateQuestRewards = (quest: Quest): {
  totalExp: number;
  totalGold: number;
  items: Array<{ itemId: string; quantity: number }>;
} => {
  let totalExp = 0;
  let totalGold = 0;
  const items: Array<{ itemId: string; quantity: number }> = [];
  
  quest.rewards.forEach(reward => {
    switch (reward.type) {
      case 'experience':
        totalExp += reward.value;
        break;
      case 'gold':
        totalGold += reward.value;
        break;
      case 'item':
        if (reward.itemId) {
          items.push({ itemId: reward.itemId, quantity: reward.value });
        }
        break;
    }
  });
  
  return { totalExp, totalGold, items };
};

export const filterQuests = (
  quests: Quest[],
  filter: 'all' | 'active' | 'completed' | 'available'
): Quest[] => {
  if (filter === 'all') return quests;
  return quests.filter(q => q.status === filter);
};

export const sortQuestsByLevel = (quests: Quest[]): Quest[] => {
  return [...quests].sort((a, b) => a.level - b.level);
};
