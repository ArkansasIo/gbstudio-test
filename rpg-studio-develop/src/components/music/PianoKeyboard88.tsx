import React, { useMemo } from "react";
import styled from "styled-components";

interface PianoKeyboard88Props {
  activeNote?: number | null;
  onPlayNote: (note: number) => void;
}

const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const BLACK_NOTE_SET = new Set([1, 3, 6, 8, 10]);
const MIN_TRACKER_NOTE = 0; // C3
const MAX_TRACKER_NOTE = 71; // B8

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 6px;
  min-height: 120px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  opacity: 0.9;
`;

const Keybed = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  border: 1px solid ${(props) => props.theme.colors.sidebar.border};
  background: ${(props) => props.theme.colors.sidebar.background};
`;

const KeybedInner = styled.div`
  display: grid;
  grid-template-columns: repeat(88, 20px);
  min-width: 1760px;
`;

interface KeyButtonProps {
  $black: boolean;
  $active: boolean;
  $supported: boolean;
}

const KeyButton = styled.button<KeyButtonProps>`
  height: ${(props) => (props.$black ? "70px" : "100px")};
  margin-top: ${(props) => (props.$black ? "0" : "20px")};
  border: 1px solid ${(props) => props.theme.colors.sidebar.border};
  background: ${(props) =>
    props.$active
      ? "#2f9e44"
      : props.$supported
        ? props.$black
          ? "#23262a"
          : "#f8f9fa"
        : props.$black
          ? "#4b4f55"
          : "#c7ccd2"};
  color: ${(props) => (props.$black ? "#fff" : "#111")};
  font-size: 9px;
  padding: 0;
  cursor: ${(props) => (props.$supported ? "pointer" : "not-allowed")};
  user-select: none;
`;

const PianoKeyboard88 = ({ activeNote, onPlayNote }: PianoKeyboard88Props) => {
  const keys = useMemo(() => {
    return [...Array(88)].map((_, i) => {
      const midi = 21 + i; // A0 .. C8
      const pitchClass = midi % 12;
      const octave = Math.floor(midi / 12) - 1;
      const noteName = NOTE_NAMES[pitchClass];
      const trackerNote = midi - 48; // C3 => 0
      const supported =
        trackerNote >= MIN_TRACKER_NOTE && trackerNote <= MAX_TRACKER_NOTE;
      const showLabel = noteName === "C" || midi === 21 || midi === 108;
      return {
        id: `${noteName}${octave}`,
        label: `${noteName}${octave}`,
        noteName,
        black: BLACK_NOTE_SET.has(pitchClass),
        trackerNote: supported ? trackerNote : null,
        supported,
        showLabel,
      };
    });
  }, []);

  return (
    <Wrapper>
      <Header>
        <span>88-key keyboard (A0-C8)</span>
        <span>Playable preview range: C3-B8</span>
      </Header>
      <Keybed>
        <KeybedInner>
          {keys.map((key) => (
            <KeyButton
              key={key.id}
              $black={key.black}
              $active={activeNote === key.trackerNote && key.supported}
              $supported={key.supported}
              disabled={!key.supported}
              title={
                key.supported
                  ? `${key.label} (preview)`
                  : `${key.label} (outside engine range)`
              }
              onMouseDown={() => {
                if (key.trackerNote !== null) {
                  onPlayNote(key.trackerNote);
                }
              }}
            >
              {key.showLabel ? key.label : ""}
            </KeyButton>
          ))}
        </KeybedInner>
      </Keybed>
    </Wrapper>
  );
};

export default PianoKeyboard88;
