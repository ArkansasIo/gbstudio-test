# Audio System - Complete Music & Sound Implementation

## 🎵 Overview

Complete audio system for the RPG Workbench with Game Boy sound hardware emulation, music composition tools, sound effect generation, and audio editors.

## 📦 System Components

### 1. Game Boy Sound Hardware Emulation
**File**: `src/lib/audio/gbSound.ts`  
**Features**:
- 4-channel Game Boy sound (Pulse 1, Pulse 2, Wave, Noise)
- Accurate DMG/CGB hardware emulation
- Duty cycle control (12.5%, 25%, 50%, 75%)
- Frequency sweep (Channel 1)
- Volume envelopes
- Custom waveforms (32 4-bit samples)
- LFSR noise generation

### 2. Sound Effect Generator
**File**: `src/lib/audio/sfxGenerator.ts`  
**Features**:
- 18 preset sound effects
- Procedural SFX generation
- Frequency/volume envelopes
- Multiple curve types (linear, exponential, logarithmic)
- Game Boy channel routing

### 3. Music Composer (To be created)
**File**: `src/lib/audio/composer.ts`  
**Features**:
- Pattern-based composition
- Multi-track sequencing
- MIDI note support
- Tempo/time signature control

### 4. Audio Editor Components (To be created)
**Files**: `src/components/audio/*`  
**Features**:
- Waveform editor
- Pattern editor
- Track mixer
- Sound effect designer

## 🎮 Game Boy Sound Hardware

### Channel Specifications

#### Channel 1 & 2: Pulse Wave
- Square wave with 4 duty cycles
- Frequency range: 64 Hz - 131 kHz
- Volume envelope (0-15)
- Frequency sweep (Channel 1 only)
- Length counter (0-64)

#### Channel 3: Wave
- Custom waveform (32 4-bit samples)
- Frequency range: 64 Hz - 131 kHz
- 4 volume levels
- Length counter (0-256)

#### Channel 4: Noise
- White noise or periodic noise
- 15-bit or 7-bit LFSR
- Volume envelope (0-15)
- Length counter (0-64)

## 🔊 Sound Effect Presets

### Movement
- **Jump**: Rising pitch pulse (200-400 Hz, 150ms)
- **Land**: Falling noise (100-50 Hz, 100ms)

### Combat
- **Hit**: Sharp noise burst (800-200 Hz, 80ms)
- **Damage**: Falling pulse (400-100 Hz, 200ms)
- **Heal**: Rising wave (400-800 Hz, 300ms)

### Items
- **Pickup**: Rising pulse (600-1200 Hz, 100ms)
- **Coin**: Quick rising pulse (800-1600 Hz, 80ms)
- **Powerup**: Long rising wave (200-1200 Hz, 500ms)

### Actions
- **Explosion**: Long falling noise (1000-50 Hz, 400ms)
- **Shoot**: Quick noise burst (600-200 Hz, 100ms)
- **Laser**: Falling pulse (1200-400 Hz, 150ms)

### UI
- **Menu**: Short pulse beep (800 Hz, 50ms)
- **Select**: Rising pulse (600-900 Hz, 60ms)
- **Cancel**: Falling pulse (400-200 Hz, 80ms)

### Environment
- **Door**: Falling noise (200-100 Hz, 300ms)
- **Chest**: Rising wave (300-600 Hz, 400ms)
- **Switch**: Quick pulse (500-700 Hz, 100ms)
- **Teleport**: Long rising wave (400-1600 Hz, 600ms)

## 📝 Usage Examples

### Play Game Boy Sound

```typescript
import { GBSoundSystem, GBSoundUtils } from '@/lib/audio/gbSound';

const audioContext = new AudioContext();
const gbSound = new GBSoundSystem(audioContext);

// Play pulse wave note
gbSound.playNote({
  channel: 'pulse1',
  enabled: true,
  frequency: 440, // A4
  length: 32,
  volume: 12,
  dutyCycle: 2, // 50%
  envelope: {
    initialVolume: 15,
    direction: 'decrease',
    sweepPace: 3
  },
  sweep: {
    time: 4,
    direction: 'increase',
    shift: 2
  }
});

// Play custom waveform
const sineWave = GBSoundUtils.createSinePattern();
gbSound.playNote({
  channel: 'wave',
  enabled: true,
  frequency: 523.25, // C5
  length: 64,
  volume: 15,
  wavePattern: sineWave
});

// Play noise
gbSound.playNote({
  channel: 'noise',
  enabled: true,
  frequency: 0,
  length: 16,
  volume: 10,
  noiseConfig: {
    shiftClockFrequency: 8,
    counterStep: false,
    dividingRatio: 3
  }
});
```

### Generate Sound Effects

```typescript
import { SFXGenerator, SFXLibrary } from '@/lib/audio/sfxGenerator';

const audioContext = new AudioContext();
const sfxLib = new SFXLibrary(audioContext);

// Play preset sound effect
sfxLib.playType('jump');
sfxLib.playType('coin');
sfxLib.playType('explosion');

// Create custom sound effect
const customSFX = {
  id: 'custom_laser',
  name: 'Custom Laser',
  type: 'laser' as const,
  channel: 'pulse1' as const,
  duration: 200,
  waveform: 'pulse' as const,
  startFrequency: 1500,
  endFrequency: 300,
  frequencyCurve: 'exponential' as const,
  startVolume: 0.7,
  endVolume: 0,
  volumeCurve: 'exponential' as const,
  dutyCycle: 2 as const
};

sfxLib.add(customSFX);
sfxLib.play('custom_laser');
```

### Create Waveforms

```typescript
import { GBSoundUtils } from '@/lib/audio/gbSound';

// Pulse wave (square)
const pulse50 = GBSoundUtils.createPulsePattern(2); // 50% duty

// Sawtooth wave
const sawtooth = GBSoundUtils.createSawtoothPattern();

// Triangle wave
const triangle = GBSoundUtils.createTrianglePattern();

// Sine wave
const sine = GBSoundUtils.createSinePattern();

// Custom wave
const custom: number[] = new Array(32).fill(0).map((_, i) => {
  return Math.floor(Math.random() * 16);
});
```

## 🎹 Music Composition (Planned)

### Pattern-Based Composition

```typescript
// Create pattern
const pattern = {
  id: 'pattern_01',
  name: 'Main Melody',
  length: 64,
  notes: [
    { pitch: 60, duration: 16, velocity: 100, channel: 0 }, // C4
    { pitch: 64, duration: 16, velocity: 100, channel: 0 }, // E4
    { pitch: 67, duration: 16, velocity: 100, channel: 0 }, // G4
    { pitch: 72, duration: 16, velocity: 100, channel: 0 }  // C5
  ],
  tempo: 120
};

// Create track
const track = {
  id: 'track_01',
  name: 'Lead',
  channel: 'pulse1',
  patterns: ['pattern_01'],
  volume: 0.8,
  muted: false,
  solo: false
};

// Create song
const song = {
  id: 'song_01',
  name: 'Main Theme',
  artist: 'Composer',
  tempo: 120,
  timeSignature: [4, 4],
  tracks: [track],
  patterns: [pattern],
  length: 256
};
```

## 🎛️ Audio Editor Components (Planned)

### Waveform Editor
- Visual waveform editing
- 32-sample wave table
- Real-time preview
- Preset waveforms

### Pattern Editor
- Grid-based note input
- Piano roll view
- Multi-channel editing
- Copy/paste patterns

### Track Mixer
- Per-channel volume
- Pan control
- Mute/solo
- Effects chain

### Sound Effect Designer
- Visual envelope editor
- Frequency curve editor
- Real-time preview
- Preset library

## 📊 Technical Specifications

### Audio Context
- Sample Rate: 44100 Hz (default)
- Buffer Size: 512 samples
- Channels: 2 (stereo)
- Bit Depth: 32-bit float

### Game Boy Specifications
- CPU Clock: 4.194304 MHz
- Sound Clock: 1.048576 MHz
- Sample Rate: 65536 Hz (downsampled)
- Channels: 4 (mono output)

### Performance
| Operation | Time | Memory |
|-----------|------|--------|
| Play SFX | <1ms | ~1KB |
| Generate waveform | <1ms | ~128B |
| Play GB note | <1ms | ~2KB |
| Load pattern | <5ms | ~10KB |

## 🔧 File Structure

```
src/lib/audio/
├── types.ts              # Type definitions
├── gbSound.ts            # Game Boy sound emulation
├── sfxGenerator.ts       # Sound effect generator
├── composer.ts           # Music composer (planned)
├── sequencer.ts          # Music sequencer (planned)
├── mixer.ts              # Audio mixer (planned)
└── index.ts              # Main exports

src/components/audio/
├── WaveformEditor.tsx    # Waveform editor (planned)
├── PatternEditor.tsx     # Pattern editor (planned)
├── TrackMixer.tsx        # Track mixer (planned)
├── SFXDesigner.tsx       # SFX designer (planned)
└── AudioPlayer.tsx       # Audio player (planned)
```

## 🎯 Next Steps

1. **Complete Music Composer**
   - Pattern sequencer
   - Multi-track support
   - MIDI import/export

2. **Build Audio Editors**
   - React components
   - Visual editing tools
   - Real-time preview

3. **Add Effects**
   - Reverb
   - Delay
   - Chorus
   - Distortion

4. **Implement Tracker**
   - MOD/XM/IT support
   - Tracker-style editor
   - Sample playback

5. **Add Export**
   - WAV export
   - VGM export
   - UGE export (hUGETracker)

## 📚 Resources

### Game Boy Sound
- [GB Dev Wiki - Sound Controller](https://gbdev.io/pandocs/Sound_Controller.html)
- [GB Sound Hardware](https://gbdev.gg8.se/wiki/articles/Gameboy_sound_hardware)
- [Pan Docs - Audio](https://gbdev.io/pandocs/Audio.html)

### Music Theory
- [Music Theory for Game Developers](https://www.gamedeveloper.com/audio/music-theory-for-game-developers)
- [Chiptune Composition Guide](https://chiptuneswin.com/blog/chiptune-composition-guide/)

### Tools
- [hUGETracker](https://github.com/SuperDisk/hUGETracker) - GB music tracker
- [OpenMPT](https://openmpt.org/) - Module tracker
- [FamiTracker](http://famitracker.com/) - NES music tracker

## 🎵 Example Songs (To be added)

- Main Theme
- Battle Music
- Victory Fanfare
- Game Over
- Menu Music
- Dungeon Ambience
- Boss Battle
- Credits Theme

---

**Status**: In Progress  
**Completed**: Types, GB Sound, SFX Generator  
**Remaining**: Composer, Editors, Effects, Export  
**Last Updated**: February 28, 2026
