import React, { useState, useEffect } from "react";
import XmtpChat from "./XmtpChat";
import { MdChat, MdSend, MdGroups } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import SettingsScreen from "./SettingsScreen";
import SnapshotDAOs from "./SnapshotDAOs";

const logoBgColor = "#000000";
function shortEth(address) {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export default function ChatsScreen({ myAddress, xmtp, onDisconnect }) {
  const [search, setSearch] = useState('');
  const [activeMenu, setActiveMenu] = useState('chats');
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [conversations, setConversations] = useState([]);

  // Load inbox from localStorage and sync with XMTP
  useEffect(() => {
    if (!myAddress) return;
    const saved = localStorage.getItem("inbox_" + myAddress);
    if (saved) setConversations(JSON.parse(saved));
  }, [myAddress]);

  useEffect(() => {
    if (!xmtp || !myAddress) return;
    let cancel = false;
    const loadConvs = async () => {
      try {
        const convs = await xmtp.conversations.list();
        const convsWithLast = await Promise.all(
          convs.map(async conv => {
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
    const interval = setInterval(loadConvs, 15000);
    return () => {
      cancel = true;
      clearInterval(interval);
    };
  }, [xmtp, myAddress]);

  // Badge de mensajes nuevos
  function isNewMsg(conv) {
    if (!conv.lastTime) return false;
    const key = `lastRead_${myAddress}_${conv.peerAddress}`;
    const lastRead = localStorage.getItem(key);
    if (!lastRead) return true;
    return new Date(conv.lastTime) > new Date(lastRead);
  }

  const filtered = search.trim()
    ? conversations.filter(c => c.peerAddress.toLowerCase().includes(search.trim().toLowerCase()))
    : conversations;

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      setSelectedPeer(search.trim());
      setSearch("");
    }
  }

  function handleSelectInbox(peer) {
    setSelectedPeer(peer);
  }

  // Main panels
  let mainPanel;
  if (activeMenu === 'chats') {
    mainPanel = (
      <div style={{
        width: "100%",
        paddingBottom: 110,
        paddingTop: 0,
        background: logoBgColor,
        minHeight: "calc(100vh - 110px)"
      }}>
        {/* Marca y título */}
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            fontSize: 36,
            letterSpacing: "0.04em",
            color: "#FFC32B",
            marginBottom: 12,
            paddingLeft: 26,
            paddingTop: 34,
          }}
        >
          RΞAXTIV
        </div>
        <div
          style={{
            fontFamily: "'Piedra', cursive",
            fontSize: 32,
            color: "#FFC32B",
            marginBottom: 20,
            paddingLeft: 26,
          }}
        >
          Chats
        </div>
        <div style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          minHeight: 420,
          maxHeight: "72vh"
        }}>
          {/* Inbox */}
          <div
            style={{
              width: 433,
              minWidth: 250,
              background: "#181818",
              borderRadius: 16,
              padding: 12,
              margin: "0 10px 0 26px",
              overflowY: "auto",
              flexShrink: 0,
              maxHeight: "72vh"
            }}
          >
            <div style={{
              fontWeight: 700,
              fontSize: 22,
              color: "#FFC32B",
              marginBottom: 10,
              userSelect: "none"
            }}>
              Inbox
            </div>
            {filtered.map(conv => (
              <div
                key={conv.peerAddress}
                onClick={() => handleSelectInbox(conv.peerAddress)}
                style={{
                  cursor: "pointer",
                  marginBottom: 8,
                  padding: 10,
                  background: selectedPeer === conv.peerAddress ? "#FFC32B" : "#232323",
                  borderRadius: 10,
                  color: selectedPeer === conv.peerAddress ? "#181511" : "#FFC32B",
                  border: selectedPeer === conv.peerAddress ? "2px solid #FFC32B" : "none",
                  transition: "all 0.2s"
                }}
              >
                <div style={{ fontWeight: 700 }}>
                  {shortEth(conv.peerAddress)}
                  {isNewMsg(conv) && (
                    <span style={{
                      color: "#FFD700",
                      marginLeft: 7,
                      fontWeight: 900,
                      fontSize: 19,
                      verticalAlign: "middle"
                    }}>•</span>
                  )}
                </div>
                <div style={{
                  fontSize: 14,
                  color: selectedPeer === conv.peerAddress ? "#181511" : "#FFC32B",
                  marginBottom: 4,
                }}>
                  {conv.lastMsg}
                </div>
                <div style={{
                  fontSize: 12,
                  color: "#FFD700",
                  letterSpacing: 0.5,
                  marginTop: 2,
                }}>
                  {conv.lastTime
                    ? new Date(conv.lastTime).toLocaleString()
                    : ""}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ color: "#aaa", marginTop: 16 }}>No conversations yet.</div>
            )}
          </div>
          {/* Buscador */}
          <div
            style={{
              width: 340,
              minWidth: 240,
              background: "#181818",
              borderRadius: 16,
              padding: 44,
              margin: "0 10px",
              alignSelf: "flex-start",
              height: 140,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <form
              onSubmit={handleSearch}
              style={{
                width: "100%",
                margin: 0,
              }}
            >
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search address or ENS"
                style={{
                  width: "100%",
                  padding: "18px 20px",
                  borderRadius: 14,
                  border: "1.5px solid #FFC32B",
                  fontSize: 20,
                  background: "#232323",
                  color: "#FFC32B",
                  fontFamily: "'Piedra', cursive",
                }}
              />
              <button
                type="submit"
                style={{
                  display: "none"
                }}
              >Search</button>
            </form>
          </div>
          {/* Chat */}
          <div
            style={{
              flex: 1,
              minWidth: 240,
              margin: "0 10px 0 0",
              borderRadius: 18,
              background: "transparent",
              overflow: "auto"
            }}
          >
            {selectedPeer && myAddress && xmtp && (
              <XmtpChat myAddress={myAddress} xmtp={xmtp} peerAddress={selectedPeer} />
            )}
            {!selectedPeer && (
              <div style={{ color: "#aaa", fontSize: 20, marginTop: 80, textAlign: "center" }}>
                Select a conversation or search for an address to start chatting.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else if (activeMenu === 'groups') {
    mainPanel = <SnapshotDAOs />;
  } else if (activeMenu === 'settings') {
    mainPanel = <SettingsScreen onDisconnect={onDisconnect} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: logoBgColor,
        color: "#FFC32B",
        fontFamily: "'Piedra', cursive",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        position: "relative"
      }}
    >
      <div style={{ width: "100%", flex: 1 }}>{mainPanel}</div>
      {/* BOTTOM NAV */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
          background: logoBgColor,
          padding: "18px 0 9px 0",
          borderTop: "1.5px solid #232323",
          zIndex: 40,
        }}
      >
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => { setActiveMenu('chats'); setSelectedPeer(null); }}>
          <MdChat size={34} color={activeMenu === 'chats' ? "#FFD700" : "#FFC32B"} />
          <div style={{
            color: activeMenu === 'chats' ? "#FFD700" : "#FFC32B",
            fontFamily: "'Piedra', cursive",
            fontSize: 18,
            fontWeight: activeMenu === 'chats' ? 700 : 400
          }}>
            Chats
          </div>
        </div>
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setActiveMenu('groups')}>
          <MdGroups size={34} color={activeMenu === 'groups' ? "#FFD700" : "#FFC32B"} />
          <div style={{
            color: activeMenu === 'groups' ? "#FFD700" : "#FFC32B",
            fontFamily: "'Piedra', cursive",
            fontSize: 18,
            fontWeight: activeMenu === 'groups' ? 700 : 400
          }}>
            Groups
          </div>
        </div>
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setActiveMenu('settings')}>
          <FaCog size={34} color={activeMenu === 'settings' ? "#FFD700" : "#FFC32B"} />
          <div style={{
            color: activeMenu === 'settings' ? "#FFD700" : "#FFC32B",
            fontFamily: "'Piedra', cursive",
            fontSize: 18,
            fontWeight: activeMenu === 'settings' ? 700 : 400
          }}>
            Settings
          </div>
        </div>
      </div>
    </div>
  );
}