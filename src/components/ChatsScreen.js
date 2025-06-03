import React, { useState } from "react";

// Simple speech bubble icon
const SimpleBubbleIcon = ({ color = "#FFC32B", size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="4" y="7" width="24" height="15" rx="6" stroke={color} strokeWidth="2" />
    <path d="M8 22 L6 27 L14 22" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);
// Simple gear icon
const SimpleGearIcon = ({ color = "#FFC32B", size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="2"/>
    <g stroke={color} strokeWidth="2">
      <path d="M16 3v4" />
      <path d="M16 25v4" />
      <path d="M3 16h4" />
      <path d="M25 16h4" />
      <path d="M8.4 8.4l2.8 2.8" />
      <path d="M21.2 21.2l2.8 2.8" />
      <path d="M21.2 10.8l2.8-2.8" />
      <path d="M8.4 23.6l2.8-2.8" />
    </g>
  </svg>
);
// Send (paper plane)
const SendIcon = ({ color = "#FFC32B", size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <polygon points="4,28 28,16 4,4 8,16" fill="none" stroke={color} strokeWidth="2"/>
  </svg>
);
// Groups (two heads)
const GroupsIcon = ({ color = "#FFC32B", size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="10" cy="14" r="4" stroke={color} strokeWidth="2" fill="none"/>
    <circle cx="22" cy="14" r="4" stroke={color} strokeWidth="2" fill="none"/>
    <ellipse cx="16" cy="22" rx="8" ry="4" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

const logoBgColor = "#181511";
function shortEth(address) {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
}
const unknownEth = "0xA1b2C3d4E5f6a7b8c9d0Ef12Ab34Cd56Ef78De90";

const chats = [
  {
    name: shortEth(unknownEth),
    eth: unknownEth,
    message: "New unread message!",
    time: "13:10",
    unread: true,
    active: true,
    id: 1,
    isUnknown: true,
    conversation: [
      { from: unknownEth, text: "New unread message!", filterable: true },
    ],
  },
  {
    name: "Charlie",
    message: "Thanks a lot!",
    time: "15:10",
    unread: false,
    active: false,
    id: 2,
    conversation: [
      { from: "Charlie", text: "Hey! Have you read much about DAOs lately?" },
      { from: "Me", text: "Yes, I've been following some projects. DAOs really change how communities make decisions." },
      { from: "Charlie", text: "Absolutely! I'm working on a proposal for a digital art DAO." },
      { from: "Me", text: "That sounds awesome. Do you already have a governance model in mind?" },
      { from: "Charlie", text: "I'm thinking token-based voting at first, but open to suggestions." },
      { from: "Me", text: "Let me know if you want feedback or help writing the proposal!" },
      { from: "Charlie", text: "Thanks a lot!" },
    ],
  },
  {
    name: "Alice",
    message: "Did you get the contract?",
    time: "22:34",
    unread: false,
    active: false,
    id: 3,
    conversation: [
      { from: "Me", text: "Hi Alice! I sent over the documents this morning." },
      { from: "Alice", text: "Great, I'll check my email." },
      { from: "Me", text: "Let me know if you have any questions." },
      { from: "Alice", text: "Did you get the contract?" },
    ],
  },
];

function ChatDetail({
  chat,
  onBack,
  onAcceptUnknown,
  onRejectUnknown,
  acceptedUnknown,
  rejectedUnknown,
}) {
  const isUnknown = chat.isUnknown;
  const showFilter = isUnknown && !acceptedUnknown && !rejectedUnknown;

  return (
    <div style={{
      minHeight: "100vh",
      background: logoBgColor,
      color: "#FFC32B",
      fontFamily: "'Piedra', cursive",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "28px 0 0 0",
      boxSizing: "border-box",
      position: "relative",
      paddingBottom: 110,
    }}>
      <button onClick={onBack} style={{
        alignSelf: "flex-start",
        marginLeft: 14,
        background: "none",
        border: "none",
        color: "#FFC32B",
        fontSize: 22,
        cursor: "pointer",
        marginBottom: 8,
      }}>← Back</button>
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: 700,
        fontSize: 36,
        letterSpacing: "0.04em",
        color: "#FFC32B",
        marginBottom: 18,
      }}>
        {chat.name}
      </div>
      <div style={{
        width: "92%",
        margin: "0 auto",
        flex: 1,
      }}>
        {chat.conversation.length === 0 ? (
          <div style={{
            color: "#666",
            textAlign: "center",
            marginTop: 80,
            fontSize: 22,
          }}>
            No messages yet.
          </div>
        ) : (
          chat.conversation.map((msg, idx) =>
            <div
              key={idx}
              style={{
                textAlign: msg.from === "Me" ? "right" : "left",
                marginBottom: 14,
                position: "relative"
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  background: msg.from === "Me" ? "#FFC32B" : "#232323",
                  color: msg.from === "Me" ? "#181511" : "#FFC32B",
                  borderRadius: 18,
                  padding: "10px 20px",
                  fontSize: 18,
                  maxWidth: "70%",
                  fontFamily: "'Piedra', cursive",
                  boxShadow: "0 1px 4px #00000033",
                }}
              >
                {msg.text}
              </span>
              {/* Accept/Reject for unknown first msg */}
              {showFilter && idx === 0 && (
                <div style={{ marginTop: 14, display: "flex", gap: 16, justifyContent: "center" }}>
                  <button
                    onClick={onAcceptUnknown}
                    style={{
                      background: "#23F600",
                      color: "#181511",
                      fontWeight: 700,
                      fontSize: 18,
                      border: "none",
                      borderRadius: 18,
                      padding: "10px 24px",
                      fontFamily: "'Piedra', cursive",
                      cursor: "pointer",
                      transition: "background 0.2s"
                    }}
                  >
                    Accept
                  </button>
                  <button
                    onClick={onRejectUnknown}
                    style={{
                      background: "#FF2222",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 18,
                      border: "none",
                      borderRadius: 18,
                      padding: "10px 24px",
                      fontFamily: "'Piedra', cursive",
                      cursor: "pointer",
                      transition: "background 0.2s"
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}
              {acceptedUnknown && idx === 0 && (
                <div style={{ color: "#23F600", fontSize: 18, marginTop: 12, textAlign: "center" }}>
                  Sender accepted. Messages will appear here.
                </div>
              )}
              {rejectedUnknown && idx === 0 && (
                <div style={{ color: "#FF2222", fontSize: 18, marginTop: 12, textAlign: "center" }}>
                  Sender rejected. This conversation will be hidden.
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

function SendScreen() {
  return (
    <div style={{
      minHeight: "calc(100vh - 110px)",
      background: logoBgColor,
      color: "#FFC32B",
      fontFamily: "'Piedra', cursive",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "28px 0 0 0",
      boxSizing: "border-box"
    }}>
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: 700,
        fontSize: 36,
        letterSpacing: "0.04em",
        color: "#FFC32B",
        marginBottom: 12,
        textShadow: "0 2px 10px #FFD700",
      }}>
        R&#x039E;AXTIV
      </div>
      <div style={{
        fontFamily: "'Piedra', cursive",
        fontSize: 36,
        marginBottom: 20,
        color: "#FFC32B"
      }}>
        Send tokens
      </div>
      {/* Wallet arrows */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <div style={{
          background: "#232323",
          color: "#FFC32B",
          border: "2px solid #FFC32B",
          borderRadius: 16,
          padding: "16px 28px",
          fontSize: 20,
          marginRight: 8
        }}>You</div>
        <svg width="80" height="48" style={{margin: "0 10px"}}><path d="M5 35 Q40 0 75 35" stroke="#FFC32B" strokeWidth="3" fill="none"/><path d="M5 13 Q40 48 75 13" stroke="#FFC32B" strokeWidth="3" fill="none"/></svg>
        <div style={{
          background: "#232323",
          color: "#FFC32B",
          border: "2px solid #FFC32B",
          borderRadius: 16,
          padding: "16px 28px",
          fontSize: 20,
          marginLeft: 8
        }}>0xA1...91</div>
      </div>
      {/* Token selection */}
      <div style={{
        display: "flex",
        alignItems: "center",
        background: "#232323",
        border: "2px solid #FFC32B",
        borderRadius: 28,
        width: 260,
        marginBottom: 18,
        fontSize: 22,
        justifyContent: "space-between",
        padding: "0 18px"
      }}>
        <span>USDT</span>
        <img src="https://cryptologos.cc/logos/tether-usdt-logo.png?v=029" alt="usdt" style={{width: 34, height: 34, marginLeft: 10}} />
      </div>
      {/* To address */}
      <div style={{
        fontSize: 14,
        color: "#CCCCCC",
        marginBottom: 2,
        marginLeft: 8,
        alignSelf: "flex-start"
      }}>To (address or ENS)</div>
      <div style={{
        background: "#232323",
        border: "2px solid #FFC32B",
        borderRadius: 16,
        width: 320,
        fontSize: 22,
        color: "#FFC32B",
        padding: "14px 18px",
        marginBottom: 18
      }}>
        0xA1a3...eF91
      </div>
      {/* Amount */}
      <div style={{fontSize: 14, color: "#CCCCCC", marginBottom: 2, marginLeft: 8, alignSelf: "flex-start" }}>Amount</div>
      <div style={{
        display: "flex",
        alignItems: "center",
        background: "#232323",
        border: "2px solid #FFC32B",
        borderRadius: 28,
        width: 260,
        fontSize: 22,
        color: "#FFC32B",
        justifyContent: "space-between",
        padding: "0 18px"
      }}>
        <span>120</span>
        <span style={{marginLeft: "10px"}}>USDT</span>
        <img src="https://cryptologos.cc/logos/tether-usdt-logo.png?v=029" alt="usdt" style={{width: 34, height: 34, marginLeft: 10}} />
      </div>
    </div>
  );
}
function GroupsScreen() {
  return (
    <div style={{
      minHeight: "calc(100vh - 110px)",
      background: logoBgColor,
      color: "#FFC32B",
      fontFamily: "'Piedra', cursive",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "28px 0 0 0",
      boxSizing: "border-box"
    }}>
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: 700,
        fontSize: 36,
        letterSpacing: "0.04em",
        color: "#FFC32B",
        marginBottom: 22,
        textShadow: "0 2px 10px #FFD700",
      }}>
        R&#x039E;AXTIV
      </div>
      <div style={{ fontSize: 32, marginBottom: 14 }}>Groups</div>
      <div style={{ fontSize: 18, color: "#fff", textAlign: "center" }}>
        Here you will see your groups and DAOs.<br />
        (Sample screen. Add your group list and features here.)
      </div>
    </div>
  );
}
function SettingsScreen({ onDisconnect }) {
  return (
    <div style={{
      minHeight: "calc(100vh - 110px)",
      background: logoBgColor,
      color: "#FFC32B",
      fontFamily: "'Piedra', cursive",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "28px 0 0 0",
      boxSizing: "border-box"
    }}>
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: 700,
        fontSize: 36,
        letterSpacing: "0.04em",
        color: "#FFC32B",
        marginBottom: 22,
        textShadow: "0 2px 10px #FFD700",
      }}>
        R&#x039E;AXTIV
      </div>
      <div style={{ fontSize: 32, marginBottom: 14 }}>Settings</div>
      <div style={{ fontSize: 18, color: "#fff", textAlign: "center" }}>
        Here you can adjust your preferences.<br />
        (Sample screen. Add your user options here.)
      </div>
      <button
        onClick={onDisconnect}
        style={{
          marginTop: 32,
          background: "#FFC32B",
          color: "#181511",
          fontWeight: 700,
          fontSize: 18,
          border: "none",
          borderRadius: 24,
          padding: "12px 32px",
          fontFamily: "'Piedra', cursive",
          cursor: "pointer",
          transition: "background 0.2s"
        }}
      >
        Disconnect
      </button>
    </div>
  );
}

export default function ChatsScreen({ onDisconnect }) {
  const [search, setSearch] = useState('');
  const [openedChat, setOpenedChat] = useState(null);
  const [activeMenu, setActiveMenu] = useState('chats');
  const [acceptedUnknown, setAcceptedUnknown] = useState(false);
  const [rejectedUnknown, setRejectedUnknown] = useState(false);

  let mainPanel;
  if (activeMenu === 'chats') {
    if (openedChat) {
      const isUnknown = openedChat.isUnknown;
      mainPanel = (
        <ChatDetail
          chat={openedChat}
          onBack={() => {
            setOpenedChat(null);
            setAcceptedUnknown(false);
            setRejectedUnknown(false);
          }}
          onAcceptUnknown={() => {
            setAcceptedUnknown(true);
            setRejectedUnknown(false);
          }}
          onRejectUnknown={() => {
            setRejectedUnknown(true);
            setAcceptedUnknown(false);
          }}
          acceptedUnknown={isUnknown && acceptedUnknown}
          rejectedUnknown={isUnknown && rejectedUnknown}
        />
      );
    } else {
      const filtered = chats.filter(
        c =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.message.toLowerCase().includes(search.toLowerCase())
      );
      mainPanel = (
        <div style={{ width: "100%", paddingBottom: 110 }}>
          {/* Brand */}
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: 36,
              letterSpacing: "0.04em",
              color: "#FFC32B",
              marginBottom: 12,
              textShadow: "0 2px 10px #FFD700",
              textAlign: "center"
            }}
          >
            R&#x039E;AXTIV
          </div>
          <div
            style={{
              fontFamily: "'Piedra', cursive",
              fontSize: 36,
              color: "#FFC32B",
              marginBottom: 12,
              marginRight: "auto",
              marginLeft: 36,
            }}
          >
            Chats
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search chat, ENS or address"
            style={{
              width: "84%",
              padding: "16px 22px",
              margin: "0 0 18px 0",
              border: "none",
              borderRadius: 28,
              background: "#232323",
              color: "#fff",
              fontSize: 18,
              fontFamily: "'Piedra', cursive",
              outline: "none",
            }}
          />
          <div style={{ width: "92%", flex: 1 }}>
            {filtered.map((chat, idx) => (
              <div
                key={chat.id}
                onClick={() => {
                  setOpenedChat(chat);
                  setAcceptedUnknown(false);
                  setRejectedUnknown(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#232323",
                  borderRadius: 28,
                  padding: "14px 16px",
                  marginBottom: 16,
                  position: "relative",
                  boxShadow: chat.unread
                    ? "0 0 12px #FFC32B33"
                    : "0 1px 2px #00000044",
                  cursor: "pointer",
                  opacity: 1,
                  transition: "background 0.18s, box-shadow 0.18s",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: "#FFC32B",
                    borderRadius: "50%",
                    marginRight: 16,
                    flexShrink: 0,
                  }}
                ></div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#FFC32B",
                      fontFamily: "'Piedra', cursive",
                    }}
                  >
                    {chat.name}
                  </div>
                  <div
                    style={{
                      color: chat.unread ? "#FFC32B" : "#fff",
                      fontSize: 17,
                      fontWeight: chat.unread ? 700 : 400,
                      marginTop: 2,
                      fontFamily: "'Piedra', cursive",
                    }}
                  >
                    {chat.message}
                  </div>
                </div>
                <div style={{ textAlign: "right", marginLeft: 12 }}>
                  <div
                    style={{
                      color: "#FFC32B",
                      fontSize: 15,
                      fontFamily: "'Piedra', cursive",
                      marginBottom: 2,
                    }}
                  >
                    {chat.time}
                  </div>
                  {chat.active && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        background: "#23F600",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  } else if (activeMenu === 'send') {
    mainPanel = <SendScreen />;
  } else if (activeMenu === 'groups') {
    mainPanel = <GroupsScreen />;
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
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => { setActiveMenu('chats'); setOpenedChat(null); }}>
          <SimpleBubbleIcon color={activeMenu === 'chats' ? "#FFD700" : "#FFC32B"} />
          <div style={{
            color: activeMenu === 'chats' ? "#FFD700" : "#FFC32B",
            fontFamily: "'Piedra', cursive",
            fontSize: 22,
            fontWeight: activeMenu === 'chats' ? 700 : 400
          }}>
            Chats
          </div>
        </div>
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setActiveMenu('send')}>
          <SendIcon color={activeMenu === 'send' ? "#FFD700" : "#FFC32B"} />
          <div style={{
            color: activeMenu === 'send' ? "#FFD700" : "#FFC32B",
            fontFamily: "'Piedra', cursive",
            fontSize: 22,
            fontWeight: activeMenu === 'send' ? 700 : 400
          }}>
            Send
          </div>
        </div>
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setActiveMenu('groups')}>
          <GroupsIcon color={activeMenu === 'groups' ? "#FFD700" : "#FFC32B"} />
          <div style={{
            color: activeMenu === 'groups' ? "#FFD700" : "#FFC32B",
            fontFamily: "'Piedra', cursive",
            fontSize: 22,
            fontWeight: activeMenu === 'groups' ? 700 : 400
          }}>
            Groups
          </div>
        </div>
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setActiveMenu('settings')}>
          <SimpleGearIcon color={activeMenu === 'settings' ? "#FFD700" : "#FFC32B"} />
          <div style={{
            color: activeMenu === 'settings' ? "#FFD700" : "#FFC32B",
            fontFamily: "'Piedra', cursive",
            fontSize: 22,
            fontWeight: activeMenu === 'settings' ? 700 : 400
          }}>
            Settings
          </div>
        </div>
      </div>
    </div>
  );
}