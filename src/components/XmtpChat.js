import React, { useState, useEffect, useRef } from "react";
function shortAddr(addr) {
  if (!addr) return "";
  if (addr.toLowerCase() === "bot.eth") return "Bot";
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}
function serializeMessages(msgs) {
  return msgs.map(msg => ({
    id: msg.id,
    content: msg.content,
    sent: msg.sent,
    senderAddress: msg.senderAddress,
  }));
}

const handleBotCommand = async (msg) => {
  if (!msg.startsWith("/")) return null;
  const command = msg.trim().toLowerCase();

  if (command === "/help") {
    return "🤖 Available commands: /help, /price eth, /date, /time, /gas, /joke, /count <text>";
  }
  if (command === "/date") {
    return `📅 Today is: ${new Date().toLocaleDateString()}`;
  }
  if (command === "/time") {
    return `🕒 Current time: ${new Date().toLocaleTimeString()}`;
  }
  if (command === "/price eth") {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await res.json();
      if (data.ethereum && data.ethereum.usd) {
        return `💸 ETH price: $${data.ethereum.usd}`;
      }
      return "Couldn't fetch ETH price.";
    } catch {
      return "Error fetching ETH price.";
    }
  }
  if (command === "/gas") {
    try {
      const res = await fetch(
        "https://api.etherscan.io/api?module=gastracker&action=gasoracle"
      );
      const data = await res.json();
      if (data.status === "1" && data.result) {
        return `⛽ Gas price (Gwei): Low: ${data.result.SafeGasPrice}, Avg: ${data.result.ProposeGasPrice}, High: ${data.result.FastGasPrice}`;
      }
      return "Couldn't fetch gas price.";
    } catch {
      return "Error fetching gas price.";
    }
  }
  if (command === "/joke") {
    const jokes = [
      "Why do programmers confuse Halloween and Christmas? Because OCT 31 == DEC 25.",
      "Why did the computer go to the doctor? Because it had a virus.",
      "Why do Java developers wear glasses? Because they don't see sharp.",
      "How do you comfort a JavaScript bug? You console it."
    ];
    return "😂 " + jokes[Math.floor(Math.random() * jokes.length)];
  }
  if (command.startsWith("/count")) {
    const text = msg.slice(6).trim();
    if (!text) return "Usage: /count <text>";
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const charCount = text.length;
    return `🔢 Words: ${wordCount}, Characters: ${charCount}`;
  }
  return "Unknown command. Type /help for available commands.";
};

export default function XmtpChat({ myAddress, xmtp, peerAddress }) {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [status, setStatus] = useState("");
  const [canMessage, setCanMessage] = useState(true);
  const messagesEndRef = useRef(null);

  const isBot = peerAddress && peerAddress.toLowerCase() === "bot.eth";

  useEffect(() => {
    setConversation(null);
    setMessages([]);
    setNewMsg("");
    setStatus("");
  }, [myAddress, peerAddress]);

  useEffect(() => {
    if (!peerAddress || !myAddress) return;
    if (isBot) {
      const saved = localStorage.getItem(`history_${myAddress}_bot.eth`);
      if (saved) setMessages(JSON.parse(saved));
      else setMessages([]);
      return;
    }
    const saved = localStorage.getItem(`history_${myAddress}_${peerAddress}`);
    if (saved) setMessages(JSON.parse(saved));
    else setMessages([]);
  }, [myAddress, peerAddress, isBot]);

  useEffect(() => {
    if (isBot) {
      setCanMessage(true);
      setConversation({ send: async () => {} }); // Simulate conversation
      return;
    }
    if (!xmtp || !peerAddress || !myAddress) {
      setConversation(null);
      setMessages([]);
      return;
    }
    let cancel = false;
    let interval;
    const loadConversation = async () => {
      try {
        const conv = await xmtp.conversations.newConversation(peerAddress);
        if (cancel) return;
        setConversation(conv);
        const msgs = await conv.messages({ limit: 25 });
        if (cancel) return;
        setMessages(serializeMessages(msgs));
        localStorage.setItem(
          `history_${myAddress}_${peerAddress}`,
          JSON.stringify(serializeMessages(msgs))
        );
        if (msgs.length > 0) {
          localStorage.setItem(
            `lastRead_${myAddress}_${peerAddress}`,
            msgs[msgs.length - 1].sent
          );
        }
        setStatus("");
        interval = setInterval(async () => {
          const updatedMsgs = await conv.messages({ limit: 25 });
          if (!cancel) {
            setMessages(serializeMessages(updatedMsgs));
            localStorage.setItem(
              `history_${myAddress}_${peerAddress}`,
              JSON.stringify(serializeMessages(updatedMsgs))
            );
            if (updatedMsgs.length > 0) {
              localStorage.setItem(
                `lastRead_${myAddress}_${peerAddress}`,
                updatedMsgs[updatedMsgs.length - 1].sent
              );
            }
          }
        }, 15000);
      } catch (e) {
        setStatus("");
      }
    };
    loadConversation();
    return () => {
      cancel = true;
      if (interval) clearInterval(interval);
    };
  }, [xmtp, myAddress, peerAddress, isBot]);

  useEffect(() => {
    if (isBot) {
      setCanMessage(true);
      return;
    }
    let cancelled = false;
    async function checkCanMessage() {
      if (!xmtp || !peerAddress) {
        setCanMessage(true);
        return;
      }
      try {
        const result = await xmtp.canMessage(peerAddress);
        if (!cancelled) setCanMessage(result);
      } catch(e) {
        if (!cancelled) setCanMessage(false);
      }
    }
    checkCanMessage();
    return () => { cancelled = true; }
  }, [peerAddress, xmtp, isBot]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setStatus("");
    if (isBot) {
      // Simulate local chat with the bot
      const userMsg = {
        id: Date.now(),
        content: newMsg,
        sent: new Date(),
        senderAddress: myAddress,
      };
      const botReplyText = await handleBotCommand(newMsg.trim());
      const botMsg = botReplyText
        ? {
            id: Date.now() + 1,
            content: botReplyText,
            sent: new Date(),
            senderAddress: "bot.eth",
          }
        : null;
      setMessages((msgs) => {
        const updated = [...msgs, userMsg, ...(botMsg ? [botMsg] : [])];
        localStorage.setItem(
          `history_${myAddress}_bot.eth`,
          JSON.stringify(updated)
        );
        return updated;
      });
      setNewMsg("");
      return;
    }
    if (!conversation) return;
    try {
      await conversation.send(newMsg);
      setNewMsg("");
      const msgs = await conversation.messages({ limit: 25 });
      setMessages(serializeMessages(msgs));
      localStorage.setItem(
        `history_${myAddress}_${peerAddress}`,
        JSON.stringify(serializeMessages(msgs))
      );
      if (msgs.length > 0) {
        localStorage.setItem(
          `lastRead_${myAddress}_${peerAddress}`,
          msgs[msgs.length - 1].sent
        );
      }
    } catch (e) {
      setStatus("");
    }
  };

  const handleClearHistory = () => {
    if (isBot) {
      localStorage.removeItem(`history_${myAddress}_bot.eth`);
      setMessages([]);
      return;
    }
    localStorage.removeItem(`history_${myAddress}_${peerAddress}`);
    localStorage.removeItem(`lastRead_${myAddress}_${peerAddress}`);
    setMessages([]);
  };

  if (!peerAddress) return null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 540,
        margin: "0 auto",
        background: "#131313",
        borderRadius: 18,
        border: "1.5px solid #FFC32B",
        padding: 18,
        color: "#FFC32B",
        fontFamily: "'Piedra', cursive",
        boxShadow: "0 2px 16px #000a",
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        height: "50vh",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 16 }}>
        XMTP Chat
      </div>
      <div style={{
        marginBottom: 18,
        background: "#FFC32B",
        color: "#181511",
        borderRadius: 10,
        padding: "8px 14px",
        fontWeight: 700,
        fontSize: 17,
        display: "inline-block"
      }}>
        {shortAddr(peerAddress)}
      </div>

      <button
        onClick={handleClearHistory}
        style={{
          marginBottom: 10,
          alignSelf: "flex-end",
          background: "#FFC32B",
          color: "#181511",
          border: "none",
          borderRadius: 10,
          padding: "6px 18px",
          fontWeight: 700,
          cursor: "pointer",
          fontSize: 15,
        }}
      >
        Clear Chat
      </button>

      <div
        style={{
          minHeight: 120,
          maxHeight: 300,
          overflowY: "auto",
          background: "#232323",
          borderRadius: 10,
          padding: 10,
          marginBottom: 12,
          flex: 1,
        }}
      >
        {messages.length === 0 && (
          <div style={{ color: "#aaa", fontSize: 16 }}>
            No messages yet. Be the first to write!
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign:
                msg.senderAddress?.toLowerCase() === myAddress?.toLowerCase()
                  ? "right"
                  : "left",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                background:
                  msg.senderAddress?.toLowerCase() === myAddress?.toLowerCase()
                    ? "#FFC32B"
                    : "#232323",
                color:
                  msg.senderAddress?.toLowerCase() === myAddress?.toLowerCase()
                    ? "#181511"
                    : "#FFC32B",
                borderRadius: 14,
                padding: "6px 15px",
                display: "inline-block",
                fontSize: 16,
                maxWidth: "80%",
                wordBreak: "break-word",
              }}
            >
              {msg.content}
            </span>
            <div
              style={{
                fontSize: 11,
                color: "#FFD700",
                marginTop: 2,
                marginRight: 2,
                marginLeft: 2,
                letterSpacing: 0.5,
              }}
            >
              {msg.sent
                ? new Date(msg.sent).toLocaleString()
                : ""}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Only show XMTP error if not bot */}
      {!canMessage && !isBot ? (
        <div style={{color: "#FFD700", margin: "16px 0", fontWeight: 700}}>
          ❌ This address does not have XMTP enabled.<br />
          The user must use an XMTP app (such as <a href="https://xmtp.chat/" style={{color:"#FF0000"}} target="_blank" rel="noopener noreferrer">xmtp.chat</a>) at least once.
        </div>
      ) : (
        <form onSubmit={sendMessage} style={{ display: "flex", gap: 6 }}>
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "9px 14px",
              borderRadius: 12,
              border: "1px solid #FFC32B",
              fontSize: 16,
              fontFamily: "'Piedra', cursive",
              background: "#232323",
              color: "#FFC32B",
            }}
            disabled={!conversation && !isBot}
          />
          <button
            type="submit"
            disabled={(!conversation && !isBot) || !newMsg.trim()}
            style={{
              background: "#FFC32B",
              color: "#181511",
              fontWeight: 700,
              border: "none",
              borderRadius: 12,
              padding: "0 18px",
              fontSize: 16,
              fontFamily: "'Piedra', cursive",
              cursor: (!conversation && !isBot) || !newMsg.trim() ? "not-allowed" : "pointer",
            }}
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}