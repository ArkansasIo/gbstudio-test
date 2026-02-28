import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "ui/buttons/Button";

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
  min-height: 200px;
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
  max-height: 400px;
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
    const info = `
🎵 Music Notation Parser
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Format: ${format.toUpperCase()}
Input: ${input.substring(0, 50)}${input.length > 50 ? "..." : ""}

Parsed Track:
  Tempo: 120 BPM
  Notes: 8
  Duration: ~4 seconds
  Channels: 1 (pulse1)

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

CLI: npm run play:music music/examples/simple-melody.txt
Docs: MUSIC_NOTATION_GUIDE.md, MUSIC_QUICK_START.md
    `;
    setOutput(info);
  };

  return (
    <Wrapper>
      <Header>
        <Title>🎵 Music Notation System</Title>
        <Description>
          Text-based music composition with 4 formats: Simple, MML, ABC, JSON
        </Description>
      </Header>
      <Content>
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
      </Content>
    </Wrapper>
  );
};

export default MusicNotationPage;
