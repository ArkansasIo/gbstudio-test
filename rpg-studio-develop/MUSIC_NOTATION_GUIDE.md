# Music Notation System Guide

Complete guide to creating 8-bit music, audio, and sound effects using text-based notation.

## 📋 Table of Contents

1. [Supported Formats](#supported-formats)
2. [Simple Format](#simple-format)
3. [MML Format](#mml-format)
4. [ABC Notation](#abc-notation)
5. [JSON Format](#json-format)
6. [Sound Effects Format](#sound-effects-format)
7. [Usage Examples](#usage-examples)
8. [API Reference](#api-reference)

---

## Supported Formats

The system supports 5 different notation formats:

| Format | Best For | Complexity | File Extension |
|--------|----------|------------|----------------|
| Simple | Quick melodies | Low | `.txt` |
| MML | Retro game music | Medium | `.mml` or `.txt` |
| ABC | Classical music | Medium | `.abc` |
| JSON | Full control | High | `.json` |
| SFX | Sound effects | Low | `.txt` |

---

## Simple Format

### Syntax

```
NOTE:DURATION [NOTE:DURATION ...]
```

- **NOTE**: Note name with octave (e.g., `C4`, `D#5`, `Bb3`)
- **DURATION**: Length in quarter notes (e.g., `4` = quarter, `2` = half, `1` = whole)

### Example

```
# Twinkle Twinkle Little Star
TEMPO: 120

C4:4 C4:4 G4:4 G4:4 A4:4 A4:4 G4:2
F4:4 F4:4 E4:4 E4:4 D4:4 D4:4 C4:2
```

### Notes

- Lines starting with `#` are comments
- `TEMPO:` sets the tempo in BPM
- Supports sharps (`#`) and flats (`b`)
- Octave range: 0-8

---

## MML Format

### Commands

| Command | Description | Example |
|---------|-------------|---------|
| `T` | Tempo | `T120` = 120 BPM |
| `O` | Octave | `O4` = octave 4 |
| `L` | Default length | `L4` = quarter notes |
| `V` | Volume | `V15` = max volume (0-15) |
| `<` | Octave down | `<` |
| `>` | Octave up | `>` |
| `R` | Rest | `R4` = quarter rest |
| `C-B` | Notes | `C4` = quarter C |
| `#` or `+` | Sharp | `C#4` |
| `-` | Flat | `D-4` |

### Length Values

- `1` = Whole note
- `2` = Half note
- `4` = Quarter note
- `8` = Eighth note
- `16` = Sixteenth note
- `32` = Thirty-second note

### Example

```mml
# Mario Theme
T180 O5 L16
E E R E R C E R G R R R O4 G R R R
```

### Advanced Example

```mml
# Megalovania (Undertale)
T120 O4 L16
D D O5 D O4 R A R G# R G R F R D F G
D D O5 D O4 R A R G# R G R F R D F G
C C O5 D O4 R A R G# R G R F R D F G
O3 B B O5 D O4 R A R G# R G R F R D F G
```

---

## ABC Notation

### Header Fields

```
X: Reference number
T: Title
M: Time signature (e.g., 4/4, 3/4, 6/8)
L: Default note length (e.g., 1/4, 1/8)
Q: Tempo (e.g., 1/4=120)
K: Key signature (e.g., C, G, Am)
```

### Notes

- Uppercase = Lower octave (C D E F G A B)
- Lowercase = Higher octave (c d e f g a b)
- `'` = Octave up (c')
- `,` = Octave down (C,)
- `^` = Sharp (^C)
- `_` = Flat (_B)
- `z` = Rest

### Example

```abc
X:1
T:Twinkle Twinkle Little Star
M:4/4
L:1/4
Q:1/4=120
K:C
CCGG AAG2|FFEE DDC2|
GGFF EED2|GGFF EED2|
CCGG AAG2|FFEE DDC2||
```

### Complex Example

```abc
X:1
T:Für Elise (Opening)
M:3/8
L:1/16
Q:3/8=120
K:Am
e^d|e^d eB dc|A3 CEA|B3 EG#B|c3 e^d e|
^d e B d c|A3 C E A|B3 E G# B|c3||
```

---

## JSON Format

### Structure

```json
{
  "name": "Song Name",
  "tempo": 120,
  "timeSignature": { "numerator": 4, "denominator": 4 },
  "channels": [
    {
      "channelType": "pulse1",
      "notes": [
        {
          "pitch": 60,
          "duration": 0.5,
          "velocity": 12,
          "startTime": 0
        }
      ],
      "volume": 0.8,
      "pan": 0.5,
      "effects": []
    }
  ]
}
```

### Channel Types

- `pulse1` - Square wave with frequency sweep
- `pulse2` - Square wave
- `wave` - Custom waveform
- `noise` - Noise generator

### Pitch Values

MIDI note numbers (0-127):
- C4 = 60
- A4 = 69 (440 Hz)
- C5 = 72

### Example

```json
{
  "name": "Victory Fanfare",
  "tempo": 120,
  "timeSignature": { "numerator": 4, "denominator": 4 },
  "channels": [
    {
      "channelType": "pulse1",
      "notes": [
        { "pitch": 60, "duration": 0.5, "velocity": 15, "startTime": 0 },
        { "pitch": 60, "duration": 0.5, "velocity": 15, "startTime": 0.5 },
        { "pitch": 60, "duration": 0.5, "velocity": 15, "startTime": 1.0 },
        { "pitch": 72, "duration": 2.0, "velocity": 15, "startTime": 1.5 }
      ],
      "volume": 0.9,
      "pan": 0.5,
      "effects": []
    }
  ]
}
```

---

## Sound Effects Format

### Syntax

```
NAME | CHANNEL | FREQUENCY | DURATION | ENVELOPE | SWEEP
```

### Fields

- **NAME**: Effect identifier
- **CHANNEL**: `pulse1`, `pulse2`, `wave`, or `noise`
- **FREQUENCY**: Frequency in Hz (0 for noise)
- **DURATION**: Duration in milliseconds
- **ENVELOPE**: `initialVolume,direction,sweepPace`
  - initialVolume: 0-15
  - direction: `increase` or `decrease`
  - sweepPace: 0-7
- **SWEEP**: `time,direction,shift`
  - time: 0-7
  - direction: `increase` or `decrease`
  - shift: 0-7

### Example

```
# UI Sounds
MENU_SELECT | pulse1 | 440 | 50 | 12,decrease,2 | 0,0,0
MENU_CONFIRM | pulse1 | 880 | 100 | 15,decrease,4 | 0,increase,2

# Combat Sounds
SWORD_SWING | pulse1 | 880 | 80 | 15,decrease,2 | 5,decrease,4
EXPLOSION | noise | 0 | 300 | 15,decrease,6 | 0,0,0

# Item Sounds
COIN_PICKUP | pulse1 | 1320 | 60 | 10,decrease,2 | 0,0,0
LEVEL_UP | pulse1 | 880 | 400 | 15,increase,7 | 6,increase,5
```

---

## Usage Examples

### TypeScript/JavaScript

```typescript
import { MusicParser, MusicPlayer } from '@/lib/audio/musicParser';

// Parse MML
const mmlText = "T120 O4 L4 C D E F G A B O5 C";
const track = MusicParser.parseMML(mmlText);

// Parse Simple format
const simpleText = "C4:4 D4:4 E4:4 F4:4 G4:4";
const track2 = MusicParser.parseSimple(simpleText, 120);

// Parse ABC notation
const abcText = `
X:1
T:My Song
M:4/4
L:1/4
K:C
CDEF GABc
`;
const track3 = MusicParser.parseABC(abcText);

// Play track
const audioContext = new AudioContext();
const player = new MusicPlayer(audioContext);
player.play(track);

// Stop playback
player.stop();
```

### Load from File

```typescript
import { MusicParser } from '@/lib/audio/musicParser';

async function loadSong(filename: string) {
  const response = await fetch(filename);
  const text = await response.text();
  
  if (filename.endsWith('.mml')) {
    return MusicParser.parseMML(text);
  } else if (filename.endsWith('.abc')) {
    return MusicParser.parseABC(text);
  } else if (filename.endsWith('.json')) {
    return MusicParser.parseJSON(text);
  } else {
    return MusicParser.parseSimple(text);
  }
}

// Usage
const track = await loadSong('music/examples/mml-song.txt');
player.play(track);
```

### Export to Different Formats

```typescript
import { MusicParser } from '@/lib/audio/musicParser';

// Parse from one format
const track = MusicParser.parseMML("T120 O4 L4 C D E F G");

// Export to MML
const mml = MusicParser.exportMML(track);
console.log(mml); // "T120 O4 C4 D4 E4 F4 G4"

// Export to Simple format
const simple = MusicParser.exportSimple(track);
console.log(simple); // "C4:1.00 D4:1.00 E4:1.00 F4:1.00 G4:1.00"
```

---

## API Reference

### MusicParser

#### Static Methods

##### `parseMML(mml: string): MusicTrack`
Parse MML format string into a music track.

##### `parseABC(abc: string): MusicTrack`
Parse ABC notation string into a music track.

##### `parseSimple(text: string, tempo?: number): MusicTrack`
Parse simple format string into a music track.

##### `parseJSON(json: string): MusicTrack`
Parse JSON format string into a music track.

##### `exportMML(track: MusicTrack): string`
Export music track to MML format.

##### `exportSimple(track: MusicTrack): string`
Export music track to simple format.

##### `midiToFrequency(midi: number): number`
Convert MIDI note number to frequency in Hz.

### MusicPlayer

#### Constructor

```typescript
constructor(audioContext: AudioContext)
```

#### Methods

##### `play(track: MusicTrack): void`
Play a music track.

##### `stop(): void`
Stop current playback.

##### `isPlaying(): boolean`
Check if music is currently playing.

---

## File Locations

```
rpg-studio-develop/
├── music/
│   └── examples/
│       ├── simple-melody.txt      # Simple format examples
│       ├── mml-song.txt           # MML format examples
│       ├── abc-notation.txt       # ABC notation examples
│       ├── sound-effects.txt      # Sound effects library
│       └── full-songs.json        # JSON format examples
├── src/
│   └── lib/
│       └── audio/
│           ├── musicParser.ts     # Parser implementation
│           ├── gbSound.ts         # Game Boy sound system
│           └── types.ts           # Type definitions
└── MUSIC_NOTATION_GUIDE.md        # This file
```

---

## Tips and Best Practices

### 1. Choose the Right Format

- **Simple**: Quick prototyping, simple melodies
- **MML**: Retro game music, chiptunes
- **ABC**: Classical music, folk songs
- **JSON**: Full control, programmatic generation
- **SFX**: Sound effects library

### 2. Tempo Guidelines

- Slow: 60-80 BPM (ballads, ambient)
- Medium: 90-120 BPM (most songs)
- Fast: 130-160 BPM (action, battle themes)
- Very Fast: 170+ BPM (intense action)

### 3. Volume Levels

- Background music: 8-12
- Melody: 12-15
- Sound effects: 10-15
- Bass: 6-10

### 4. Channel Usage

- **Pulse1**: Lead melody, high notes
- **Pulse2**: Harmony, counter-melody
- **Wave**: Bass, pads, special effects
- **Noise**: Drums, percussion, explosions

### 5. Envelope Settings

- **Quick sounds**: Low sweep pace (1-2)
- **Sustained notes**: High sweep pace (5-7)
- **Fade in**: direction = increase
- **Fade out**: direction = decrease

---

## Example Songs

See `music/examples/` for complete examples:

1. **simple-melody.txt** - Twinkle Twinkle Little Star
2. **mml-song.txt** - 10 classic game themes
3. **abc-notation.txt** - 10 classical melodies
4. **sound-effects.txt** - 50+ sound effects
5. **full-songs.json** - 5 complete game tracks

---

## Integration with Game Boy Emulator

The music system integrates with the Game Boy emulator:

```typescript
import { GameBoyEmulator } from '@/lib/gameboy';
import { GBSoundSystem } from '@/lib/audio/gbSound';
import { MusicParser } from '@/lib/audio/musicParser';

// Create emulator with audio
const audioContext = new AudioContext();
const gbSound = new GBSoundSystem(audioContext);

// Parse and play music
const track = MusicParser.parseMML("T120 O4 L4 C D E F G");
// ... play through GB sound channels
```

---

## Troubleshooting

### No Sound

1. Check audio context is running: `audioContext.state === 'running'`
2. Verify volume levels are > 0
3. Check browser audio permissions

### Wrong Pitch

1. Verify octave values (0-8)
2. Check MIDI note numbers (0-127)
3. Ensure frequency calculations are correct

### Timing Issues

1. Verify tempo is set correctly
2. Check note durations
3. Ensure startTime values are sequential

---

## License

Part of RPG Workbench project. See LICENSE file for details.
