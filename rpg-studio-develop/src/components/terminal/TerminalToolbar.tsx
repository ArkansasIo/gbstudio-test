import React from "react";
import styled from "styled-components";
import type { TerminalFilter, TerminalStats } from "store/features/terminal/terminalState";

interface TerminalToolbarProps {
  stats: TerminalStats;
  filter: TerminalFilter;
  isPaused: boolean;
  sources: string[];
  onClear: () => void;
  onTogglePause: () => void;
  onFilterChange: (filter: Partial<TerminalFilter>) => void;
}

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background: ${(props) => props.theme.colors.terminal.toolbarBackground};
  border-bottom: 1px solid ${(props) => props.theme.colors.terminal.border};
  flex-wrap: wrap;
`;

const ToolbarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Button = styled.button<{ active?: boolean; variant?: string }>`
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors.terminal.border};
  background: ${(props) => 
    props.active 
      ? props.theme.colors.terminal.buttonActive 
      : props.theme.colors.terminal.buttonBackground};
  color: ${(props) => props.theme.colors.terminal.text};
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s;
  
  &:hover {
    background: ${(props) => props.theme.colors.terminal.buttonHover};
  }
  
  ${(props) => {
    if (props.variant === "danger") {
      return `
        background: ${props.theme.colors.terminal.error};
        color: ${props.theme.colors.terminal.background};
        border-color: ${props.theme.colors.terminal.error};
      `;
    }
    if (props.variant === "warning") {
      return `
        background: ${props.theme.colors.terminal.warning};
        color: ${props.theme.colors.terminal.background};
        border-color: ${props.theme.colors.terminal.warning};
      `;
    }
    return "";
  }}
`;

const StatBadge = styled.span<{ type: string }>`
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: bold;
  
  ${(props) => {
    switch (props.type) {
      case "error":
        return `
          background: ${props.theme.colors.terminal.error};
          color: ${props.theme.colors.terminal.background};
        `;
      case "warning":
        return `
          background: ${props.theme.colors.terminal.warning};
          color: ${props.theme.colors.terminal.background};
        `;
      default:
        return `
          background: ${props.theme.colors.terminal.muted};
          color: ${props.theme.colors.terminal.background};
        `;
    }
  }}
`;

const SearchInput = styled.input`
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors.terminal.border};
  background: ${(props) => props.theme.colors.terminal.inputBackground};
  color: ${(props) => props.theme.colors.terminal.text};
  border-radius: 4px;
  font-size: 11px;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.terminal.link};
  }
`;

const Select = styled.select`
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors.terminal.border};
  background: ${(props) => props.theme.colors.terminal.inputBackground};
  color: ${(props) => props.theme.colors.terminal.text};
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.terminal.link};
  }
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  cursor: pointer;
`;

const Spacer = styled.div`
  flex: 1;
`;

export const TerminalToolbar: React.FC<TerminalToolbarProps> = ({
  stats,
  filter,
  isPaused,
  sources,
  onClear,
  onTogglePause,
  onFilterChange,
}) => {
  return (
    <Toolbar>
      <ToolbarSection>
        <Button onClick={onClear}>Clear</Button>
        <Button onClick={onTogglePause} variant={isPaused ? "warning" : undefined}>
          {isPaused ? "Resume" : "Pause"}
        </Button>
      </ToolbarSection>
      
      <ToolbarSection>
        <StatBadge type="info">Total: {stats.totalMessages}</StatBadge>
        {stats.errorCount > 0 && <StatBadge type="error">Errors: {stats.errorCount}</StatBadge>}
        {stats.warningCount > 0 && <StatBadge type="warning">Warnings: {stats.warningCount}</StatBadge>}
      </ToolbarSection>
      
      <ToolbarSection>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={filter.searchQuery}
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
        />
      </ToolbarSection>
      
      <ToolbarSection>
        <Select
          value={filter.sources[0] || "all"}
          onChange={(e) => {
            const value = e.target.value;
            onFilterChange({ sources: value === "all" ? [] : [value] });
          }}
        >
          <option value="all">All Sources</option>
          {sources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </Select>
      </ToolbarSection>
      
      <Spacer />
      
      <ToolbarSection>
        <Label>
          <Checkbox
            type="checkbox"
            checked={filter.showTimestamps}
            onChange={(e) => onFilterChange({ showTimestamps: e.target.checked })}
          />
          Timestamps
        </Label>
        
        <Label>
          <Checkbox
            type="checkbox"
            checked={filter.autoScroll}
            onChange={(e) => onFilterChange({ autoScroll: e.target.checked })}
          />
          Auto-scroll
        </Label>
      </ToolbarSection>
    </Toolbar>
  );
};
