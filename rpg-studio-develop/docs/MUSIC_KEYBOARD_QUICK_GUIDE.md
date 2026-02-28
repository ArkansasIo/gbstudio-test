# 🎹 Music Keyboard Editor - Quick Guide

## 5-Minute Quick Start

### Access the Editor
1. Open RPG Studio
2. Press `Ctrl+Shift+N` or navigate to **Music > Music Notation**
3. The keyboard editor is at the top of the page

---

## Interface Overview

```
┌─────────────────────────────────────────────────────────────┐
│ 🎹 Music Keyboard Editor                                    │
│ [▶ Play] [⏺ Record] [Load Example] [Clear]                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Piano Roll (Timeline View)                                 │
│  ┌────────────────────────────────────────────────────┐    │
│  │ C6 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │
│  │ B5 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │
│  │ A5 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │
│  │ ...                                                 │    │
│  │ C4 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  Interactive Keyboard                                       │
│  ┌────────────────────────────────────────────────────┐    │
│  │ [C4][C#][D][D#][E][F][F#][G][G#][A][A#][B][C5]... │    │
│  └────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│ Track: My Song | Tempo: 120 BPM | Notes: 8 | Duration: 4s  │
│ Status: ⏸ Stopped | Keyboard: ASDFGHJKL (Space=Play R=Rec) │
└─────────────────────────────────────────────────────────────┘
```

---

## Quick Actions

### 1. Play a Note (Mouse)
- Click any key on the interactive keyboard
- Hear the note play with Game Boy sound
- See the key light up

### 2. Play a Note (Keyboard)
```
Press these keys on your QWERTY keyboard:

White Keys:  A S D F G H J K L ; '
Black Keys:  W E   T Y U   O P
Lower Oct:   Z X C V B N M , . /
```

### 3. Record a Song
1. Press `R` or click **[⏺ Record]**
2. Play notes on keyboard (mouse or QWERTY)
3. Press `R` again or click **[⏺ Recording...]** to stop
4. Your song appears in the piano roll!

### 4. Play Your Song
1. Press `Space` or click **[▶ Play]**
2. Watch notes light up as they play
3. Press `Space` again to stop

### 5. Load an Example
- Click **[Load Example]**
- Loads: "T120 O4 L4 C D E F G A B O5 C" (C major scale)
- See notes in piano roll
- Press Space to play

### 6. Clear Everything
- Click **[Clear]** to start fresh

---

## Keyboard Shortcuts

### Essential Shortcuts
| Key | Action |
|-----|--------|
| `Space` | Play/Stop |
| `R` | Record/Stop Recording |

### Piano Keys (QWERTY)
```
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ W │ E │   │ T │ Y │ U │   │ O │ P │   │   │   │   │ Black Keys
└─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┐
  │ A │ S │ D │ F │ G │ H │ J │ K │ L │ ; │ ' │   │ White Keys
  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
  C4  D4  E4  F4  G4  A4  B4  C5  D5  E5  F5  G5

┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ Z │ X │ C │ V │ B │ N │ M │ , │ . │ / │ Lower Octave
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
C3  D3  E3  F3  G3  A3  B3  C4  D4  E4
```

---

## Common Workflows

### Workflow 1: Quick Melody
1. Click **[Load Example]**
2. Press `Space` to hear it
3. Click **[Clear]**
4. Press `R` to record
5. Play: `A S D F G F D S A` (simple melody)
6. Press `R` to stop
7. Press `Space` to play back

### Workflow 2: From Text Notation
1. Scroll down to "Text Notation Parser" section
2. Enter: `T120 O4 L4 C E G O5 C`
3. Click **[Parse Music]**
4. Track loads into keyboard editor above
5. Press `Space` to play
6. Edit by recording more notes

### Workflow 3: Export to Text
1. Record or load a track in keyboard editor
2. Scroll down to "Output" section
3. See exported MML notation
4. Copy and save to file
5. Use in your game or share

---

## Tips & Tricks

### Recording Tips
1. **Start Simple**: Record 4-8 notes first
2. **Use Metronome**: Count "1-2-3-4" in your head
3. **Practice First**: Play the melody before recording
4. **Short Phrases**: Record in small chunks

### Keyboard Tips
1. **Home Row**: Use ASDFGHJKL for easy reach
2. **Black Keys**: W E T Y U O P for sharps/flats
3. **Both Hands**: Left hand for lower notes, right for higher
4. **Muscle Memory**: Practice the same melody multiple times

### Playback Tips
1. **Loop**: Record, play, adjust, repeat
2. **Tempo**: Default is 120 BPM (moderate speed)
3. **Listen**: Pay attention to timing and rhythm
4. **Visualize**: Watch the piano roll during playback

---

## Example Songs to Try

### Twinkle Twinkle Little Star
```
Keyboard: A A G G J J G (pause) H H G G F F D
Notes:    C C G G A A G (pause) F F E E D D C
```

### Mary Had a Little Lamb
```
Keyboard: D S D F F F (pause) D G G G (pause) D J J J
Notes:    E D C D E E E (pause) D G G G (pause) E A A A
```

### Happy Birthday
```
Keyboard: D D F D G H (pause) D D F D J G
Notes:    C C D C F E (pause) C C D C G F
```

---

## Troubleshooting

### No Sound?
- Check browser audio permissions
- Click anywhere on the page to activate audio
- Try clicking a key again

### Recording Not Working?
- Make sure you clicked **[⏺ Record]** first
- Check if button shows "Recording..." (red)
- Play some notes
- Click **[⏺ Recording...]** to stop

### Keyboard Shortcuts Not Working?
- Click on the keyboard editor area
- Make sure no text field is focused
- Try clicking a piano key first

### Notes Not Showing?
- Click **[Load Example]** to test
- Try recording a few notes
- Check if track has notes (see info panel)

---

## Next Steps

### Learn More
- [Full Keyboard Editor Guide](./MUSIC_KEYBOARD_EDITOR.md)
- [Music Notation Guide](./MUSIC_NOTATION_GUIDE.md)
- [Audio System Documentation](./AUDIO_AND_GAMEBOY_SYSTEM.md)

### Advanced Features
- Multi-channel composition (coming soon)
- Note editing (drag, resize, delete)
- MIDI input support
- Export to MIDI file

### Get Help
- Check [Master Index](./MASTER_INDEX.md) for all documentation
- See [System Interlinks](./SYSTEM_INTERLINKS.md) for integration
- Read [Navigation Menu](./NAVIGATION_MENU_UPDATE.md) for UI guide

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│ 🎹 MUSIC KEYBOARD EDITOR - QUICK REFERENCE              │
├─────────────────────────────────────────────────────────┤
│ ACCESS:                                                  │
│   • Ctrl+Shift+N or Menu → Music → Music Notation      │
│                                                          │
│ SHORTCUTS:                                               │
│   • Space = Play/Stop                                   │
│   • R = Record/Stop Recording                           │
│                                                          │
│ PIANO KEYS:                                              │
│   • White: A S D F G H J K L ; '                       │
│   • Black: W E T Y U O P                               │
│   • Lower: Z X C V B N M , . /                         │
│                                                          │
│ WORKFLOW:                                                │
│   1. Press R to record                                  │
│   2. Play notes on keyboard                             │
│   3. Press R to stop                                    │
│   4. Press Space to play back                           │
│                                                          │
│ FEATURES:                                                │
│   • Visual piano roll (48 notes)                        │
│   • Interactive keyboard (24 keys)                      │
│   • Real-time recording                                 │
│   • Game Boy sound emulation                            │
│   • Export to MML/Simple formats                        │
└─────────────────────────────────────────────────────────┘
```

---

**Happy Composing! 🎵**

For more help, see [MUSIC_KEYBOARD_EDITOR.md](./MUSIC_KEYBOARD_EDITOR.md)
