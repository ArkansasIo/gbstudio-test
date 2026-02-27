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

interface ChatMessage {
  sender: "ai" | "user";
  text: string;
}

const AI_PROVIDER = (process.env.AI_PROVIDER || "openrouter").toLowerCase();
const AI_MODEL = process.env.AI_MODEL || "openai/gpt-4o-mini";
const AI_BASE_URL =
  process.env.AI_BASE_URL || "https://openrouter.ai/api/v1/chat/completions";
const AI_API_KEY = process.env.AI_API_KEY || "";

const AIChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text: "Hello! I'm Anna Ai. Ask anything about your project.",
    },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(true);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    const userText = input.trim();
    if (!userText || sending) return;

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");

    if (!AI_API_KEY) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Missing AI_API_KEY. Add it in .env.local and restart the app.",
        },
      ]);
      return;
    }

    if (AI_PROVIDER !== "openrouter") {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Unsupported AI_PROVIDER '${AI_PROVIDER}'. Set AI_PROVIDER=openrouter.`,
        },
      ]);
      return;
    }

    setSending(true);
    try {
      const response = await fetch(AI_BASE_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AI_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://www.gbstudio.dev",
          "X-Title": "Enchantment Game Engine",
        },
        body: JSON.stringify({
          model: AI_MODEL,
          messages: [{ role: "user", content: userText }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const aiText =
        data?.choices?.[0]?.message?.content ||
        "No response content returned by provider.";
      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    } catch (err) {
      const errorText =
        err instanceof Error ? err.message : "Unknown request error";
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: `Request failed: ${errorText}` },
      ]);
    } finally {
      setSending(false);
    }
  };

  return open ? (
    <ChatBoxWrapper>
      <ChatHeader>
        Anna Ai Chat
        <button
          style={{ float: "right", background: "#444", color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", marginLeft: 8 }}
          onClick={() => setOpen(false)}
        >
          Close
        </button>
      </ChatHeader>
      <div style={{ padding: 8, background: '#222', borderBottom: '1px solid #333' }}>
        <div style={{ marginBottom: 4, color: "#fff", fontSize: 12 }}>
          Provider: {AI_PROVIDER}
        </div>
        <div style={{ marginBottom: 4, color: "#fff", fontSize: 12 }}>
          Model: {AI_MODEL}
        </div>
        <div style={{ color: "#fff", fontSize: 12 }}>
          API key: {AI_API_KEY ? "configured" : "missing (.env.local)"}
        </div>
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
        <ChatButton onClick={handleSend} disabled={sending}>
          {sending ? "..." : "Send"}
        </ChatButton>
      </ChatInputWrapper>
    </ChatBoxWrapper>
  ) : (
    <button
      style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, background: "#4a90e2", color: "#fff", border: "none", borderRadius: 12, padding: "12px 24px", fontWeight: "bold", fontSize: 16, boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}
      onClick={() => setOpen(true)}
    >
      Open Anna Ai Chat
    </button>
  );
};

export default AIChatBox;
