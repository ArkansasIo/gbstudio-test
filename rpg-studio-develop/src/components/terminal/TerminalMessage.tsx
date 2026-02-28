import React, { useState } from "react";
import styled from "styled-components";
import type { TerminalMessage as TerminalMessageType } from "store/features/terminal/terminalState";

interface TerminalMessageProps {
  message: TerminalMessageType;
  showTimestamp: boolean;
}

const MessageWrapper = styled.div<{ type: string }>`
  display: flex;
  padding: 4px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.terminal.border};
  
  &:hover {
    background: ${(props) => props.theme.colors.terminal.hoverBackground};
  }
  
  ${(props) => {
    switch (props.type) {
      case "error":
        return `color: ${props.theme.colors.terminal.error};`;
      case "warning":
        return `color: ${props.theme.colors.terminal.warning};`;
      case "success":
        return `color: ${props.theme.colors.terminal.success};`;
      case "debug":
        return `color: ${props.theme.colors.terminal.debug};`;
      case "system":
        return `color: ${props.theme.colors.terminal.system};`;
      case "command":
        return `color: ${props.theme.colors.terminal.command};`;
      default:
        return `color: ${props.theme.colors.terminal.text};`;
    }
  }}
`;

const Timestamp = styled.span`
  color: ${(props) => props.theme.colors.terminal.muted};
  margin-right: 8px;
  min-width: 80px;
  font-size: 10px;
`;

const TypeBadge = styled.span<{ type: string }>`
  display: inline-block;
  padding: 2px 6px;
  margin-right: 8px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  min-width: 60px;
  text-align: center;
  
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
      case "success":
        return `
          background: ${props.theme.colors.terminal.success};
          color: ${props.theme.colors.terminal.background};
        `;
      case "debug":
        return `
          background: ${props.theme.colors.terminal.debug};
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

const MessageContent = styled.div`
  flex: 1;
  word-break: break-word;
`;

const MessageText = styled.div`
  margin-bottom: 4px;
`;

const MessageDetails = styled.div`
  color: ${(props) => props.theme.colors.terminal.muted};
  font-size: 11px;
  margin-top: 4px;
  padding-left: 12px;
  border-left: 2px solid ${(props) => props.theme.colors.terminal.border};
`;

const MessageMeta = styled.div`
  display: flex;
  gap: 12px;
  font-size: 10px;
  color: ${(props) => props.theme.colors.terminal.muted};
  margin-top: 4px;
`;

const MetaItem = styled.span`
  &:before {
    content: "• ";
  }
`;

const StackTrace = styled.pre`
  margin-top: 4px;
  padding: 8px;
  background: ${(props) => props.theme.colors.terminal.stackBackground};
  border-radius: 4px;
  font-size: 10px;
  overflow-x: auto;
  color: ${(props) => props.theme.colors.terminal.stackText};
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.terminal.link};
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  font-size: 10px;
  text-decoration: underline;
  
  &:hover {
    color: ${(props) => props.theme.colors.terminal.linkHover};
  }
`;

export const TerminalMessage: React.FC<TerminalMessageProps> = ({ message, showTimestamp }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", { hour12: false });
  };
  
  const hasExpandableContent = message.details || message.stackTrace;
  
  return (
    <MessageWrapper type={message.type}>
      {showTimestamp && <Timestamp>{formatTimestamp(message.timestamp)}</Timestamp>}
      <TypeBadge type={message.type}>{message.type}</TypeBadge>
      <MessageContent>
        <MessageText>
          {message.message}
          {hasExpandableContent && (
            <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "▼ collapse" : "▶ expand"}
            </ExpandButton>
          )}
        </MessageText>
        
        {isExpanded && message.details && (
          <MessageDetails>{message.details}</MessageDetails>
        )}
        
        {isExpanded && message.stackTrace && (
          <StackTrace>{message.stackTrace}</StackTrace>
        )}
        
        {(message.file || message.source || message.code || message.severity) && (
          <MessageMeta>
            {message.source && <MetaItem>Source: {message.source}</MetaItem>}
            {message.file && (
              <MetaItem>
                File: {message.file}
                {message.line && `:${message.line}`}
                {message.column && `:${message.column}`}
              </MetaItem>
            )}
            {message.code && <MetaItem>Code: {message.code}</MetaItem>}
            {message.severity && <MetaItem>Severity: {message.severity}</MetaItem>}
          </MessageMeta>
        )}
      </MessageContent>
    </MessageWrapper>
  );
};
