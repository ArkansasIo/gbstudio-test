/**
 * Party Manager Panel - Fully Implemented
 * Manage active party and reserve characters
 */

import React, { useState } from 'react';
import { useRPGState } from 'app/rpg/context/RPGStateContext';
import { selectActivePartyCharacters, selectReserveCharacters } from 'app/rpg/generated';
import type { Character } from 'app/rpg/generated/types';

export interface PartyManagerProps {
  onClose?: () => void;
}

export const PartyManagerPanel: React.FC<PartyManagerProps> = ({ onClose }) => {
  const { rpgState, dispatchRPG } = useRPGState();
  const party = selectActivePartyCharacters(rpgState);
  const reserves = selectReserveCharacters(rpgState);
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);

  const addToParty = (charId: string) => {
    if (party.length >= 4) {
      alert('Party is full! Maximum 4 characters.');
      return;
    }
    dispatchRPG({ type: 'ADD_TO_PARTY', payload: charId });
  };

  const removeFromParty = (charId: string) => {
    if (party.length <= 1) {
      alert('Cannot remove last party member!');
      return;
    }
    dispatchRPG({ type: 'REMOVE_FROM_PARTY', payload: charId });
  };

  const renderCharacterCard = (char: Character, isInParty: boolean) => (
    <div
      key={char.id}
      style={{
        background: selectedCharId === char.id ? '#334155' : '#1e293b',
        border: `2px solid ${selectedCharId === char.id ? '#3b82f6' : '#475569'}`,
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onClick={() => setSelectedCharId(char.id)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 24 }}>{char.portrait}</span>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: 16 }}>{char.name}</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>
              Lv.{char.level} {char.class}
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            isInParty ? removeFromParty(char.id) : addToParty(char.id);
          }}
          style={{
            background: isInParty ? '#ef4444' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 'bold',
          }}
          disabled={!isInParty && party.length >= 4}
        >
          {isInParty ? 'Remove' : 'Add'}
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
        <div>
          <div style={{ color: '#94a3b8' }}>HP</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{
              flex: 1,
              height: 8,
              background: '#1f2937',
              borderRadius: 4,
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${(char.stats.hp / char.stats.maxHp) * 100}%`,
                height: '100%',
                background: '#10b981',
              }} />
            </div>
            <span>{char.stats.hp}/{char.stats.maxHp}</span>
          </div>
        </div>
        <div>
          <div style={{ color: '#94a3b8' }}>MP</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{
              flex: 1,
              height: 8,
              background: '#1f2937',
              borderRadius: 4,
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${(char.stats.mp / char.stats.maxMp) * 100}%`,
                height: '100%',
                background: '#3b82f6',
              }} />
            </div>
            <span>{char.stats.mp}/{char.stats.maxMp}</span>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, marginTop: 8, fontSize: 11 }}>
        <div><span style={{ color: '#94a3b8' }}>ATK:</span> {char.stats.attack}</div>
        <div><span style={{ color: '#94a3b8' }}>DEF:</span> {char.stats.defense}</div>
        <div><span style={{ color: '#94a3b8' }}>SPD:</span> {char.stats.speed}</div>
        <div><span style={{ color: '#94a3b8' }}>MAG:</span> {char.stats.magicAttack}</div>
        <div><span style={{ color: '#94a3b8' }}>MDF:</span> {char.stats.magicDefense}</div>
        <div><span style={{ color: '#94a3b8' }}>LUK:</span> {char.stats.luck}</div>
      </div>
      
      <div style={{ marginTop: 8, fontSize: 11 }}>
        <div style={{ color: '#94a3b8', marginBottom: 4 }}>Skills:</div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {char.skills.slice(0, 4).map(skillId => (
            <span
              key={skillId}
              style={{
                background: '#475569',
                padding: '2px 6px',
                borderRadius: 4,
                fontSize: 10,
              }}
            >
              {skillId.replace('skill-', '').replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        background: '#0f172a',
        border: '2px solid #334155',
        borderRadius: 12,
        padding: 20,
        minWidth: 700,
        maxWidth: 900,
        maxHeight: '85vh',
        overflow: 'auto',
        color: '#e2e8f0',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          paddingBottom: 16,
          borderBottom: '2px solid #334155',
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 'bold' }}>Party Manager</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: 14, color: '#94a3b8' }}>
            Manage your active party (max 4 characters)
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 'bold',
            }}
          >
            Close
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <h3 style={{ margin: '0 0 12px 0', fontSize: 18, color: '#10b981' }}>
            Active Party ({party.length}/4)
          </h3>
          {party.length === 0 ? (
            <div style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>
              No characters in party
            </div>
          ) : (
            party.map(char => renderCharacterCard(char, true))
          )}
        </div>

        <div>
          <h3 style={{ margin: '0 0 12px 0', fontSize: 18, color: '#3b82f6' }}>
            Reserves ({reserves.length})
          </h3>
          {reserves.length === 0 ? (
            <div style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>
              No reserve characters
            </div>
          ) : (
            reserves.map(char => renderCharacterCard(char, false))
          )}
        </div>
      </div>
    </div>
  );
};

export default PartyManagerPanel;
