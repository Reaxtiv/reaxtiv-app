// filepath: [InboxChatList.js](http://_vscodecontentref_/1)
import React, { useEffect, useState } from "react";

// Recorta dirección: 0x1234...abcd
function shortAddr(addr) {
  if (!addr) return "";
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

// Para badge de nuevos mensajes
function isNewMsg(conv, myAddress) {
  if (!conv.lastTime) return false;
  const key = `lastRead_${myAddress}_${conv.peerAddress}`;
  const lastRead = localStorage.getItem(key);
  if (!lastRead) return true;
  return new Date(conv.lastTime) > new Date(lastRead);
}

export default function InboxChatList({
  xmtp,
  myAddress,
  onSelectConversation,
  selectedPeer,
  onSearchSelect,
}) {
  const [conversations, setConversations] = useState([]);
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Cargar del storage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("inbox_" + myAddress);
    if (saved) setConversations(JSON.parse(saved));
  }, [myAddress]);

  useEffect(() => {
    if (!xmtp) return;
    let cancel = false;

    const loadConvs = async () => {
      try {
        const convs = await xmtp.conversations.list();
        const convsWithLast = await Promise.all(
          convs.map(async (conv) => {
            const msgs = await conv.messages({ limit: 1 });
            return {
              peerAddress: conv.peerAddress,
              lastMsg: msgs.length ? msgs[0].content : "",
              lastTime: msgs.length ? msgs[0].sent : null,
            };
          })
        );
        if (!cancel) {
          const sorted = convsWithLast.sort((a, b) => (b.lastTime || 0) - (a.lastTime || 0));
          setConversations(sorted);
          localStorage.setItem("inbox_" + myAddress, JSON.stringify(sorted));
        }
      } catch (e) {}
    };

    loadConvs();
    const interval = setInterval(loadConvs, 15000); // cada 15s
    return () => {
      cancel = true;
      clearInterval(interval);
    };
  }, [xmtp, myAddress]);

  // Filtrar según input
  useEffect(() => {
    if (!input.trim()) {
      setFiltered(conversations);
    } else {
      setFiltered(
        conversations.filter((c) =>
          c.peerAddress.toLowerCase().includes(input.trim().toLowerCase())
        )
      );
    }
  }, [input, conversations]);

  const handleSearch = (e) => {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;
    onSearchSelect(val);
    setInput(""); // Limpiar buscador tras buscar
  };

  return (
    <div
      style={{
        width: 335,
        background: "#181818",
        borderRadius: 16,
        padding: 12,
        margin: 12,
        minHeight: 420,
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ color: "#FFC32B", marginBottom: 10 }}>Inbox</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: 14 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search or address/ENS"
          style={{
            width: "90%",
            padding: "7px 11px",
            borderRadius: 11,
            border: "1.2px solid #FFC32B",
            fontSize: 15,
            background: "#232323",
            color: "#FFC32B",
            fontFamily: "'Piedra', cursive",
            marginLeft: 2,
          }}
          autoFocus={false}
        />
      </form>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {filtered.map((conv) => (
          <div
            key={conv.peerAddress}
            onClick={() => onSelectConversation(conv.peerAddress)}
            style={{
              cursor: "pointer",
              marginBottom: 8,
              padding: 10,
              background:
                selectedPeer === conv.peerAddress ? "#FFC32B" : "#232323",
              borderRadius: 10,
              color: selectedPeer === conv.peerAddress ? "#181511" : "#FFC32B",
              border:
                selectedPeer === conv.peerAddress ? "2px solid #FFC32B" : "none",
              transition: "all 0.2s",
              position: "relative"
            }}
          >
            <div style={{ fontWeight: 700 }}>
              {shortAddr(conv.peerAddress)}
              {isNewMsg(conv, myAddress) && (
                <span style={{
                  color: "#FFD700",
                  marginLeft: 7,
                  fontWeight: 900,
                  fontSize: 19,
                  verticalAlign: "middle"
                }}>•</span>
              )}
            </div>
            <div
              style={{
                fontSize: 14,
                color: selectedPeer === conv.peerAddress
                  ? "#181511"
                  : "#FFC32B",
                marginBottom: 4,
              }}
            >
              {conv.lastMsg}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#FFD700",
                letterSpacing: 0.5,
                marginTop: 2,
              }}
            >
              {conv.lastTime
                ? new Date(conv.lastTime).toLocaleString()
                : ""}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ color: "#aaa", marginTop: 20 }}>
            No conversations found.
          </div>
        )}
      </div>
      {/* Botón para chatear con el bot, debajo de la lista de direcciones */}
      <button
        onClick={() => onSelectConversation("bot.eth")}
        style={{
          width: "100%",
          margin: "16px 0 0 0",
          padding: "12px 0",
          background: "#FFC32B",
          color: "#181511",
          border: "none",
          borderRadius: 12,
          fontWeight: 700,
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        🤖 Chat with Bot
      </button>
    </div>
  );
}