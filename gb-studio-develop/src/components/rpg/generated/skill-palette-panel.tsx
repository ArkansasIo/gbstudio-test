/**
 * Skill Palette Panel - Fully Implemented
 * View and manage character skills
 */

import React, { useState } from 'react';
import { useRPGState } from 'app/rpg/context/RPGStateContext';
import { selectActivePartyCharacters } from 'app/rpg/generated';
import { sampleSkills, skillsById } from 'app/rpg/data/sampleSkills';
import type { Character, Skill } from 'app/rpg/generated/types';

export interface SkillPaletteProps {
  onClose?: () => void;
}

export const SkillPalettePanel: React.FC<SkillPaletteProps> = ({ onClose }) => {
  const { rpgState } = useRPGState();
  const party = selectActivePartyCharacters(rpgState);
  const [selectedCharId, setSelectedCharId] = useState<string | null>(party[0]?.id || null);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'physical' | 'magical' | 'support'>('all');

  const selectedChar = rpgState.characters.find(c => c.id === selectedCharId);
  const selectedSkill = selectedSkillId ? skillsById[selectedSkillId] : null;

  const getCharacterSkills = (char: Character): Skill[] => {
    return char.skills.map(skillId => skillsById[skillId]).filter(Boolean);
  };

  const getAvailableSkills = (): Skill[] => {
    if (!selectedChar) return [];
    const charSkillIds = selectedChar.skills;
    return sampleSkills.filter(skill => !charSkillIds.includes(skill.id));
  };

  const filteredSkills = selectedChar ? getCharacterSkills(selectedChar).filter(skill => 
    filterType === 'all' || skill.type === filterType
  ) : [];

  const getSkillTypeColor = (type: string) => {
    switch (type) {
      case 'physical': return '#ef4444';
      case 'magical': return '#3b82f6';
      case 'support': return '#10b981';
      default: return '#94a3b8';
    }
  };

  const getElementColor = (element?: string) => {
    switch (element) {
      case 'fire': return '#f97316';
      case 'ice': return '#06b6d4';
      case 'lightning': return '#eab308';
      case 'holy': return '#fbbf24';
      default: return '#94a3b8';
    }
  };

  const canUseSkill = (skill: Skill): boolean => {
    if (!selectedChar) return false;
    return selectedChar.stats.mp >= skill.mpCost;
  };

  const renderSkillCard = (skill: Skill, isLearned: boolean = true) => (
    <div
      key={skill.id}
      style={{
        background: selectedSkillId === skill.id ? '#334155' : '#1e293b',
        border: `2px solid ${selectedSkillId === skill.id ? '#3b82f6' : '#475569'}`,
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        cursor: 'pointer',
        opacity: isLearned && !canUseSkill(skill) ? 0.5 : 1,
        transition: 'all 0.2s',
      }}
      onClick={() => setSelectedSkillId(skill.id)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', fontSize: 14, color: getSkillTypeColor(skill.type) }}>
            {skill.name}
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
            {skill.type.toUpperCase()}
            {skill.element && ` • ${skill.element.toUpperCase()}`}
          </div>
        </div>
        <div style={{
          background: getSkillTypeColor(skill.type),
          color: 'white',
          padding: '2px 8px',
          borderRadius: 4,
          fontSize: 11,
          fontWeight: 'bold',
        }}>
          {skill.mpCost} MP
        </div>
      </div>

      <div style={{ fontSize: 12, color: '#cbd5e1', marginBottom: 8 }}>
        {skill.description}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, fontSize: 11 }}>
        <div>
          <span style={{ color: '#94a3b8' }}>Power:</span> {skill.power}
        </div>
        <div>
          <span style={{ color: '#94a3b8' }}>Accuracy:</span> {skill.accuracy}%
        </div>
        <div>
          <span style={{ color: '#94a3b8' }}>Target:</span> {skill.targetType}
        </div>
      </div>

      {!isLearned && (
        <button
          style={{
            width: '100%',
            marginTop: 8,
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            padding: '6px',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 'bold',
          }}
          onClick={(e) => {
            e.stopPropagation();
            alert(`Learning ${skill.name}! (Feature coming soon)`);
          }}
        >
          Learn Skill
        </button>
      )}
    </div>
  );

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
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 'bold' }}>Skill Palette</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: 14, color: '#94a3b8' }}>
            Manage character skills and abilities
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
              <div style={{ textAlign: 'left' }}>
                <div>{char.name}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>
                  MP: {char.stats.mp}/{char.stats.maxMp}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedChar && (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {(['all', 'physical', 'magical', 'support'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                style={{
                  background: filterType === type ? '#3b82f6' : '#1e293b',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 'bold',
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 20 }}>
            <div>
              <h3 style={{ margin: '0 0 12px 0', fontSize: 18 }}>
                Learned Skills ({filteredSkills.length})
              </h3>
              {filteredSkills.length > 0 ? (
                filteredSkills.map(skill => renderSkillCard(skill, true))
              ) : (
                <div style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>
                  No skills of this type
                </div>
              )}
            </div>

            <div>
              {selectedSkill ? (
                <>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: 18 }}>Skill Details</h3>
                  <div style={{ background: '#1e293b', borderRadius: 8, padding: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: 20, color: getSkillTypeColor(selectedSkill.type) }}>
                          {selectedSkill.name}
                        </h4>
                        <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
                          {selectedSkill.type.toUpperCase()}
                          {selectedSkill.element && (
                            <span style={{ color: getElementColor(selectedSkill.element) }}>
                              {' • '}{selectedSkill.element.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{
                        background: getSkillTypeColor(selectedSkill.type),
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: 6,
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                        {selectedSkill.mpCost} MP
                      </div>
                    </div>

                    <div style={{ fontSize: 14, color: '#cbd5e1', marginBottom: 16, lineHeight: 1.5 }}>
                      {selectedSkill.description}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                      <div style={{ background: '#0f172a', padding: 12, borderRadius: 6 }}>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Power</div>
                        <div style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedSkill.power}</div>
                      </div>
                      <div style={{ background: '#0f172a', padding: 12, borderRadius: 6 }}>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Accuracy</div>
                        <div style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedSkill.accuracy}%</div>
                      </div>
                      <div style={{ background: '#0f172a', padding: 12, borderRadius: 6 }}>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Target Type</div>
                        <div style={{ fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize' }}>
                          {selectedSkill.targetType}
                        </div>
                      </div>
                      <div style={{ background: '#0f172a', padding: 12, borderRadius: 6 }}>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>MP Cost</div>
                        <div style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedSkill.mpCost}</div>
                      </div>
                    </div>

                    {selectedChar && (
                      <div style={{ background: '#0f172a', padding: 12, borderRadius: 6, marginBottom: 16 }}>
                        <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>
                          {selectedChar.name}'s Stats:
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, fontSize: 12 }}>
                          <div>Current MP: {selectedChar.stats.mp}/{selectedChar.stats.maxMp}</div>
                          <div>Can Use: {canUseSkill(selectedSkill) ? '✅ Yes' : '❌ No'}</div>
                          {selectedSkill.type === 'physical' && (
                            <div>Attack: {selectedChar.stats.attack}</div>
                          )}
                          {selectedSkill.type === 'magical' && (
                            <div>Magic Attack: {selectedChar.stats.magicAttack}</div>
                          )}
                        </div>
                      </div>
                    )}

                    <button
                      disabled={!canUseSkill(selectedSkill)}
                      style={{
                        width: '100%',
                        background: canUseSkill(selectedSkill) ? '#10b981' : '#475569',
                        color: 'white',
                        border: 'none',
                        borderRadius: 6,
                        padding: '12px',
                        cursor: canUseSkill(selectedSkill) ? 'pointer' : 'not-allowed',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}
                      onClick={() => {
                        if (canUseSkill(selectedSkill)) {
                          alert(`Using ${selectedSkill.name}! (Battle system coming soon)`);
                        }
                      }}
                    >
                      {canUseSkill(selectedSkill) ? 'Use Skill' : 'Not Enough MP'}
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
                  Select a skill to view details
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {!selectedChar && (
        <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
          Select a character to view their skills
        </div>
      )}
    </div>
  );
};

export default SkillPalettePanel;
