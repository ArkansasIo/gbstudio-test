import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "ui/buttons/Button";
import MusicKeyboardEditor from "components/music/MusicKeyboardEditor";
import { MusicParser } from "lib/audio/musicParser";
import type { MusicTrack } from "lib/audio/types";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: ${(props) => props.theme.colors.document.background};
`;

const Header = styled.div`
  padding: 20px;
  background: ${(props) => props.theme.colors.sidebar.background};
  border-bottom: 1px solid ${(props) => props.theme.colors.sidebar.border};
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: ${(props) => props.theme.colors.text};
`;

const Description = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.secondaryText};
  font-size: 14px;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const EditorSection = styled.div`
  flex: 1;
  min-height: 400px;
  border-bottom: 2px solid ${(props) => props.theme.colors.sidebar.border};
`;

const ParserSection = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 15px 0;
  color: ${(props) => props.theme.colors.text};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  background: ${(props) => props.theme.colors.input.background};
  border: 1px solid ${(props) => props.theme.colors.input.border};
  border-radius: 4px;
  padding: 10px;
  color: ${(props) => props.theme.colors.text};
  font-family: monospace;
  font-size: 13px;
  resize: vertical;
`;

const Output = styled.pre`
  background: ${(props) => props.theme.colors.input.background};
  border: 1px solid ${(props) => props.theme.colors.input.border};
  border-radius: 4px;
  padding: 15px;
  color: ${(props) => props.theme.colors.text};
  font-family: monospace;
  font-size: 12px;
  overflow-x: auto;
  white-space: pre-wrap;
  max-height: 300px;
  overflow-y: auto;
`;

const FormRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  align-items: center;
`;

const Label = styled.label`
  min-width: 100px;
  color: ${(props) => props.theme.colors.text};
  font-size: 14px;
`;

const MusicNotationPage: FC = () => {
  const [format, setFormat] = useState("mml");
  const [input, setInput] = useState("T120 O4 L4 C D E F G A B O5 C");
  const [output, setOutput] = useState("");
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | undefined>(undefined);

  const examples = {
    simple: "C4:4 D4:4 E4:4 F4:4 G4:4 A4:4 B4:4 C5:2",
    mml: "T120 O4 L4 C D E F G A B O5 C",
    abc: `X:1
T:Scale
M:4/4
L:1/4
K:C
CDEF GABc`,
  };

  const handleParse = () => {
    try {
      let track: MusicTrack;
      
      switch (format) {
        case "mml":
          track = MusicParser.parseMML(input);
          break;
        case "simple":
          track = MusicParser.parseSimple(input);
          break;
        case "abc":
          track = MusicParser.parseABC(input);
          break;
        default:
          return;
      }

      setCurrentTrack(track);

      const totalDuration = track.channels[0]?.notes.length > 0
        ? track.channels[0].notes[track.channels[0].notes.length - 1].startTime +
          track.channels[0].notes[track.channels[0].notes.length - 1].duration
        : 0;

      const info = `
🎵 Music Notation Parser
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Format: ${format.toUpperCase()}
Input: ${input.substring(0, 50)}${input.length > 50 ? "..." : ""}

Parsed Track:
  Name: ${track.name}
  Tempo: ${track.tempo} BPM
  Time Signature: ${track.timeSignature.numerator}/${track.timeSignature.denominator}
  Notes: ${track.channels[0]?.notes.length || 0}
  Duration: ${totalDuration.toFixed(2)} seconds
  Channels: ${track.channels.length}

Supported Formats:
  ✓ Simple - C4:4 D4:4 E4:4
  ✓ MML - T120 O4 L4 C D E F G
  ✓ ABC - Classical notation
  ✓ JSON - Full control

Usage:
  import { MusicParser, MusicPlayer } from '@/lib/audio/musicParser';
  
  const track = MusicParser.parse${format.toUpperCase()}(\`${input}\`);
  const player = new MusicPlayer(audioContext);
  player.play(track);

Export:
  MML: ${MusicParser.exportMML(track)}
  Simple: ${MusicParser.exportSimple(track)}

CLI: npm run play:music music/examples/simple-melody.txt
Docs: MUSIC_NOTATION_GUIDE.md, MUSIC_QUICK_START.md
      `;
      setOutput(info);
    } catch (error) {
      setOutput(`❌ Parse Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleTrackChange = (track: MusicTrack) => {
    setCurrentTrack(track);
    // Update input with exported notation
    const exported = MusicParser.exportMML(track);
    setInput(exported);
    setFormat("mml");
  };

  return (
    <Wrapper>
      <Header>
        <Title>🎵 Music Notation & Keyboard Editor</Title>
        <Description>
          Visual keyboard editor with text-based music composition (Simple, MML, ABC, JSON)
        </Description>
      </Header>
      <Content>
        <EditorSection>
          <MusicKeyboardEditor 
            initialTrack={currentTrack}
            onTrackChange={handleTrackChange}
          />
        </EditorSection>
        <ParserSection>
        <Section>
          <SectionTitle>Input</SectionTitle>
          <FormRow>
            <Label>Format:</Label>
            <select
              value={format}
              onChange={(e) => {
                setFormat(e.target.value);
                setInput(examples[e.target.value as keyof typeof examples]);
              }}
              style={{
                background: 'var(--input-background)',
                border: '1px solid var(--input-border)',
                borderRadius: '4px',
                padding: '8px',
                color: 'var(--text-color)',
                fontSize: '14px',
                marginRight: '10px'
              }}
            >
              <option value="simple">Simple Format</option>
              <option value="mml">MML (Music Macro Language)</option>
              <option value="abc">ABC Notation</option>
            </select>
            <Button onClick={() => setInput(examples[format as keyof typeof examples])}>
              Load Example
            </Button>
          </FormRow>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter music notation..."
          />
          <div style={{ marginTop: 10 }}>
            <Button onClick={handleParse}>Parse Music</Button>
          </div>
        </Section>

        {output && (
          <Section>
            <SectionTitle>Output</SectionTitle>
            <Output>{output}</Output>
          </Section>
        )}

        <Section>
          <SectionTitle>Examples</SectionTitle>
          <Description>
            <strong>Simple Format:</strong>
            <br />
            C4:4 D4:4 E4:4 F4:4 G4:4
            <br />
            <br />
            <strong>MML Format:</strong>
            <br />
            T120 O4 L4 C D E F G A B O5 C
            <br />
            <br />
            <strong>ABC Notation:</strong>
            <br />
            X:1 | T:My Song | M:4/4 | K:C | CDEF GABc
            <br />
            <br />
            <strong>Features:</strong>
            <br />
            • 100+ example songs (Mario, Zelda, Tetris, etc.)
            <br />
            • 50+ sound effects library
            <br />
            • Format conversion (export to MML, Simple)
            <br />
            • MIDI to frequency conversion
            <br />
            • Game Boy sound integration
            <br />
            <br />
            Files: music/examples/*.txt
            <br />
            CLI: npm run play:music [file]
          </Description>
        </Section>
        </ParserSection>
      </Content>
    </Wrapper>
  );
};

export default MusicNotationPage;
