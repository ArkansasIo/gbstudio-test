import React, { useState } from "react";
import styled from "styled-components";

const ChatBoxWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 350px;
  max-height: 500px;
  background: #222;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const ChatHeader = styled.div`
  padding: 12px;
  background: #333;
  color: #fff;
  font-weight: bold;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  color: #fff;
`;

const ChatInputWrapper = styled.div`
  display: flex;
  padding: 8px;
  background: #222;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 8px;
  margin-right: 8px;
  background: #444;
  color: #fff;
`;

const ChatButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: #4a90e2;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;

const AIChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I'm Anna Ai, your AI assistant. How can I help you create in Enchantment Game Engine?" }
  ]);
  const [input, setInput] = useState("");
  const [apiKey1, setApiKey1] = useState("");
  const [apiKey2, setApiKey2] = useState("");
  const [apiKey3, setApiKey3] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    // Simulate AI reply
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { sender: "ai", text: "(AI response placeholder)" }]);
    }, 800);
    setInput("");
  };

  return (
    <ChatBoxWrapper>
      <ChatHeader>Anna Ai Chat</ChatHeader>
      <div style={{ padding: 8, background: '#222', borderBottom: '1px solid #333' }}>
        <div style={{ marginBottom: 4, color: '#fff', fontSize: 12 }}>API Key 1:</div>
        <input
          type="password"
          value={apiKey1}
          onChange={e => setApiKey1(e.target.value)}
          placeholder="Enter API Key 1"
          style={{ width: '100%', marginBottom: 8, borderRadius: 6, border: 'none', padding: 6, background: '#444', color: '#fff' }}
        />
        <div style={{ marginBottom: 4, color: '#fff', fontSize: 12 }}>API Key 2:</div>
        <input
          type="password"
          value={apiKey2}
          onChange={e => setApiKey2(e.target.value)}
          placeholder="Enter API Key 2"
          style={{ width: '100%', marginBottom: 8, borderRadius: 6, border: 'none', padding: 6, background: '#444', color: '#fff' }}
        />
        <div style={{ marginBottom: 4, color: '#fff', fontSize: 12 }}>API Key 3:</div>
        <input
          type="password"
          value={apiKey3}
          onChange={e => setApiKey3(e.target.value)}
          placeholder="Enter API Key 3"
          style={{ width: '100%', marginBottom: 8, borderRadius: 6, border: 'none', padding: 6, background: '#444', color: '#fff' }}
        />
      </div>
      <ChatMessages>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 8, textAlign: msg.sender === "ai" ? "left" : "right" }}>
            <span style={{ fontWeight: msg.sender === "ai" ? "bold" : "normal" }}>
              {msg.sender === "ai" ? "Anna Ai: " : "You: "}
            </span>
            {msg.text}
          </div>
        ))}
      </ChatMessages>
      <ChatInputWrapper>
        <ChatInput
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Anna Ai..."
          onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
        />
        <ChatButton onClick={handleSend}>Send</ChatButton>
      </ChatInputWrapper>
    </ChatBoxWrapper>
  );
};

export default AIChatBox;
