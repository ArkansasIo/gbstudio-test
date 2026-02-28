import { RootState } from "store/configureStore";
import type { MusicTrack, MusicNote } from "lib/audio/types";

// Legacy Music Selectors
export const getIsPlaying = (state: RootState): boolean => state.music.playing;
export const getCurrentMusicId = (state: RootState): string | null => state.music.currentMusicId;

// Keyboard Editor Selectors
export const getIsRecording = (state: RootState): boolean => 
  state.music.keyboardEditor.isRecording;

export const getIsKeyboardPlaying = (state: RootState): boolean => 
  state.music.keyboardEditor.isPlaying;

export const getCurrentTrack = (state: RootState): MusicTrack | null => 
  state.music.keyboardEditor.currentTrack;

export const getRecordedNotes = (state: RootState): MusicNote[] => 
  state.music.keyboardEditor.recordedNotes;

export const getRecordStartTime = (state: RootState): number => 
  state.music.keyboardEditor.recordStartTime;

export const getPressedKeys = (state: RootState): number[] => 
  state.music.keyboardEditor.pressedKeys;

export const getActiveNotes = (state: RootState): number[] => 
  state.music.keyboardEditor.activeNotes;

export const getTempo = (state: RootState): number => 
  state.music.keyboardEditor.tempo;

export const getVolume = (state: RootState): number => 
  state.music.keyboardEditor.volume;

export const getSelectedChannel = (state: RootState): "pulse1" | "pulse2" | "wave" | "noise" => 
  state.music.keyboardEditor.selectedChannel;

export const getKeyboardEditorState = (state: RootState) => 
  state.music.keyboardEditor;

// Notation Editor Selectors
export const getNotationFormat = (state: RootState): "simple" | "mml" | "abc" | "json" => 
  state.music.notationEditor.format;

export const getNotationInput = (state: RootState): string => 
  state.music.notationEditor.input;

export const getNotationOutput = (state: RootState): string => 
  state.music.notationEditor.output;

export const getParseError = (state: RootState): string | null => 
  state.music.notationEditor.parseError;

export const getNotationEditorState = (state: RootState) => 
  state.music.notationEditor;

// Track Management Selectors
export const getAllTracks = (state: RootState): Record<string, MusicTrack> => 
  state.music.tracks;

export const getTrackById = (state: RootState, id: string): MusicTrack | undefined => 
  state.music.tracks[id];

export const getTrackCount = (state: RootState): number => 
  Object.keys(state.music.tracks).length;

export const getTrackIds = (state: RootState): string[] => 
  Object.keys(state.music.tracks);

// Computed Selectors
export const getHasRecordedNotes = (state: RootState): boolean => 
  state.music.keyboardEditor.recordedNotes.length > 0;

export const getHasCurrentTrack = (state: RootState): boolean => 
  state.music.keyboardEditor.currentTrack !== null;

export const getCurrentTrackDuration = (state: RootState): number => {
  const track = state.music.keyboardEditor.currentTrack;
  if (!track || track.channels.length === 0) return 0;
  
  const notes = track.channels[0].notes;
  if (notes.length === 0) return 0;
  
  const lastNote = notes[notes.length - 1];
  return lastNote.startTime + lastNote.duration;
};

export const getCurrentTrackNoteCount = (state: RootState): number => {
  const track = state.music.keyboardEditor.currentTrack;
  if (!track || track.channels.length === 0) return 0;
  return track.channels[0].notes.length;
};

export const getIsKeyPressed = (state: RootState, key: number): boolean => 
  state.music.keyboardEditor.pressedKeys.includes(key);

export const getIsNoteActive = (state: RootState, note: number): boolean => 
  state.music.keyboardEditor.activeNotes.includes(note);
