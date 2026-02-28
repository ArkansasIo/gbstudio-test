import React, { FC, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Button } from "ui/buttons/Button";
import { MusicParser, MusicPlayer } from "lib/audio/musicParser";
import { GBSoundSystem } from "lib/audio/gbSound";
import type { MusicTrack, MusicNote } from "lib/audio/types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.document.background};
`;

const Header = styled.div`
  padding: 15px 20px;
  background: ${(props) => props.theme.colors.sidebar.background};
  border-bottom: 1px solid ${(props) => props.theme.colors.sidebar.border};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0;
  color: ${(props) => props.theme.colors.text};
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: auto;
`;

const EditorArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PianoRoll = styled.div`
  flex: 1;
  display: flex;
  overflow: auto;
  background: ${(props) => props.theme.colors.input.background};
  border: 1px solid ${(props) => props.theme.colors.input.border};
  margin: 10px;
  position: relative;
`;

const PianoKeys = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column-reverse;
  background: #2a2a2a;
  border-right: 2px solid #000;
`;

const PianoKey = styled.div<{ isBlack?: boolean; isActive?: boolean }>`
  height: 20px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 11px;
  color: ${(props) => (props.isBlack ? "#fff" : "#000")};
  background: ${(props) =>
    props.isActive
      ? "#4a9eff"
      : props.isBlack
      ? "#1a1a1a"
      : "#f0f0f0"};
  border-bottom: 1px solid ${(props) => (props.isBlack ? "#000" : "#ccc")};
  cursor: pointer;
  user-select: none;
  transition: background 0.1s;

  &:hover {
    background: ${(props) =>
      props.isActive
        ? "#4a9eff"
        : props.isBlack
        ? "#2a2a2a"
        : "#e0e0e0"};
  }
`;

const Timeline = styled.div`
  flex: 1;
  position: relative;
  background: repeating-linear-gradient(
    to right,
    #3a3a3a 0px,
    #3a3a3a 1px,
    transparent 1px,
    transparent 50px
  );
`;

const NoteBlock = styled.div<{ left: number; width: number; top: number }>`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  width: ${(props) => props.width}px;
  height: 18px;
  background: linear-gradient(135deg, #4a9eff 0%, #357abd 100%);
  border: 1px solid #2a5a8d;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 0.1s;

  &:hover {
    opacity: 0.8;
  }
`;

const Keyboard = styled.div`
  display: flex;
  height: 120px;
  background: #2a2a2a;
  border-top: 2px solid #000;
  padding: 10px;
  gap: 2px;
  overflow-x: auto;
`;

const Key = styled.div<{ isBlack?: boolean; isPressed?: boolean }>`
  width: ${(props) => (props.isBlack ? "30px" : "40px")};
  height: ${(props) => (props.isBlack ? "70px" : "100px")};
  background: ${(props) =>
    props.isPressed
      ? "#4a9eff"
      : props.isBlack
      ? "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)"
      : "linear-gradient(180deg, #ffffff 0%, #e0e0e0 100%)"};
  border: 1px solid ${(props) => (props.isBlack ? "#000" : "#999")};
  border-radius: 0 0 4px 4px;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
  font-size: 10px;
  color: ${(props) => (props.isBlack ? "#666" : "#333")};
  user-select: none;
  transition: all 0.05s;
  box-shadow: ${(props) =>
    props.isPressed
      ? "inset 0 2px 4px rgba(0,0,0,0.3)"
      : "0 2px 4px rgba(0,0,0,0.2)"};

  &:hover {
    background: ${(props) =>
      props.isPressed
        ? "#4a9eff"
        : props.isBlack
        ? "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)"
        : "linear-gradient(180deg, #f5f5f5 0%, #d5d5d5 100%)"};
  }

  &:active {
    transform: translateY(2px);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
  }
`;

const InfoPanel = styled.div`
  padding: 10px 20px;
  background: ${(props) => props.theme.colors.sidebar.background};
  border-top: 1px solid ${(props) => props.theme.colors.sidebar.border};
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.text};
`;

interface MusicKeyboardEditorProps {
  initialTrack?: MusicTrack;
  onTrackChange?: (track: MusicTrack) => void;
}

const MusicKeyboardEditor: FC<MusicKeyboardEditorProps> = ({
  initialTrack,
  onTrackChange,
}) => {
  const [track, setTrack] = useState<MusicTrack | null>(initialTrack || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [pressedKeys, setPressedKeys] = useState<Set<number>>(new Set());
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());
  const [recordedNotes, setRecordedNotes] = useState<MusicNote[]>([]);
  const [recordStartTime, setRecordStartTime] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const gbSoundRef = useRef<GBSoundSystem | null>(null);
  const playerRef = useRef<MusicPlayer | null>(null);

  // Initialize audio
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    gbSoundRef.current = new GBSoundSystem(audioContextRef.current);
    playerRef.current = new MusicPlayer(audioContextRef.current);

    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, []);

  // Update track when initialTrack changes
  useEffect(() => {
    if (initialTrack) {
      setTrack(initialTrack);
    }
  }, [initialTrack]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // QWERTY keyboard mapping to piano keys
      const keyMap: Record<string, number> = {
        'a': 60, 'w': 61, 's': 62, 'e': 63, 'd': 64, 'f': 65, 't': 66, 'g': 67, 'y': 68, 'h': 69, 'u': 70, 'j': 71, 'k': 72,
        'o': 73, 'l': 74, 'p': 75, ';': 76, "'": 77,
        'z': 48, 'x': 50, 'c': 52, 'v': 53, 'b': 55, 'n': 57, 'm': 59, ',': 60, '.': 62, '/': 64
      };

      const midiNote = keyMap[e.key.toLowerCase()];
      if (midiNote && !pressedKeys.has(midiNote)) {
        e.preventDefault();
        handleKeyPress(midiNote);
      }

      // Space = play/stop
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        handlePlay();
      }

      // R = record
      if (e.key.toLowerCase() === 'r' && !e.repeat) {
        e.preventDefault();
        handleRecord();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const keyMap: Record<string, number> = {
        'a': 60, 'w': 61, 's': 62, 'e': 63, 'd': 64, 'f': 65, 't': 66, 'g': 67, 'y': 68, 'h': 69, 'u': 70, 'j': 71, 'k': 72,
        'o': 73, 'l': 74, 'p': 75, ';': 76, "'": 77,
        'z': 48, 'x': 50, 'c': 52, 'v': 53, 'b': 55, 'n': 57, 'm': 59, ',': 60, '.': 62, '/': 64
      };

      const midiNote = keyMap[e.key.toLowerCase()];
      if (midiNote) {
        handleKeyRelease(midiNote);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [pressedKeys, isPlaying, isRecording]);

  // Note names for keyboard
  const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const isBlackKey = (note: number) => [1, 3, 6, 8, 10].includes(note % 12);

  // Generate piano roll notes (C2 to C6)
  const pianoRollNotes = Array.from({ length: 48 }, (_, i) => 36 + i); // MIDI 36-83

  // Play note
  const playNote = (midiNote: number) => {
    if (!gbSoundRef.current) return;

    const frequency = 440 * Math.pow(2, (midiNote - 69) / 12);
    
    gbSoundRef.current.playNote({
      channel: "pulse1",
      enabled: true,
      frequency,
      volume: 12,
      length: 32,
      dutyCycle: 2,
      envelope: {
        initialVolume: 12,
        direction: "decrease",
        sweepPace: 3,
      },
    });

    setActiveNotes((prev) => new Set(prev).add(midiNote));
    setTimeout(() => {
      setActiveNotes((prev) => {
        const next = new Set(prev);
        next.delete(midiNote);
        return next;
      });
    }, 200);
  };

  // Handle keyboard press
  const handleKeyPress = (midiNote: number) => {
    setPressedKeys((prev) => new Set(prev).add(midiNote));
    playNote(midiNote);

    // Record note if recording
    if (isRecording && audioContextRef.current) {
      const currentRecordTime = audioContextRef.current.currentTime - recordStartTime;
      setRecordedNotes((prev) => [
        ...prev,
        {
          pitch: midiNote,
          duration: 0.2, // Will be updated on release
          velocity: 12,
          startTime: currentRecordTime,
        },
      ]);
    }
  };

  const handleKeyRelease = (midiNote: number) => {
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.delete(midiNote);
      return next;
    });
  };

  // Play track
  const handlePlay = () => {
    if (!track || !playerRef.current) return;

    if (isPlaying) {
      playerRef.current.stop();
      setIsPlaying(false);
    } else {
      playerRef.current.play(track);
      setIsPlaying(true);
    }
  };

  // Parse notation
  const handleParse = (notation: string, format: "mml" | "simple" | "abc") => {
    try {
      let parsedTrack: MusicTrack;
      
      switch (format) {
        case "mml":
          parsedTrack = MusicParser.parseMML(notation);
          break;
        case "simple":
          parsedTrack = MusicParser.parseSimple(notation);
          break;
        case "abc":
          parsedTrack = MusicParser.parseABC(notation);
          break;
        default:
          return;
      }

      setTrack(parsedTrack);
      if (onTrackChange) {
        onTrackChange(parsedTrack);
      }
    } catch (error) {
      console.error("Failed to parse notation:", error);
    }
  };

  // Record functionality
  const handleRecord = () => {
    if (!audioContextRef.current) return;

    if (isRecording) {
      // Stop recording and create track
      setIsRecording(false);
      
      if (recordedNotes.length > 0) {
        const newTrack: MusicTrack = {
          name: "Recorded Track",
          tempo: 120,
          timeSignature: { numerator: 4, denominator: 4 },
          channels: [
            {
              channelType: "pulse1",
              notes: recordedNotes,
              volume: 0.8,
              pan: 0.5,
              effects: [],
            },
          ],
        };

        setTrack(newTrack);
        if (onTrackChange) {
          onTrackChange(newTrack);
        }
      }
      
      setRecordedNotes([]);
    } else {
      // Start recording
      setIsRecording(true);
      setRecordedNotes([]);
      setRecordStartTime(audioContextRef.current.currentTime);
    }
  };

  // Clear track
  const handleClear = () => {
    setTrack(null);
    setRecordedNotes([]);
    if (onTrackChange) {
      onTrackChange({
        name: "Empty Track",
        tempo: 120,
        timeSignature: { numerator: 4, denominator: 4 },
        channels: [],
      });
    }
  };

  // Render piano roll
  const renderPianoRoll = () => {
    if (!track || track.channels.length === 0) return null;

    const notes = track.channels[0].notes;
    const pixelsPerSecond = 100;

    return notes.map((note: MusicNote, index: number) => {
      const noteIndex = pianoRollNotes.indexOf(note.pitch);
      if (noteIndex === -1) return null;

      return (
        <NoteBlock
          key={index}
          left={note.startTime * pixelsPerSecond}
          width={note.duration * pixelsPerSecond}
          top={noteIndex * 20}
        />
      );
    });
  };

  // Generate keyboard keys (2 octaves)
  const keyboardKeys = Array.from({ length: 24 }, (_, i) => 60 + i); // C4 to B5

  return (
    <Wrapper>
      <Header>
        <Title>🎹 Music Keyboard Editor</Title>
        <Controls>
          <Button onClick={handlePlay} title="Play/Stop (Space)">
            {isPlaying ? "⏸ Stop" : "▶ Play"}
          </Button>
          <Button 
            onClick={handleRecord} 
            title="Record (R)"
            style={{ 
              background: isRecording ? '#ff4444' : undefined,
              color: isRecording ? '#fff' : undefined 
            }}
          >
            {isRecording ? "⏺ Recording..." : "⏺ Record"}
          </Button>
          <Button onClick={() => handleParse("T120 O4 L4 C D E F G A B O5 C", "mml")}>
            Load Example
          </Button>
          <Button onClick={handleClear}>
            Clear
          </Button>
        </Controls>
      </Header>

      <EditorArea>
        <PianoRoll>
          <PianoKeys>
            {pianoRollNotes.map((midiNote) => {
              const noteName = noteNames[midiNote % 12];
              const octave = Math.floor(midiNote / 12) - 1;
              return (
                <PianoKey
                  key={midiNote}
                  isBlack={isBlackKey(midiNote)}
                  isActive={activeNotes.has(midiNote)}
                  onClick={() => playNote(midiNote)}
                >
                  {!isBlackKey(midiNote) && `${noteName}${octave}`}
                </PianoKey>
              );
            })}
          </PianoKeys>
          <Timeline>{renderPianoRoll()}</Timeline>
        </PianoRoll>

        <Keyboard>
          {keyboardKeys.map((midiNote) => {
            const noteName = noteNames[midiNote % 12];
            const octave = Math.floor(midiNote / 12) - 1;
            const black = isBlackKey(midiNote);

            return (
              <Key
                key={midiNote}
                isBlack={black}
                isPressed={pressedKeys.has(midiNote) || activeNotes.has(midiNote)}
                onMouseDown={() => handleKeyPress(midiNote)}
                onMouseUp={() => handleKeyRelease(midiNote)}
                onMouseLeave={() => handleKeyRelease(midiNote)}
              >
                {!black && `${noteName}${octave}`}
              </Key>
            );
          })}
        </Keyboard>
      </EditorArea>

      <InfoPanel>
        <div>
          <strong>Track:</strong> {track?.name || "No track loaded"}
        </div>
        <div>
          <strong>Tempo:</strong> {track?.tempo || 0} BPM
        </div>
        <div>
          <strong>Notes:</strong>{" "}
          {track?.channels[0]?.notes.length || recordedNotes.length || 0}
        </div>
        <div>
          <strong>Duration:</strong>{" "}
          {track?.channels[0]?.notes.length
            ? (
                track.channels[0].notes[track.channels[0].notes.length - 1]
                  .startTime +
                track.channels[0].notes[track.channels[0].notes.length - 1]
                  .duration
              ).toFixed(2)
            : 0}
          s
        </div>
        <div>
          <strong>Status:</strong>{" "}
          {isRecording ? "🔴 Recording" : isPlaying ? "▶ Playing" : "⏸ Stopped"}
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '11px', color: '#888' }}>
          Keyboard: ASDFGHJKL (white keys) | WETYU (black keys) | Space (play) | R (record)
        </div>
      </InfoPanel>
    </Wrapper>
  );
};

export default MusicKeyboardEditor;
