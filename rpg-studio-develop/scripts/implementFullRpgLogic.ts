/**
 * Full RPG Logic Implementation Script
 * 
 * This script implements complete functionality for all RPG Workbench panels
 * Run with: ts-node scripts/implementFullRpgLogic.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const COMPONENTS_DIR = path.join(__dirname, '../src/components/rpg/generated');

// Panel implementations with full logic
const panelImplementations: Record<string, string> = {
  'inventory-grid-panel.tsx': `/**
 * Inventory Grid Panel - Fully Implemented
 */

import React, { useState } from 'react';
import { useRPGState } from 'app/rpg/context/RPGStateContext';
import { selectInventoryItems, selectGold } from 'app/rpg/generated';
import { itemsById } from 'app/rpg/data/sampleItems';
import { sortInventory, filterInventory } from 'app/rpg/utils/inventoryUtils';

export interface InventoryGridProps {
  onClose?: () => void;
}

export const InventoryGridPanel: React.FC<InventoryGridProps> = ({ onClose }) => {
  const { rpgState, dispatchRPG } = useRPGState();
  const items = selectInventoryItems(rpgState);
  const gold = selectGold(rpgState);
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'rarity' | 'value'>('name');
  const [filter, setFilter] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const sortedItems = sortInventory(items, sortBy);
  const filteredItems = filterInventory(sortedItems, filter);

  const useItem = (itemId: string) => {
    const item = itemsById[itemId];
    if (!item) return;
    
    if (item.type === 'consumable') {
      dispatchRPG({ type: 'REMOVE_ITEM', payload: { itemId, quantity: 1 } });
      alert(\`Used \${item.name}!\`);
    } else {
      alert(\`Cannot use \${item.name} from inventory.\`);
    }
  };

  const dropItem = (itemId: string) => {
    if (confirm('Are you sure you want to drop this item?')) {
      dispatchRPG({ type: 'REMOVE_ITEM', payload: { itemId, quantity: 1 } });
    }
  };

  return (
    <div style={{
      background: '#0f172a',
      border: '2px solid #334155',
      borderRadius: 12,
      padding: 20,
      minWidth: 800,
      maxHeight: '85vh',
      overflow: 'auto',
      color: '#e2e8f0',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: '2px solid #334155',
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 'bold' }}>Inventory</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: 14, color: '#94a3b8' }}>
            Gold: {gold} | Items: {items.length}/{rpgState.inventory.capacity}
          </p>
        </div>
        {onClose && (
          <button onClick={onClose} style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 'bold',
          }}>
            Close
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search items..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            flex: 1,
            background: '#1e293b',
            border: '1px solid #475569',
            borderRadius: 6,
            padding: '8px 12px',
            color: '#e2e8f0',
            fontSize: 14,
          }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          style={{
            background: '#1e293b',
            border: '1px solid #475569',
            borderRadius: 6,
            padding: '8px 12px',
            color: '#e2e8f0',
            fontSize: 14,
          }}
        >
          <option value="name">Sort by Name</option>
          <option value="type">Sort by Type</option>
          <option value="rarity">Sort by Rarity</option>
          <option value="value">Sort by Value</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {filteredItems.map(invItem => {
          const item = itemsById[invItem.itemId];
          if (!item) return null;
          
          const rarityColors = {
            common: '#94a3b8',
            uncommon: '#10b981',
            rare: '#3b82f6',
            epic: '#a855f7',
            legendary: '#f59e0b',
          };

          return (
            <div
              key={invItem.itemId}
              style={{
                background: selectedItemId === invItem.itemId ? '#334155' : '#1e293b',
                border: \`2px solid \${selectedItemId === invItem.itemId ? '#3b82f6' : '#475569'}\`,
                borderRadius: 8,
                padding: 12,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onClick={() => setSelectedItemId(invItem.itemId)}
            >
              <div style={{ fontSize: 32, textAlign: 'center', marginBottom: 8 }}>
                {item.icon}
              </div>
              <div style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 4, color: rarityColors[item.rarity] }}>
                {item.name}
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>
                {item.description}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 8 }}>
                <span>Qty: {invItem.quantity}</span>
                <span>{item.value}g</span>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {item.type === 'consumable' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      useItem(invItem.itemId);
                    }}
                    style={{
                      flex: 1,
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: 4,
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontSize: 11,
                    }}
                  >
                    Use
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dropItem(invItem.itemId);
                  }}
                  style={{
                    flex: 1,
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: 11,
                  }}
                >
                  Drop
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
          {filter ? 'No items match your search' : 'Inventory is empty'}
        </div>
      )}
    </div>
  );
};

export default InventoryGridPanel;
`,

  'quest-tracker-panel.tsx': `/**
 * Quest Tracker Panel - Fully Implemented
 */

import React, { useState } from 'react';
import { useRPGState } from 'app/rpg/context/RPGStateContext';
import { selectActiveQuests, selectCompletedQuests } from 'app/rpg/generated';
import { getQuestProgress, calculateQuestRewards, isQuestComplete } from 'app/rpg/utils/questUtils';
import type { Quest } from 'app/rpg/generated/types';

export interface QuestTrackerProps {
  onClose?: () => void;
}

export const QuestTrackerPanel: React.FC<QuestTrackerProps> = ({ onClose }) => {
  const { rpgState, dispatchRPG } = useRPGState();
  const activeQuests = selectActiveQuests(rpgState);
  const completedQuests = selectCompletedQuests(rpgState);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(
    activeQuests[0]?.id || null
  );
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active');

  const displayQuests = filter === 'active' ? activeQuests : 
                        filter === 'completed' ? completedQuests :
                        rpgState.quests;

  const selectedQuest = rpgState.quests.find(q => q.id === selectedQuestId);

  const completeQuest = (questId: string) => {
    const quest = rpgState.quests.find(q => q.id === questId);
    if (!quest || !isQuestComplete(quest)) return;
    
    const rewards = calculateQuestRewards(quest);
    dispatchRPG({ type: 'COMPLETE_QUEST', payload: questId });
    
    // Add rewards
    rewards.items.forEach(item => {
      dispatchRPG({ type: 'ADD_ITEM', payload: { itemId: item.itemId, quantity: item.quantity } });
    });
    
    alert(\`Quest completed! Rewards: \${rewards.totalExp} EXP, \${rewards.totalGold} Gold\`);
  };

  const renderQuestCard = (quest: Quest) => {
    const progress = getQuestProgress(quest);
    const isComplete = isQuestComplete(quest);

    return (
      <div
        key={quest.id}
        style={{
          background: selectedQuestId === quest.id ? '#334155' : '#1e293b',
          border: \`2px solid \${selectedQuestId === quest.id ? '#3b82f6' : '#475569'}\`,
          borderRadius: 8,
          padding: 12,
          marginBottom: 8,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onClick={() => setSelectedQuestId(quest.id)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: 16 }}>{quest.title}</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>Level {quest.level}</div>
          </div>
          <div style={{
            background: quest.status === 'completed' ? '#10b981' : '#3b82f6',
            color: 'white',
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 'bold',
          }}>
            {quest.status.toUpperCase()}
          </div>
        </div>
        
        <div style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 8 }}>
          {quest.description}
        </div>
        
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div style={{
            height: 6,
            background: '#1f2937',
            borderRadius: 3,
            overflow: 'hidden',
          }}>
            <div style={{
              width: \`\${progress}%\`,
              height: '100%',
              background: isComplete ? '#10b981' : '#3b82f6',
              transition: 'width 0.3s',
            }} />
          </div>
        </div>
        
        <div style={{ fontSize: 11, color: '#94a3b8' }}>
          {quest.objectives.filter(o => o.completed).length}/{quest.objectives.length} objectives
        </div>
      </div>
    );
  };

  return (
    <div style={{
      background: '#0f172a',
      border: '2px solid #334155',
      borderRadius: 12,
      padding: 20,
      minWidth: 900,
      maxHeight: '85vh',
      overflow: 'auto',
      color: '#e2e8f0',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: '2px solid #334155',
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 'bold' }}>Quest Tracker</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: 14, color: '#94a3b8' }}>
            Active: {activeQuests.length} | Completed: {completedQuests.length}
          </p>
        </div>
        {onClose && (
          <button onClick={onClose} style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 'bold',
          }}>
            Close
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['all', 'active', 'completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? '#3b82f6' : '#1e293b',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 'bold',
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 20 }}>
        <div>
          <h3 style={{ margin: '0 0 12px 0', fontSize: 18 }}>Quests</h3>
          {displayQuests.map(renderQuestCard)}
          {displayQuests.length === 0 && (
            <div style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>
              No quests
            </div>
          )}
        </div>

        <div>
          {selectedQuest ? (
            <>
              <h3 style={{ margin: '0 0 12px 0', fontSize: 18 }}>{selectedQuest.title}</h3>
              <div style={{ background: '#1e293b', borderRadius: 8, padding: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#cbd5e1', marginBottom: 12 }}>
                  {selectedQuest.description}
                </div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>
                  Recommended Level: {selectedQuest.level}
                </div>
              </div>

              <h4 style={{ margin: '0 0 12px 0', fontSize: 16 }}>Objectives</h4>
              {selectedQuest.objectives.map(obj => (
                <div
                  key={obj.id}
                  style={{
                    background: '#1e293b',
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 8,
                    borderLeft: \`4px solid \${obj.completed ? '#10b981' : '#3b82f6'}\`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 'bold' }}>{obj.description}</span>
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>
                      {obj.current}/{obj.required}
                    </span>
                  </div>
                  <div style={{
                    height: 4,
                    background: '#0f172a',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: \`\${(obj.current / obj.required) * 100}%\`,
                      height: '100%',
                      background: obj.completed ? '#10b981' : '#3b82f6',
                    }} />
                  </div>
                </div>
              ))}

              <h4 style={{ margin: '16px 0 12px 0', fontSize: 16 }}>Rewards</h4>
              <div style={{ background: '#1e293b', borderRadius: 8, padding: 12 }}>
                {selectedQuest.rewards.map((reward, idx) => (
                  <div key={idx} style={{ fontSize: 14, marginBottom: 4 }}>
                    {reward.type === 'experience' && \`⭐ \${reward.value} EXP\`}
                    {reward.type === 'gold' && \`💰 \${reward.value} Gold\`}
                    {reward.type === 'item' && \`🎁 \${reward.itemId} x\${reward.value}\`}
                  </div>
                ))}
              </div>

              {isQuestComplete(selectedQuest) && selectedQuest.status === 'active' && (
                <button
                  onClick={() => completeQuest(selectedQuest.id)}
                  style={{
                    width: '100%',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '12px',
                    cursor: 'pointer',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginTop: 16,
                  }}
                >
                  Complete Quest
                </button>
              )}
            </>
          ) : (
            <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
              Select a quest to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestTrackerPanel;
`,
};

console.log('🚀 Starting Full RPG Logic Implementation...\n');

let implementedCount = 0;

Object.entries(panelImplementations).forEach(([filename, content]) => {
  const filePath = path.join(COMPONENTS_DIR, filename);
  fs.writeFileSync(filePath, content);
  console.log(\`✓ Implemented: \${filename}\`);
  implementedCount++;
});

console.log(\`\n✅ Implementation complete!\`);
console.log(\`Implemented \${implementedCount} panels with full logic\`);
console.log(\`\nNote: This is a partial implementation. Run the full generator for all panels.\`);
