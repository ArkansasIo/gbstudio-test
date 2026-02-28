import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import terminalActions from "store/features/terminal/terminalActions";
import {
  selectFilteredMessages,
  selectTerminalFilter,
  selectTerminalStats,
  selectIsTerminalPaused,
  selectUniqueSources,
} from "store/features/terminal/terminalSelectors";
import type { TerminalMessage } from "store/features/terminal/terminalState";
import styled from "styled-components";
import { TerminalMessage as TerminalMessageComponent } from "./TerminalMessage";
import { TerminalToolbar } from "./TerminalToolbar";
import { TerminalInput } from "./TerminalInput";

const TerminalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${(props) => props.theme.colors.terminal.background};
  color: ${(props) => props.theme.colors.terminal.text};
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
`;

const TerminalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.terminal.scrollbarTrack};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.terminal.scrollbarThumb};
    border-radius: 4px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${(props) => props.theme.colors.terminal.muted};
  font-style: italic;
`;

const PausedOverlay = styled.div`
  position: absolute;
  top: 40px;
  right: 8px;
  background: ${(props) => props.theme.colors.terminal.warning};
  color: ${(props) => props.theme.colors.terminal.background};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
  z-index: 10;
`;

export const Terminal: React.FC = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectFilteredMessages);
  const filter = useAppSelector(selectTerminalFilter);
  const stats = useAppSelector(selectTerminalStats);
  const isPaused = useAppSelector(selectIsTerminalPaused);
  const sources = useAppSelector(selectUniqueSources);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (filter.autoScroll && shouldAutoScroll && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages, filter.autoScroll, shouldAutoScroll]);
  
  // Detect manual scrolling
  const handleScroll = useCallback(() => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShouldAutoScroll(isAtBottom);
    }
  }, []);
  
  const handleClear = useCallback(() => {
    dispatch(terminalActions.clearMessages());
  }, [dispatch]);
  
  const handleTogglePause = useCallback(() => {
    dispatch(terminalActions.togglePause());
  }, [dispatch]);
  
  const handleFilterChange = useCallback((newFilter: Partial<typeof filter>) => {
    dispatch(terminalActions.setFilter(newFilter));
  }, [dispatch]);
  
  const handleCommand = useCallback((command: string) => {
    dispatch(terminalActions.addCommand(command));
    dispatch(terminalActions.command(command));
    
    // Process command (this would be extended with actual command handling)
    if (command === "clear") {
      handleClear();
    } else if (command === "help") {
      dispatch(terminalActions.log("Available commands: clear, help, stats, filter"));
    } else if (command === "stats") {
      dispatch(terminalActions.log(
        `Stats: ${stats.totalMessages} total, ${stats.errorCount} errors, ${stats.warningCount} warnings`
      ));
    } else {
      dispatch(terminalActions.warn(`Unknown command: ${command}`));
    }
  }, [dispatch, handleClear, stats]);
  
  return (
    <TerminalWrapper>
      <TerminalToolbar
        stats={stats}
        filter={filter}
        isPaused={isPaused}
        sources={sources}
        onClear={handleClear}
        onTogglePause={handleTogglePause}
        onFilterChange={handleFilterChange}
      />
      
      {isPaused && <PausedOverlay>PAUSED</PausedOverlay>}
      
      <TerminalContent ref={contentRef} onScroll={handleScroll}>
        {messages.length === 0 ? (
          <EmptyState>No messages to display</EmptyState>
        ) : (
          messages.map((message: TerminalMessage) => (
            <TerminalMessageComponent key={message.id} message={message} showTimestamp={filter.showTimestamps} />
          ))
        )}
      </TerminalContent>
      
      <TerminalInput onCommand={handleCommand} />
    </TerminalWrapper>
  );
};
