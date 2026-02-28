import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { MusicTrack, MusicNote, MusicChannel } from "lib/audio/types";

export interface KeyboardEditorState {
  isRecording: boolean;
  isPlaying: boolean;
  currentTrack: MusicTrack | null;
  recordedNotes: MusicNote[];
  recordStartTime: number;
  pressedKeys: number[];
  activeNotes: number[];
  tempo: number;
  volume: number;
  selectedChannel: "pulse1" | "pulse2" | "wave" | "noise";
}

export interface NotationEditorState {
  format: "simple" | "mml" | "abc" | "json";
  input: string;
  output: string;
  parseError: string | null;
}

export interface MusicState {
  playing: boolean;
  currentMusicId: string | null;
  keyboardEditor: KeyboardEditorState;
  notationEditor: NotationEditorState;
  tracks: Record<string, MusicTrack>;
}

export const initialState: MusicState = {
  playing: false,
  currentMusicId: null,
  keyboardEditor: {
    isRecording: false,
    isPlaying: false,
    currentTrack: null,
    recordedNotes: [],
    recordStartTime: 0,
    pressedKeys: [],
    activeNotes: [],
    tempo: 120,
    volume: 0.8,
    selectedChannel: "pulse1",
  },
  notationEditor: {
    format: "mml",
    input: "T120 O4 L4 C D E F G A B O5 C",
    output: "",
    parseError: null,
  },
  tracks: {},
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    // Legacy music actions
    playMusic: (state, action: PayloadAction<{ musicId: string }>) => {
      state.playing = true;
      state.currentMusicId = action.payload.musicId;
    },
    pauseMusic: (state, _action: PayloadAction<void>) => {
      state.playing = false;
    },

    // Keyboard Editor Actions
    startRecording: (state, action: PayloadAction<{ startTime: number }>) => {
      state.keyboardEditor.isRecording = true;
      state.keyboardEditor.recordStartTime = action.payload.startTime;
      state.keyboardEditor.recordedNotes = [];
    },
    stopRecording: (state) => {
      state.keyboardEditor.isRecording = false;
    },
    addRecordedNote: (state, action: PayloadAction<MusicNote>) => {
      state.keyboardEditor.recordedNotes.push(action.payload);
    },
    clearRecordedNotes: (state) => {
      state.keyboardEditor.recordedNotes = [];
    },
    setKeyboardPlaying: (state, action: PayloadAction<boolean>) => {
      state.keyboardEditor.isPlaying = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<MusicTrack | null>) => {
      state.keyboardEditor.currentTrack = action.payload;
    },
    setPressedKeys: (state, action: PayloadAction<number[]>) => {
      state.keyboardEditor.pressedKeys = action.payload;
    },
    addPressedKey: (state, action: PayloadAction<number>) => {
      if (!state.keyboardEditor.pressedKeys.includes(action.payload)) {
        state.keyboardEditor.pressedKeys.push(action.payload);
      }
    },
    removePressedKey: (state, action: PayloadAction<number>) => {
      state.keyboardEditor.pressedKeys = state.keyboardEditor.pressedKeys.filter(
        (key) => key !== action.payload
      );
    },
    setActiveNotes: (state, action: PayloadAction<number[]>) => {
      state.keyboardEditor.activeNotes = action.payload;
    },
    addActiveNote: (state, action: PayloadAction<number>) => {
      if (!state.keyboardEditor.activeNotes.includes(action.payload)) {
        state.keyboardEditor.activeNotes.push(action.payload);
      }
    },
    removeActiveNote: (state, action: PayloadAction<number>) => {
      state.keyboardEditor.activeNotes = state.keyboardEditor.activeNotes.filter(
        (note) => note !== action.payload
      );
    },
    setTempo: (state, action: PayloadAction<number>) => {
      state.keyboardEditor.tempo = action.payload;
      if (state.keyboardEditor.currentTrack) {
        state.keyboardEditor.currentTrack.tempo = action.payload;
      }
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.keyboardEditor.volume = action.payload;
    },
    setSelectedChannel: (
      state,
      action: PayloadAction<"pulse1" | "pulse2" | "wave" | "noise">
    ) => {
      state.keyboardEditor.selectedChannel = action.payload;
    },

    // Notation Editor Actions
    setNotationFormat: (
      state,
      action: PayloadAction<"simple" | "mml" | "abc" | "json">
    ) => {
      state.notationEditor.format = action.payload;
    },
    setNotationInput: (state, action: PayloadAction<string>) => {
      state.notationEditor.input = action.payload;
    },
    setNotationOutput: (state, action: PayloadAction<string>) => {
      state.notationEditor.output = action.payload;
    },
    setParseError: (state, action: PayloadAction<string | null>) => {
      state.notationEditor.parseError = action.payload;
    },

    // Track Management Actions
    addTrack: (state, action: PayloadAction<{ id: string; track: MusicTrack }>) => {
      state.tracks[action.payload.id] = action.payload.track;
    },
    updateTrack: (state, action: PayloadAction<{ id: string; track: MusicTrack }>) => {
      state.tracks[action.payload.id] = action.payload.track;
    },
    removeTrack: (state, action: PayloadAction<string>) => {
      delete state.tracks[action.payload];
    },
    clearTracks: (state) => {
      state.tracks = {};
    },

    // Reset Actions
    resetKeyboardEditor: (state) => {
      state.keyboardEditor = initialState.keyboardEditor;
    },
    resetNotationEditor: (state) => {
      state.notationEditor = initialState.notationEditor;
    },
  },
});

export const { actions } = musicSlice;

export default musicSlice.reducer;
