# 🎹 Music Keyboard Editor

Complete visual music composition tool with piano roll, interactive keyboard, and 8-bit audio playback.

## Features

### Visual Piano Roll
- 48-note range (C2 to C6)
- Timeline visualization with note blocks
- Click piano keys to preview notes
- Real-time note highlighting during playback

### Interactive Keyboard
- 2-octave visual keyboard (C4 to B5)
- Click keys to play notes
- Visual feedback for pressed keys
- Game Boy sound emulation

### Recording System
- Record notes in real-time
- Automatic track creation from recording
- Visual recording indicator
- Converts recorded notes to MusicTrack format

### Playback System
- Play parsed music tracks
- Game Boy sound hardware emulation
- 4 channels: Pulse 1, Pulse 2, Wave, Noise
- Real-time note visualization

### Keyboard Shortcuts
```
Piano Keys (QWERTY Keyboard):
  White Keys: A S D F G H J K L ; '
  Black Keys: W E T Y U O P
  Lower Octave: Z X C V B N M , . /

Controls:
  Space - Play/Stop
  R - Record/Stop Recording
```

## Usage

### Access the Editor
1. Open RPG Studio
2. Navigate to: **Music > Music Notation & Keyboard Editor**
3. Or use keyboard shortcut: **Ctrl+Shift+M**

### Load Music
```typescript
// Parse notation and load into editor
const track = MusicParser.parseMML("T120 O4 L4 C D E F G A B O5 C");
// Track automatically loads into keyboard editor
```

### Record Music
1. Click "Record" button (or press R)
2. Play notes on keyboard (mouse or QWERTY keys)
3. Click "Stop Recording" (or press R again)
4. Track is automatically created and displayed

### Play Music
1. Load or record a track
2. Click "Play" button (or press Space)
3. Watch notes highlight in real-time
4. Click "Stop" to stop playback

### Export Music
```typescript
// Export to MML format
const mml = MusicParser.exportMML(track);
// Output: "T120 O4 L4 C D E F G A B O5 C"

// Export to Simple format
const simple = MusicParser.exportSimple(track);
// Output: "C4:1.00 D4:1.00 E4:1.00 F4:1.00 G4:1.00"
```

## Integration

### Component Props
```typescript
interface MusicKeyboardEditorProps {
  initialTrack?: MusicTrack;
  onTrackChange?: (track: MusicTrack) => void;
}
```

### Example Usage
```typescript
import MusicKeyboardEditor from "@/components/music/MusicKeyboardEditor";

function MyComponent() {
  const [track, setTrack] = useState<MusicTrack>();

  return (
    <MusicKeyboardEditor
      initialTrack={track}
      onTrackChange={(newTrack) => {
        setTrack(newTrack);
        console.log("Track updated:", newTrack);
      }}
    />
  );
}
```

## Music Track Format

```typescript
interface MusicTrack {
  name: string;
  tempo: number; // BPM
  timeSignature: {
    numerator: number;
    denominator: number;
  };
  channels: MusicChannel[];
}

interface MusicChannel {
  channelType: 'pulse1' | 'pulse2' | 'wave' | 'noise';
  notes: MusicNote[];
  volume: number; // 0-1
  pan: number; // 0-1
  effects: any[];
}

interface MusicNote {
  pitch: number; // MIDI note number (0-127)
  duration: number; // Duration in seconds
  velocity: number; // Volume 0-15
  startTime: number; // Start time in seconds
}
```

## Game Boy Sound Integration

The keyboard editor uses authentic Game Boy sound hardware emulation:

### Pulse Channels (1 & 2)
- Square wave with 4 duty cycles (12.5%, 25%, 50%, 75%)
- Frequency sweep (Channel 1 only)
- Volume envelope (ADSR)
- Frequency range: 64 Hz - 131 kHz

### Wave Channel (3)
- Custom 32-sample waveform
- 4-bit samples (0-15)
- Programmable wave patterns
- Lower volume than pulse channels

### Noise Channel (4)
- White noise or periodic noise
- 15-bit or 7-bit LFSR
- Configurable frequency
- Perfect for percussion and effects

## Notation Formats

### MML (Music Macro Language)
```
T120 O4 L4 C D E F G A B O5 C
```
- T = Tempo
- O = Octave
- L = Default length
- Notes: C D E F G A B
- Modifiers: # (sharp), - (flat)

### Simple Format
```
C4:4 D4:4 E4:4 F4:4 G4:2
```
- Format: NOTE:DURATION
- Duration in quarter notes

### ABC Notation
```
X:1
T:My Song
M:4/4
L:1/4
K:C
CDEF GABc
```
- Classical music notation
- Header with metadata
- Standard note names

## Examples

### Load Example Song
```typescript
// Mario Theme
const mario = MusicParser.parseMML("T200 O5 L16 E E R E R C E R G R4 O4 G");

// Zelda Theme
const zelda = MusicParser.parseMML("T120 O5 L4 B O6 D O5 A R B R O6 C# R D");

// Tetris Theme
const tetris = MusicParser.parseMML("T150 O5 L8 E B C D C B A A C E D C B B C D E C A A");
```

### Create Custom Track
```typescript
const customTrack: MusicTrack = {
  name: "My Song",
  tempo: 120,
  timeSignature: { numerator: 4, denominator: 4 },
  channels: [
    {
      channelType: "pulse1",
      notes: [
        { pitch: 60, duration: 0.5, velocity: 12, startTime: 0 },
        { pitch: 62, duration: 0.5, velocity: 12, startTime: 0.5 },
        { pitch: 64, duration: 0.5, velocity: 12, startTime: 1.0 },
        { pitch: 65, duration: 0.5, velocity: 12, startTime: 1.5 },
      ],
      volume: 0.8,
      pan: 0.5,
      effects: [],
    },
  ],
};
```

## Files

### Components
- `src/components/music/MusicKeyboardEditor.tsx` - Main editor component
- `src/components/pages/MusicNotationPage.tsx` - Page with editor + parser

### Libraries
- `src/lib/audio/musicParser.ts` - Music notation parser
- `src/lib/audio/gbSound.ts` - Game Boy sound emulation
- `src/lib/audio/types.ts` - Type definitions

### Examples
- `music/examples/simple-melody.txt` - Simple format examples
- `music/examples/mml-song.txt` - MML format examples (10 songs)
- `music/examples/abc-notation.txt` - ABC format examples (10 songs)
- `music/examples/sound-effects.txt` - 50+ sound effects
- `music/examples/full-songs.json` - Complete tracks in JSON

## CLI Tools

### Play Music File
```bash
npm run play:music music/examples/simple-melody.txt
```

### Process Music Batch
```bash
# Convert all .txt files to .json
node scripts/processMusicBatch.js music/examples
```

## Tips

1. **Recording**: Start with simple melodies, then add complexity
2. **Keyboard Layout**: Use ASDFGHJKL for white keys (like a piano)
3. **Shortcuts**: Learn Space (play) and R (record) for quick workflow
4. **Export**: Use MML format for compact notation
5. **Game Boy Sound**: Pulse channels are best for melodies
6. **Noise Channel**: Perfect for drums and percussion
7. **Wave Channel**: Use for bass lines and special effects

## Troubleshooting

### No Sound
- Check browser audio permissions
- Ensure audio context is initialized
- Try clicking "Play" button to resume audio context

### Recording Not Working
- Click "Record" button first
- Play notes on keyboard
- Click "Stop Recording" to finish

### Keyboard Shortcuts Not Working
- Click on the editor area to focus
- Check if another element has focus
- Try clicking the keyboard area

### Notes Not Displaying
- Ensure track has notes in channel 0
- Check track format is correct
- Try loading an example track

## Related Documentation

- [Music Notation Guide](MUSIC_NOTATION_GUIDE.md) - Complete notation reference
- [Audio System](AUDIO_AND_GAMEBOY_SYSTEM.md) - Game Boy sound hardware
- [Music Quick Start](MUSIC_QUICK_START.md) - Getting started guide
- [Navigation Menu](NAVIGATION_MENU_UPDATE.md) - UI navigation

## API Reference

### MusicParser
```typescript
// Parse notation
MusicParser.parseMML(mml: string): MusicTrack
MusicParser.parseSimple(text: string, tempo?: number): MusicTrack
MusicParser.parseABC(abc: string): MusicTrack
MusicParser.parseJSON(json: string): MusicTrack

// Export notation
MusicParser.exportMML(track: MusicTrack): string
MusicParser.exportSimple(track: MusicTrack): string

// Utilities
MusicParser.midiToFrequency(midi: number): number
```

### MusicPlayer
```typescript
const player = new MusicPlayer(audioContext);

// Playback
player.play(track: MusicTrack): void
player.stop(): void
player.isPlaying(): boolean
```

### GBSoundSystem
```typescript
const gbSound = new GBSoundSystem(audioContext);

// Play note
gbSound.playNote(config: GBSoundChannel): void

// Control
gbSound.stopChannel(channel: GBChannel): void
gbSound.stopAll(): void
gbSound.setMasterVolume(volume: number): void
```

## Future Enhancements

- [ ] Multi-track editing
- [ ] Note editing (drag, resize, delete)
- [ ] Tempo changes
- [ ] Time signature changes
- [ ] Channel selection
- [ ] Effect controls (reverb, delay)
- [ ] MIDI input support
- [ ] Export to MIDI file
- [ ] Undo/redo functionality
- [ ] Copy/paste notes
- [ ] Quantization
- [ ] Metronome
- [ ] Loop regions
- [ ] Zoom controls

---

**Status**: ✅ Complete and Integrated
**Version**: 1.0.0
**Last Updated**: 2026-02-28
