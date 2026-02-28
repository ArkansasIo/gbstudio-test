# 🎵 Music Redux Integration

Complete Redux state management for the Music Keyboard Editor and Notation system.

## Overview

The music system is now fully integrated with Redux, providing centralized state management for:
- Keyboard editor state (recording, playback, notes)
- Notation editor state (format, input, output)
- Track management (create, update, delete tracks)
- Pressed keys and active notes tracking

---

## Redux State Structure

### Music State
```typescript
interface MusicState {
  playing: boolean;                    // Legacy: Global music playing state
  currentMusicId: string | null;       // Legacy: Current music ID
  keyboardEditor: KeyboardEditorState; // Keyboard editor state
  notationEditor: NotationEditorState; // Notation editor state
  tracks: Record<string, MusicTrack>;  // Track storage
}
```

### Keyboard Editor State
```typescript
interface KeyboardEditorState {
  isRecording: boolean;                // Recording state
  isPlaying: boolean;                  // Playback state
  currentTrack: MusicTrack | null;     // Current track
  recordedNotes: MusicNote[];          // Notes being recorded
  recordStartTime: number;             // Recording start time
  pressedKeys: number[];               // Currently pressed keys
  activeNotes: number[];               // Currently playing notes
  tempo: number;                       // Tempo (BPM)
  volume: number;                      // Volume (0-1)
  selectedChannel: GBChannel;          // Selected GB channel
}
```

### Notation Editor State
```typescript
interface NotationEditorState {
  format: "simple" | "mml" | "abc" | "json"; // Notation format
  input: string;                              // Input text
  output: string;                             // Output text
  parseError: string | null;                  // Parse error message
}
```

---

## Redux Actions

### Keyboard Editor Actions

#### Recording
```typescript
// Start recording
dispatch(musicActions.startRecording({ startTime: audioContext.currentTime }));

// Stop recording
dispatch(musicActions.stopRecording());

// Add recorded note
dispatch(musicActions.addRecordedNote({
  pitch: 60,
  duration: 0.5,
  velocity: 12,
  startTime: 0.0
}));

// Clear recorded notes
dispatch(musicActions.clearRecordedNotes());
```

#### Playback
```typescript
// Set playing state
dispatch(musicActions.setKeyboardPlaying(true));
dispatch(musicActions.setKeyboardPlaying(false));
```

#### Track Management
```typescript
// Set current track
dispatch(musicActions.setCurrentTrack(track));

// Clear current track
dispatch(musicActions.setCurrentTrack(null));
```

#### Key Tracking
```typescript
// Add pressed key
dispatch(musicActions.addPressedKey(60)); // C4

// Remove pressed key
dispatch(musicActions.removePressedKey(60));

// Set all pressed keys
dispatch(musicActions.setPressedKeys([60, 64, 67])); // C major chord
```

#### Note Tracking
```typescript
// Add active note
dispatch(musicActions.addActiveNote(60));

// Remove active note
dispatch(musicActions.removeActiveNote(60));

// Set all active notes
dispatch(musicActions.setActiveNotes([60, 64, 67]));
```

#### Settings
```typescript
// Set tempo
dispatch(musicActions.setTempo(120));

// Set volume
dispatch(musicActions.setVolume(0.8));

// Set selected channel
dispatch(musicActions.setSelectedChannel("pulse1"));
```

### Notation Editor Actions

```typescript
// Set notation format
dispatch(musicActions.setNotationFormat("mml"));

// Set input text
dispatch(musicActions.setNotationInput("T120 O4 L4 C D E F G"));

// Set output text
dispatch(musicActions.setNotationOutput("Parsed successfully"));

// Set parse error
dispatch(musicActions.setParseError("Invalid notation"));
```

### Track Storage Actions

```typescript
// Add track
dispatch(musicActions.addTrack({ 
  id: "track-1", 
  track: myTrack 
}));

// Update track
dispatch(musicActions.updateTrack({ 
  id: "track-1", 
  track: updatedTrack 
}));

// Remove track
dispatch(musicActions.removeTrack("track-1"));

// Clear all tracks
dispatch(musicActions.clearTracks());
```

### Reset Actions

```typescript
// Reset keyboard editor
dispatch(musicActions.resetKeyboardEditor());

// Reset notation editor
dispatch(musicActions.resetNotationEditor());
```

---

## Redux Selectors

### Keyboard Editor Selectors

```typescript
import * as musicSelectors from "store/features/music/musicSelectors";

// Recording state
const isRecording = useAppSelector(musicSelectors.getIsRecording);
const recordedNotes = useAppSelector(musicSelectors.getRecordedNotes);
const recordStartTime = useAppSelector(musicSelectors.getRecordStartTime);

// Playback state
const isPlaying = useAppSelector(musicSelectors.getIsKeyboardPlaying);
const currentTrack = useAppSelector(musicSelectors.getCurrentTrack);

// Key tracking
const pressedKeys = useAppSelector(musicSelectors.getPressedKeys);
const activeNotes = useAppSelector(musicSelectors.getActiveNotes);
const isKeyPressed = useAppSelector((state) => 
  musicSelectors.getIsKeyPressed(state, 60)
);

// Settings
const tempo = useAppSelector(musicSelectors.getTempo);
const volume = useAppSelector(musicSelectors.getVolume);
const selectedChannel = useAppSelector(musicSelectors.getSelectedChannel);

// Complete state
const keyboardState = useAppSelector(musicSelectors.getKeyboardEditorState);
```

### Notation Editor Selectors

```typescript
// Format and input
const format = useAppSelector(musicSelectors.getNotationFormat);
const input = useAppSelector(musicSelectors.getNotationInput);
const output = useAppSelector(musicSelectors.getNotationOutput);
const parseError = useAppSelector(musicSelectors.getParseError);

// Complete state
const notationState = useAppSelector(musicSelectors.getNotationEditorState);
```

### Track Storage Selectors

```typescript
// All tracks
const allTracks = useAppSelector(musicSelectors.getAllTracks);
const trackCount = useAppSelector(musicSelectors.getTrackCount);
const trackIds = useAppSelector(musicSelectors.getTrackIds);

// Specific track
const track = useAppSelector((state) => 
  musicSelectors.getTrackById(state, "track-1")
);
```

### Computed Selectors

```typescript
// Has data
const hasRecordedNotes = useAppSelector(musicSelectors.getHasRecordedNotes);
const hasCurrentTrack = useAppSelector(musicSelectors.getHasCurrentTrack);

// Track info
const duration = useAppSelector(musicSelectors.getCurrentTrackDuration);
const noteCount = useAppSelector(musicSelectors.getCurrentTrackNoteCount);

// Note state
const isNoteActive = useAppSelector((state) => 
  musicSelectors.getIsNoteActive(state, 60)
);
```

---

## Component Integration

### Using Redux in Components

```typescript
import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import musicActions from "store/features/music/musicActions";
import * as musicSelectors from "store/features/music/musicSelectors";

const MyMusicComponent: FC = () => {
  const dispatch = useAppDispatch();
  
  // Select state
  const isRecording = useAppSelector(musicSelectors.getIsRecording);
  const currentTrack = useAppSelector(musicSelectors.getCurrentTrack);
  const pressedKeys = useAppSelector(musicSelectors.getPressedKeys);
  
  // Dispatch actions
  const handleStartRecording = () => {
    dispatch(musicActions.startRecording({ 
      startTime: Date.now() 
    }));
  };
  
  const handleKeyPress = (key: number) => {
    dispatch(musicActions.addPressedKey(key));
  };
  
  return (
    <div>
      <button onClick={handleStartRecording}>
        {isRecording ? "Stop" : "Start"} Recording
      </button>
      <div>Pressed Keys: {pressedKeys.join(", ")}</div>
    </div>
  );
};
```

### MusicKeyboardEditor Integration

The `MusicKeyboardEditor` component now uses Redux for all state management:

```typescript
const MusicKeyboardEditor: FC<Props> = ({ initialTrack, onTrackChange }) => {
  const dispatch = useAppDispatch();
  
  // Redux state
  const isRecording = useAppSelector(musicSelectors.getIsRecording);
  const isPlaying = useAppSelector(musicSelectors.getIsKeyboardPlaying);
  const track = useAppSelector(musicSelectors.getCurrentTrack);
  const pressedKeys = useAppSelector(musicSelectors.getPressedKeys);
  
  // Handle key press
  const handleKeyPress = (midiNote: number) => {
    dispatch(musicActions.addPressedKey(midiNote));
    playNote(midiNote);
    
    if (isRecording) {
      dispatch(musicActions.addRecordedNote({
        pitch: midiNote,
        duration: 0.2,
        velocity: 12,
        startTime: getCurrentTime()
      }));
    }
  };
  
  // Handle recording
  const handleRecord = () => {
    if (isRecording) {
      dispatch(musicActions.stopRecording());
      // Create track from recorded notes
    } else {
      dispatch(musicActions.startRecording({ 
        startTime: audioContext.currentTime 
      }));
    }
  };
  
  return (
    // ... component JSX
  );
};
```

---

## Files

### Redux State Files
- `src/store/features/music/musicState.ts` - State definition and reducers
- `src/store/features/music/musicSelectors.ts` - State selectors
- `src/store/features/music/musicActions.ts` - Action exports
- `src/store/features/music/musicMiddleware.ts` - Middleware (existing)
- `src/store/hooks.ts` - Typed Redux hooks

### Component Files
- `src/components/music/MusicKeyboardEditor.tsx` - Keyboard editor (Redux integrated)
- `src/components/pages/MusicNotationPage.tsx` - Notation page

### Type Files
- `src/lib/audio/types.ts` - Music type definitions

---

## Benefits of Redux Integration

### Centralized State
- All music state in one place
- Easy to debug with Redux DevTools
- Consistent state across components

### Time Travel Debugging
- Record and replay actions
- Inspect state at any point
- Debug complex interactions

### State Persistence
- Easy to save/load state
- Undo/redo functionality
- Session recovery

### Component Decoupling
- Components don't need to pass state
- Easy to add new components
- Simplified component logic

### Testing
- Easy to test reducers
- Mock state for component tests
- Predictable state changes

---

## Usage Examples

### Example 1: Recording a Song

```typescript
// Start recording
dispatch(musicActions.startRecording({ 
  startTime: audioContext.currentTime 
}));

// Play notes (automatically recorded)
dispatch(musicActions.addRecordedNote({
  pitch: 60, duration: 0.5, velocity: 12, startTime: 0.0
}));
dispatch(musicActions.addRecordedNote({
  pitch: 64, duration: 0.5, velocity: 12, startTime: 0.5
}));
dispatch(musicActions.addRecordedNote({
  pitch: 67, duration: 0.5, velocity: 12, startTime: 1.0
}));

// Stop recording
dispatch(musicActions.stopRecording());

// Get recorded notes
const notes = useAppSelector(musicSelectors.getRecordedNotes);

// Create track
const track: MusicTrack = {
  name: "My Song",
  tempo: 120,
  timeSignature: { numerator: 4, denominator: 4 },
  channels: [{
    channelType: "pulse1",
    notes: notes,
    volume: 0.8,
    pan: 0.5,
    effects: []
  }]
};

// Set as current track
dispatch(musicActions.setCurrentTrack(track));

// Save track
dispatch(musicActions.addTrack({ id: "song-1", track }));
```

### Example 2: Playing a Track

```typescript
// Load track
const track = useAppSelector((state) => 
  musicSelectors.getTrackById(state, "song-1")
);

if (track) {
  // Set as current
  dispatch(musicActions.setCurrentTrack(track));
  
  // Start playback
  dispatch(musicActions.setKeyboardPlaying(true));
  
  // Play through audio system
  const player = new MusicPlayer(audioContext);
  player.play(track);
  
  // Stop playback
  setTimeout(() => {
    dispatch(musicActions.setKeyboardPlaying(false));
    player.stop();
  }, 5000);
}
```

### Example 3: Keyboard Input

```typescript
// Handle key press
const handleKeyDown = (e: KeyboardEvent) => {
  const keyMap = { 'a': 60, 's': 62, 'd': 64 }; // C, D, E
  const midiNote = keyMap[e.key];
  
  if (midiNote) {
    // Add to pressed keys
    dispatch(musicActions.addPressedKey(midiNote));
    
    // Play note
    playNote(midiNote);
    
    // Add to active notes
    dispatch(musicActions.addActiveNote(midiNote));
    
    // Record if recording
    const isRecording = useAppSelector(musicSelectors.getIsRecording);
    if (isRecording) {
      dispatch(musicActions.addRecordedNote({
        pitch: midiNote,
        duration: 0.2,
        velocity: 12,
        startTime: getCurrentTime()
      }));
    }
  }
};

// Handle key release
const handleKeyUp = (e: KeyboardEvent) => {
  const keyMap = { 'a': 60, 's': 62, 'd': 64 };
  const midiNote = keyMap[e.key];
  
  if (midiNote) {
    dispatch(musicActions.removePressedKey(midiNote));
    dispatch(musicActions.removeActiveNote(midiNote));
  }
};
```

---

## Testing

### Testing Reducers

```typescript
import reducer, { actions, initialState } from "./musicState";

test("should start recording", () => {
  const state = reducer(
    initialState,
    actions.startRecording({ startTime: 1000 })
  );
  
  expect(state.keyboardEditor.isRecording).toBe(true);
  expect(state.keyboardEditor.recordStartTime).toBe(1000);
});

test("should add pressed key", () => {
  const state = reducer(
    initialState,
    actions.addPressedKey(60)
  );
  
  expect(state.keyboardEditor.pressedKeys).toContain(60);
});
```

### Testing Selectors

```typescript
import * as selectors from "./musicSelectors";

test("should select recording state", () => {
  const state = {
    music: {
      ...initialState,
      keyboardEditor: {
        ...initialState.keyboardEditor,
        isRecording: true
      }
    }
  };
  
  expect(selectors.getIsRecording(state)).toBe(true);
});
```

### Testing Components

```typescript
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import MusicKeyboardEditor from "./MusicKeyboardEditor";

test("should render keyboard editor", () => {
  const store = configureStore({
    reducer: { music: musicReducer }
  });
  
  const { getByText } = render(
    <Provider store={store}>
      <MusicKeyboardEditor />
    </Provider>
  );
  
  expect(getByText("Music Keyboard Editor")).toBeInTheDocument();
});
```

---

## Migration Guide

### Before (Local State)
```typescript
const [isRecording, setIsRecording] = useState(false);
const [track, setTrack] = useState<MusicTrack | null>(null);
const [pressedKeys, setPressedKeys] = useState<Set<number>>(new Set());

const handleRecord = () => {
  setIsRecording(!isRecording);
};
```

### After (Redux State)
```typescript
const dispatch = useAppDispatch();
const isRecording = useAppSelector(musicSelectors.getIsRecording);
const track = useAppSelector(musicSelectors.getCurrentTrack);
const pressedKeys = useAppSelector(musicSelectors.getPressedKeys);

const handleRecord = () => {
  if (isRecording) {
    dispatch(musicActions.stopRecording());
  } else {
    dispatch(musicActions.startRecording({ startTime: Date.now() }));
  }
};
```

---

## Summary

✅ **Complete Redux Integration**  
✅ **Centralized State Management**  
✅ **Type-Safe Actions and Selectors**  
✅ **Time Travel Debugging**  
✅ **Easy Testing**  
✅ **Component Decoupling**  

The music system is now fully integrated with Redux, providing a robust and scalable state management solution for the keyboard editor and notation system.

---

**Status**: ✅ Complete  
**Version**: 1.0.0  
**Last Updated**: 2026-02-28
