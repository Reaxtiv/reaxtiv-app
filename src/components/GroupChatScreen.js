import React, { useState, useRef, useEffect } from "react";

const GROUP_MESSAGES = {
  builders: [
    { user: "Ana", color: "#FFC32B", text: "Welcome to Crypto Builders! 🚀" },
    { user: "Luis", color: "#fff", text: "Hey, who is testing new rollups?" },
    { user: "Tom", color: "#fff", text: "I am! Starknet is cool." },
    { user: "Ana", color: "#FFC32B", text: "Let’s meet next week to share progress." }
  ],
  artists: [
    { user: "Julia", color: "#FFC32B", text: "Hi artists!" },
    { user: "Ken", color: "#fff", text: "Anyone joining the NFT contest?" },
    { user: "Julia", color: "#FFC32B", text: "Sure! Share the link please." },
    { user: "Ken", color: "#fff", text: "Sent in the pinned message 👍" }
  ],
  defi: [
    { user: "DeFiBot", color: "#FFC32B", text: "Welcome to DeFi Talk." },
    { user: "Carlos", color: "#fff", text: "Best yield farm this week?" },
    { user: "Marta", color: "#fff", text: "I got >20% on Arbitrum last month!" },
    { user: "Carlos", color: "#fff", text: "Nice! Sharing my strategy soon." }
  ],
  ai: [
    { user: "Alex", color: "#FFC32B", text: "AI & Blockchain, let’s build the future!" },
    { user: "Sam", color: "#fff", text: "What’s the best LLM for Solidity codegen?" },
    { user: "Alex", color: "#FFC32B", text: "Try GPT-4o or Llama 3. Both are great." },
    { user: "Sam", color: "#fff", text: "Thanks, will report results here." }
  ]
};

export default function GroupChatScreen({ group, onBack }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(GROUP_MESSAGES[group.id] || []);
  const chatRef = useRef(null);

  useEffect(() => {
    // Scroll abajo al añadir mensajes
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { user: "You", color: "#23F600", text: input }]);
    setInput("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        color: "#FFC32B",
        fontFamily: "'Piedra', cursive",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div style={{ width: "100%", padding: "20px 0 0 0", display: "flex", alignItems: "center" }}>
        <button
          onClick={onBack}
          style={{
            marginLeft: 16,
            background: "none",
            border: "none",
            color: "#FFC32B",
            fontSize: 24,
            cursor: "pointer",
            marginRight: 10
          }}
        >
          ←
        </button>
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            fontSize: 32,
            letterSpacing: "0.04em",
            color: "#FFC32B",
          }}
        >
          {group.name}
        </div>
      </div>
      <div
        ref={chatRef}
        style={{
          width: "94%",
          flex: 1,
          background: "transparent",
          margin: "20px auto 0 auto",
          borderRadius: 18,
          overflowY: "auto",
          maxHeight: "62vh",
          minHeight: 340,
          padding: "6px 0 10px 0",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.user === "You" ? "flex-end" : "flex-start",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                background: msg.user === "You" ? "#23F600" : "#232323",
                color: msg.user === "You" ? "#181511" : msg.color,
                borderRadius: 18,
                padding: "11px 22px",
                fontSize: 18,
                fontFamily: "'Piedra', cursive",
                maxWidth: 260,
                wordBreak: "break-word",
              }}
            >
              <b>{msg.user}:</b> {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          width: "96%",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          bottom: 70,
          left: "2%",
          padding: "0 0 0 0"
        }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Write a message..."
          style={{
            flex: 1,
            padding: "18px 22px",
            border: "none",
            borderRadius: 22,
            background: "#232323",
            color: "#fff",
            fontSize: 18,
            fontFamily: "'Piedra', cursive",
            outline: "none",
            marginRight: 10,
          }}
        />
        <button
          onClick={handleSend}
          style={{
            background: "#FFC32B",
            color: "#181511",
            fontWeight: 700,
            fontSize: 18,
            border: "none",
            borderRadius: 18,
            padding: "13px 24px",
            fontFamily: "'Piedra', cursive",
            cursor: "pointer",
            boxShadow: "0 0 12px #FFD700"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}