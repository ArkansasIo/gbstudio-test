import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "store/hooks";
import terminalActions from "store/features/terminal/terminalActions";
import { selectCommandHistory, selectCurrentCommand } from "store/features/terminal/terminalSelectors";

interface TerminalInputProps {
  onCommand: (command: string) => void;
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background: ${(props) => props.theme.colors.terminal.inputBackground};
  border-top: 1px solid ${(props) => props.theme.colors.terminal.border};
`;

const Prompt = styled.span`
  color: ${(props) => props.theme.colors.terminal.prompt};
  margin-right: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.terminal.text};
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  outline: none;
  
  &::placeholder {
    color: ${(props) => props.theme.colors.terminal.muted};
  }
`;

export const TerminalInput: React.FC<TerminalInputProps> = ({ onCommand }) => {
  const dispatch = useAppDispatch();
  const commandHistory = useAppSelector(selectCommandHistory);
  const currentCommand = useAppSelector(selectCurrentCommand);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (currentCommand !== undefined) {
      setInput(currentCommand);
    }
  }, [currentCommand]);
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput("");
    }
  }, [input, onCommand]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      dispatch(terminalActions.navigateCommandHistory("up"));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      dispatch(terminalActions.navigateCommandHistory("down"));
    }
  }, [dispatch]);
  
  return (
    <InputWrapper>
      <Prompt>$</Prompt>
      <form onSubmit={handleSubmit} style={{ flex: 1 }}>
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command..."
          autoFocus
        />
      </form>
    </InputWrapper>
  );
};
