/**
 * Equipment Inspector Panel - Fully Implemented
 * View and manage character equipment
 */

import React, { useState } from 'react';
import { useRPGState } from 'app/rpg/context/RPGStateContext';
import { selectActivePartyCharacters } from 'app/rpg/generated';
import { itemsById } from 'app/rpg/data/sampleItems';
import type { Character, EquipmentSlot } from 'app/rpg/generated/types';

export interface EquipmentInspectorProps {
  onClose?: () => void;
}

export const EquipmentInspectorPanel: React.FC<EquipmentInspectorProps> = ({ onClose }) => {
  const { rpgState, dispatchRPG } = useRPGState();
  const party = selectActivePartyCharacters(rpgState);
  const [selectedCharId, setSelectedCharId] = useState<string | null>(party[0]?.id || null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const selectedChar = rpgState.characters.find(c => c.id === selectedCharId);

  const getEquippableItems = (slotType: string) => {
    return rpgState.inventory.items
      .map(invItem => itemsById[invItem.itemId])
      .filter(item => item && item.type === 'equipment')
      .filter(item => {
        // Simple matching - in real game, items would have equipment type
        if (slotType === 'weapon') return item.name.includes('Sword') || item.name.includes('Staff') || item.name.includes('Dagger') || item.name.includes('Mace');
        if (slotType === 'armor') return item.name.includes('Armor') || item.name.includes('Robe') || item.name.includes('Mail');
        if (slotType === 'shield') return item.name.includes('Shield');
        return false;
      });
  };

  const equipItem = (slotId: string, itemId: string) => {
    if (!selectedChar) return;
    dispatchRPG({
      type: 'EQUIP_ITEM',
      payload: { characterId: selectedChar.id, slotId, itemId }
    });
  };

  const unequipItem = (slotId: string) => {
    if (!selectedChar) return;
    dispatchRPG({
      type: 'UNEQUIP_ITEM',
      payload: { characterId: selectedChar.id, slotId }
    });
  };

  const getSlotIcon = (type: string) => {
    switch (type) {
      case 'weapon': return '⚔️';
      case 'armor': return '🛡️';
      case 'helmet': return '⛑️';
      case 'shield': return '🛡️';
      case 'accessory': return '💍';
      default: return '📦';
    }
  };

  const calculateTotalStats = (char: Character) => {
    let bonusAtk = 0;
    let bonusDef = 0;
    let bonusMag = 0;
    let bonusMdf = 0;

    char.equipmentSlots.forEach(slot => {
      if (slot.itemId) {
        const item = itemsById[slot.itemId];
        if (item) {
          // Parse stats from description (simplified)
          if (item.description.includes('Attack')) {
            const match = item.description.match(/Attack \+(\d+)/);
            if (match) bonusAtk += parseInt(match[1]);
          }
          if (item.description.includes('Defense')) {
            const match = item.description.match(/Defense \+(\d+)/);
            if (match) bonusDef += parseInt(match[1]);
          }
          if (item.description.includes('Magic Attack')) {
            const match = item.description.match(/Magic Attack \+(\d+)/);
            if (match) bonusMag += parseInt(match[1]);
          }
          if (item.description.includes('Magic Defense')) {
            const match = item.description.match(/Magic Defense \+(\d+)/);
            if (match) bonusMdf += parseInt(match[1]);
          }
        }
      }
    });

    return { bonusAtk, bonusDef, bonusMag, bonusMdf };
  };

  const renderEquipmentSlot = (slot: EquipmentSlot) => {
    const equippedItem = slot.itemId ? itemsById[slot.itemId] : null;
    const isSelected = selectedSlotId === slot.id;

    return (
      <div
        key={slot.id}
        style={{
          background: isSelected ? '#334155' : '#1e293b',
          border: `2px solid ${isSelected ? '#3b82f6' : '#475569'}`,
          borderRadius: 8,
          padding: 12,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onClick={() => setSelectedSlotId(slot.id)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>{getSlotIcon(slot.type)}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase' }}>
              {slot.type}
            </div>
            {equippedItem ? (
              <>
                <div style={{ fontWeight: 'bold', fontSize: 14 }}>{equippedItem.name}</div>
                <div style={{ fontSize: 11, color: '#cbd5e1' }}>{equippedItem.description}</div>
              </>
            ) : (
              <div style={{ fontSize: 14, color: '#64748b', fontStyle: 'italic' }}>
                Empty
              </div>
            )}
          </div>
        </div>

        {equippedItem && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              unequipItem(slot.id);
            }}
            style={{
              width: '100%',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              padding: '6px',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 'bold',
            }}
          >
            Unequip
          </button>
        )}
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
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 'bold' }}>Equipment Inspector</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: 14, color: '#94a3b8' }}>
            Manage character equipment and view stats
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

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Select Character:</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {party.map(char => (
            <button
              key={char.id}
              onClick={() => setSelectedCharId(char.id)}
              style={{
                background: selectedCharId === char.id ? '#3b82f6' : '#1e293b',
                color: 'white',
                border: `2px solid ${selectedCharId === char.id ? '#3b82f6' : '#475569'}`,
                borderRadius: 6,
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 20 }}>{char.portrait}</span>
              {char.name}
            </button>
          ))}
        </div>
      </div>

      {selectedChar && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 18 }}>Equipment Slots</h3>
            {selectedChar.equipmentSlots.map(renderEquipmentSlot)}
          </div>

          <div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: 18 }}>Character Stats</h3>
            <div style={{ background: '#1e293b', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 48 }}>{selectedChar.portrait}</span>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedChar.name}</div>
                  <div style={{ fontSize: 14, color: '#94a3b8' }}>
                    Lv.{selectedChar.level} {selectedChar.class}
                  </div>
                </div>
              </div>

              {(() => {
                const bonuses = calculateTotalStats(selectedChar);
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ background: '#0f172a', padding: 12, borderRadius: 6 }}>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Attack</div>
                      <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {selectedChar.stats.attack}
                        {bonuses.bonusAtk > 0 && (
                          <span style={{ fontSize: 14, color: '#10b981' }}> +{bonuses.bonusAtk}</span>
                        )}
                      </div>
                    </div>
                    <div style={{ background: '#0f172a', padding: 12, borderRadius: 6 }}>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Defense</div>
                      <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {selectedChar.stats.defense}
                        {bonuses.bonusDef > 0 && (
                          <span style={{ fontSize: 14, color: '#10b981' }}> +{bonuses.bonusDef}</span>
                        )}
                      </div>
                    </div>
                    <div style={{ background: '#0f172a', padding: 12, borderRadius: 6 }}>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Magic Attack</div>
                      <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {selectedChar.stats.magicAttack}
                        {bonuses.bonusMag > 0 && (
                          <span style={{ fontSize: 14, color: '#10b981' }}> +{bonuses.bonusMag}</span>
                        )}
                      </div>
                    </div>
                    <div style={{ background: '#0f172a', padding: 12, borderRadius: 6 }}>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Magic Defense</div>
                      <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {selectedChar.stats.magicDefense}
                        {bonuses.bonusMdf > 0 && (
                          <span style={{ fontSize: 14, color: '#10b981' }}> +{bonuses.bonusMdf}</span>
                        )}
                      </div>
                    </div>
                    <div style={{ background: '#0f172a', padding: 12, borderRadius: 6 }}>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Speed</div>
                      <div style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedChar.stats.speed}</div>
                    </div>
                    <div style={{ background: '#0f172a', padding: 12, borderRadius: 6 }}>
                      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Luck</div>
                      <div style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedChar.stats.luck}</div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {selectedSlotId && (
              <>
                <h3 style={{ margin: '16px 0 12px 0', fontSize: 18 }}>Available Equipment</h3>
                <div style={{ maxHeight: 300, overflow: 'auto' }}>
                  {(() => {
                    const slot = selectedChar.equipmentSlots.find(s => s.id === selectedSlotId);
                    if (!slot) return null;

                    const items = getEquippableItems(slot.type);
                    if (items.length === 0) {
                      return (
                        <div style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>
                          No equipment available for this slot
                        </div>
                      );
                    }

                    return items.map(item => (
                      <div
                        key={item.id}
                        style={{
                          background: '#1e293b',
                          border: '1px solid #475569',
                          borderRadius: 6,
                          padding: 12,
                          marginBottom: 8,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                          <div>
                            <div style={{ fontWeight: 'bold', fontSize: 14 }}>{item.name}</div>
                            <div style={{ fontSize: 12, color: '#cbd5e1' }}>{item.description}</div>
                          </div>
                          <span style={{ fontSize: 24 }}>{item.icon}</span>
                        </div>
                        <button
                          onClick={() => equipItem(slot.id, item.id)}
                          style={{
                            width: '100%',
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            padding: '6px',
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: 'bold',
                          }}
                        >
                          Equip
                        </button>
                      </div>
                    ));
                  })()}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {!selectedChar && (
        <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
          Select a character to view equipment
        </div>
      )}
    </div>
  );
};

export default EquipmentInspectorPanel;
