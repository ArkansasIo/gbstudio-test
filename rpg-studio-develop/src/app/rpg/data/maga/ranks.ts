/**
 * MAGA – Rank System
 *
 * Defines the full rank ladder from Bronze I through to Legend,
 * including point thresholds, stat multipliers, UI metadata, and
 * the rewards granted upon first reaching each rank.
 */

import type { MAGARank } from './types';

// ============================================================================
// RANK DEFINITIONS
// ============================================================================

export const magaRanks: MAGARank[] = [
  // ── BRONZE ──────────────────────────────────────────────────────────────
  {
    id: 'rank-bronze-i',
    displayName: 'Bronze I',
    tier: 'Bronze',
    division: 'I',
    pointsRequired: 0,
    pointsCap: 99,
    color: '#cd7f32',
    badge: '🥉',
    statMultiplier: 1.00,
    rewards: [
      { type: 'gold', value: 100, description: 'Bronze I placement reward' },
    ],
  },
  {
    id: 'rank-bronze-ii',
    displayName: 'Bronze II',
    tier: 'Bronze',
    division: 'II',
    pointsRequired: 100,
    pointsCap: 199,
    color: '#cd7f32',
    badge: '🥉',
    statMultiplier: 1.02,
    rewards: [
      { type: 'gold', value: 150, description: 'Bronze II placement reward' },
    ],
  },
  {
    id: 'rank-bronze-iii',
    displayName: 'Bronze III',
    tier: 'Bronze',
    division: 'III',
    pointsRequired: 200,
    pointsCap: 299,
    color: '#cd7f32',
    badge: '🥉',
    statMultiplier: 1.04,
    rewards: [
      { type: 'gold', value: 200, description: 'Bronze III placement reward' },
      { type: 'title', value: 0, referenceId: 'title-bronze-veteran', description: 'Unlock title: Bronze Veteran' },
    ],
  },

  // ── SILVER ──────────────────────────────────────────────────────────────
  {
    id: 'rank-silver-i',
    displayName: 'Silver I',
    tier: 'Silver',
    division: 'I',
    pointsRequired: 300,
    pointsCap: 449,
    color: '#a8a9ad',
    badge: '🥈',
    statMultiplier: 1.06,
    rewards: [
      { type: 'gold', value: 300, description: 'Silver I promotion reward' },
      { type: 'item', value: 1, referenceId: 'item-silver-badge', description: 'Silver badge cosmetic item' },
    ],
  },
  {
    id: 'rank-silver-ii',
    displayName: 'Silver II',
    tier: 'Silver',
    division: 'II',
    pointsRequired: 450,
    pointsCap: 599,
    color: '#a8a9ad',
    badge: '🥈',
    statMultiplier: 1.08,
    rewards: [
      { type: 'gold', value: 400, description: 'Silver II placement reward' },
    ],
  },
  {
    id: 'rank-silver-iii',
    displayName: 'Silver III',
    tier: 'Silver',
    division: 'III',
    pointsRequired: 600,
    pointsCap: 749,
    color: '#a8a9ad',
    badge: '🥈',
    statMultiplier: 1.10,
    rewards: [
      { type: 'gold', value: 500, description: 'Silver III placement reward' },
      { type: 'title', value: 0, referenceId: 'title-silver-knight', description: 'Unlock title: Silver Knight' },
    ],
  },

  // ── GOLD ────────────────────────────────────────────────────────────────
  {
    id: 'rank-gold-i',
    displayName: 'Gold I',
    tier: 'Gold',
    division: 'I',
    pointsRequired: 750,
    pointsCap: 949,
    color: '#ffd700',
    badge: '🥇',
    statMultiplier: 1.12,
    rewards: [
      { type: 'gold', value: 700, description: 'Gold I promotion reward' },
      { type: 'item', value: 1, referenceId: 'item-gold-badge', description: 'Gold badge cosmetic item' },
    ],
  },
  {
    id: 'rank-gold-ii',
    displayName: 'Gold II',
    tier: 'Gold',
    division: 'II',
    pointsRequired: 950,
    pointsCap: 1149,
    color: '#ffd700',
    badge: '🥇',
    statMultiplier: 1.14,
    rewards: [
      { type: 'gold', value: 900, description: 'Gold II placement reward' },
    ],
  },
  {
    id: 'rank-gold-iii',
    displayName: 'Gold III',
    tier: 'Gold',
    division: 'III',
    pointsRequired: 1150,
    pointsCap: 1349,
    color: '#ffd700',
    badge: '🥇',
    statMultiplier: 1.16,
    rewards: [
      { type: 'gold', value: 1100, description: 'Gold III placement reward' },
      { type: 'title', value: 0, referenceId: 'title-golden-champion', description: 'Unlock title: Golden Champion' },
    ],
  },

  // ── PLATINUM ────────────────────────────────────────────────────────────
  {
    id: 'rank-platinum-i',
    displayName: 'Platinum I',
    tier: 'Platinum',
    division: 'I',
    pointsRequired: 1350,
    pointsCap: 1649,
    color: '#e5e4e2',
    badge: '🏅',
    statMultiplier: 1.20,
    rewards: [
      { type: 'gold', value: 1500, description: 'Platinum I promotion reward' },
      { type: 'item', value: 1, referenceId: 'item-platinum-badge', description: 'Platinum badge cosmetic item' },
      { type: 'skill', value: 1, referenceId: 'skill-platinum-aura', description: 'Unlock skill: Platinum Aura' },
    ],
  },
  {
    id: 'rank-platinum-ii',
    displayName: 'Platinum II',
    tier: 'Platinum',
    division: 'II',
    pointsRequired: 1650,
    pointsCap: 1949,
    color: '#e5e4e2',
    badge: '🏅',
    statMultiplier: 1.24,
    rewards: [
      { type: 'gold', value: 1800, description: 'Platinum II placement reward' },
    ],
  },
  {
    id: 'rank-platinum-iii',
    displayName: 'Platinum III',
    tier: 'Platinum',
    division: 'III',
    pointsRequired: 1950,
    pointsCap: 2249,
    color: '#e5e4e2',
    badge: '🏅',
    statMultiplier: 1.28,
    rewards: [
      { type: 'gold', value: 2100, description: 'Platinum III placement reward' },
      { type: 'title', value: 0, referenceId: 'title-platinum-elite', description: 'Unlock title: Platinum Elite' },
    ],
  },

  // ── DIAMOND ─────────────────────────────────────────────────────────────
  {
    id: 'rank-diamond-i',
    displayName: 'Diamond I',
    tier: 'Diamond',
    division: 'I',
    pointsRequired: 2250,
    pointsCap: 2649,
    color: '#b9f2ff',
    badge: '💎',
    statMultiplier: 1.34,
    rewards: [
      { type: 'gold', value: 3000, description: 'Diamond I promotion reward' },
      { type: 'item', value: 1, referenceId: 'item-diamond-badge', description: 'Diamond badge cosmetic item' },
      { type: 'stat_bonus', value: 5, description: '+5 to all primary stats (permanent)' },
    ],
  },
  {
    id: 'rank-diamond-ii',
    displayName: 'Diamond II',
    tier: 'Diamond',
    division: 'II',
    pointsRequired: 2650,
    pointsCap: 3049,
    color: '#b9f2ff',
    badge: '💎',
    statMultiplier: 1.40,
    rewards: [
      { type: 'gold', value: 3500, description: 'Diamond II placement reward' },
    ],
  },
  {
    id: 'rank-diamond-iii',
    displayName: 'Diamond III',
    tier: 'Diamond',
    division: 'III',
    pointsRequired: 3050,
    pointsCap: 3499,
    color: '#b9f2ff',
    badge: '💎',
    statMultiplier: 1.46,
    rewards: [
      { type: 'gold', value: 4000, description: 'Diamond III placement reward' },
      { type: 'title', value: 0, referenceId: 'title-diamond-sovereign', description: 'Unlock title: Diamond Sovereign' },
    ],
  },

  // ── MASTER ──────────────────────────────────────────────────────────────
  {
    id: 'rank-master-i',
    displayName: 'Master I',
    tier: 'Master',
    division: 'I',
    pointsRequired: 3500,
    pointsCap: 3999,
    color: '#a855f7',
    badge: '👑',
    statMultiplier: 1.55,
    rewards: [
      { type: 'gold', value: 6000, description: 'Master I promotion reward' },
      { type: 'item', value: 1, referenceId: 'item-master-crown', description: 'Master Crown cosmetic item' },
      { type: 'title', value: 0, referenceId: 'title-master', description: 'Unlock title: Master' },
      { type: 'stat_bonus', value: 10, description: '+10 to all primary stats (permanent)' },
    ],
  },
  {
    id: 'rank-master-ii',
    displayName: 'Master II',
    tier: 'Master',
    division: 'II',
    pointsRequired: 4000,
    pointsCap: 4599,
    color: '#a855f7',
    badge: '👑',
    statMultiplier: 1.65,
    rewards: [
      { type: 'gold', value: 8000, description: 'Master II placement reward' },
      { type: 'skill', value: 1, referenceId: 'skill-master-surge', description: 'Unlock skill: Master Surge' },
    ],
  },

  // ── GRANDMASTER ─────────────────────────────────────────────────────────
  {
    id: 'rank-grandmaster',
    displayName: 'Grandmaster',
    tier: 'Grandmaster',
    division: null,
    pointsRequired: 4600,
    pointsCap: 5999,
    color: '#f97316',
    badge: '🌟',
    statMultiplier: 1.80,
    rewards: [
      { type: 'gold', value: 12000, description: 'Grandmaster promotion reward' },
      { type: 'item', value: 1, referenceId: 'item-grandmaster-relic', description: 'Grandmaster Relic (unique equipment)' },
      { type: 'title', value: 0, referenceId: 'title-grandmaster', description: 'Unlock title: Grandmaster' },
      { type: 'stat_bonus', value: 15, description: '+15 to all primary stats (permanent)' },
    ],
  },

  // ── LEGEND ──────────────────────────────────────────────────────────────
  {
    id: 'rank-legend',
    displayName: 'Legend',
    tier: 'Legend',
    division: null,
    pointsRequired: 6000,
    pointsCap: 999999,
    color: '#eab308',
    badge: '⭐',
    statMultiplier: 2.00,
    rewards: [
      { type: 'gold', value: 25000, description: 'Legend promotion reward' },
      { type: 'item', value: 1, referenceId: 'item-legend-sigil', description: 'Legend Sigil (unique cosmetic)' },
      { type: 'title', value: 0, referenceId: 'title-legend', description: 'Unlock title: The Legend' },
      { type: 'stat_bonus', value: 25, description: '+25 to all primary stats (permanent)' },
      { type: 'skill', value: 1, referenceId: 'skill-legend-aura', description: 'Unlock skill: Legend Aura (passive)' },
    ],
  },
];

// ============================================================================
// LOOKUP HELPERS
// ============================================================================

/** Lookup map: rank ID → MAGARank. */
export const magaRankById: Record<string, MAGARank> = Object.fromEntries(
  magaRanks.map((r) => [r.id, r])
);

/**
 * Returns the MAGARank that corresponds to the given number of rank points.
 * Falls back to Bronze I if the point value is below the first threshold.
 */
export function getRankByPoints(points: number): MAGARank {
  const sorted = [...magaRanks].sort((a, b) => b.pointsRequired - a.pointsRequired);
  return sorted.find((r) => points >= r.pointsRequired) ?? magaRanks[0];
}

/**
 * Returns the next rank above the supplied rank, or null if already at Legend.
 */
export function getNextRank(currentRankId: string): MAGARank | null {
  const idx = magaRanks.findIndex((r) => r.id === currentRankId);
  return idx >= 0 && idx < magaRanks.length - 1 ? magaRanks[idx + 1] : null;
}
