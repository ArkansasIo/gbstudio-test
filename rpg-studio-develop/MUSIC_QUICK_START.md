# Music Notation Quick Start

Quick guide to creating 8-bit music using text files.

## 🎵 Simplest Way: Simple Format

Create a `.txt` file:

```
TEMPO: 120

C4:4 D4:4 E4:4 F4:4 G4:4 A4:4 B4:4 C5:2
```

Format: `NOTE:DURATION` where:
- NOTE = Note name + octave (C4, D#5, Bb3)
- DURATION = Quarter notes (4=quarter, 2=half, 1=whole, 8=eighth)

## 🎮 Retro Style: MML Format

```mml
T120 O4 L4 C D E F G A B O5 C
```

Commands:
- `T120` = Tempo 120 BPM
- `O4` = Octave 4
- `L4` = Default quarter notes
- `C D E` = Notes
- `C#` or `C+` = Sharp
- `C-` = Flat
- `R` = Rest

## 🎼 Classical: ABC Notation

```abc
X:1
T:My Song
M:4/4
L:1/4
Q:1/4=120
K:C
CDEF GABc
```

## 🔊 Sound Effects

Create `sound-effects.txt`:

```
JUMP | pulse1 | 440 | 100 | 12,decrease,3 | 4,increase,3
COIN | pulse1 | 1320 | 60 | 10,decrease,2 | 0,0,0
```

Format: `NAME | CHANNEL | FREQ | DURATION | ENVELOPE | SWEEP`

## 📝 Usage

### Command Line

```bash
# View music info
npm run play:music music/examples/simple-melody.txt

# Export to MML
npm run play:music music/examples/simple-melody.txt --export
```

### In Code

```typescript
import { MusicParser, MusicPlayer } from '@/lib/audio/musicParser';

const audioContext = new AudioContext();
const player = new MusicPlayer(audioContext);

// Parse and play
const track = MusicParser.parseMML("T120 O4 L4 C D E F G");
player.play(track);
```

## 📚 Examples

See `music/examples/` for:
- `simple-melody.txt` - Simple format examples
- `mml-song.txt` - 10 classic game themes
- `abc-notation.txt` - 10 classical songs
- `sound-effects.txt` - 50+ sound effects
- `full-songs.json` - Complete game tracks

## 🎹 Note Reference

| Note | Octave 3 | Octave 4 | Octave 5 |
|------|----------|----------|----------|
| C    | 130 Hz   | 262 Hz   | 523 Hz   |
| D    | 147 Hz   | 294 Hz   | 587 Hz   |
| E    | 165 Hz   | 330 Hz   | 659 Hz   |
| F    | 175 Hz   | 349 Hz   | 698 Hz   |
| G    | 196 Hz   | 392 Hz   | 784 Hz   |
| A    | 220 Hz   | 440 Hz   | 880 Hz   |
| B    | 247 Hz   | 494 Hz   | 988 Hz   |

## 🎵 Common Patterns

### Scale
```
C4:4 D4:4 E4:4 F4:4 G4:4 A4:4 B4:4 C5:2
```

### Arpeggio
```
C4:8 E4:8 G4:8 C5:8 G4:8 E4:8 C4:4
```

### Melody + Bass
```json
{
  "channels": [
    { "channelType": "pulse1", "notes": [...] },
    { "channelType": "pulse2", "notes": [...] }
  ]
}
```

## 🔧 Tips

1. **Tempo**: 120 BPM is standard, 140+ for action, 80- for slow
2. **Octaves**: Use 3-5 for most melodies
3. **Channels**: pulse1=melody, pulse2=harmony, wave=bass, noise=drums
4. **Volume**: 12-15 for melody, 8-10 for background

## 📖 Full Documentation

See `MUSIC_NOTATION_GUIDE.md` for complete reference.
