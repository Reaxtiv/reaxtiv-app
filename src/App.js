import React, { useState } from "react";
import WalletSigned from "./components/WalletSigned";
import ChatsScreen from "./components/ChatsScreen";
import GroupsScreen from "./components/GroupsScreen";
import GroupChatScreen from "./components/GroupChatScreen";
import SettingsScreen from "./components/SettingsScreen";
import SendScreen from "./components/SendScreen";

// Logo local desde /public/logo.png (más grande)
const Logo = () => (
  <img
    src="/logo.png"
    alt="logo"
    style={{
      width: 340,
      marginBottom: 24,
      borderRadius: 72,
      background: "transparent",
      display: "block"
    }}
  />
);

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [signed, setSigned] = useState(false);
  const [activeMenu, setActiveMenu] = useState("chats");
  const [openGroup, setOpenGroup] = useState(null);

  // Conexión y firma en Metamask
  const connectWallet = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts && accounts[0]) {
          // Solicita firma para identificar
          try {
            const message = "Sign to enter RΞAXTIV. This proves wallet ownership.";
            await window.ethereum.request({
              method: "personal_sign",
              params: [message, accounts[0]],
            });
            setWallet(accounts[0]);
          } catch (signError) {
            alert("You must sign the message in MetaMask to continue.");
          }
        }
      } catch (err) {
        alert("Connection rejected.");
      }
    } else {
      alert("Please install MetaMask extension in your browser.");
    }
  };

  const disconnect = () => {
    setWallet(null);
    setSigned(false);
    setOpenGroup(null);
    setActiveMenu("chats");
  };

  // Pantalla de bienvenida
  if (!wallet) {
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
          justifyContent: "flex-start",
        }}
      >
        <div style={{height: 34}}></div>
        <Logo />
        <h1
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            fontSize: 84,
            letterSpacing: "0.04em",
            color: "#FFC32B",
            marginBottom: 14,
            marginTop: 0,
            textShadow: "none",
            textAlign: "center"
          }}
        >
          RΞAXTIV
        </h1>
        <div
          style={{
            fontFamily: "'Piedra', cursive",
            fontSize: 40,
            marginBottom: 50,
            color: "#FFC32B",
            textAlign: "center",
            maxWidth: 520,
            lineHeight: 1.18
          }}
        >
          Code your voice
        </div>
        <button
          onClick={connectWallet}
          style={{
            background: "#FFC32B",
            color: "#181511",
            fontWeight: 700,
            fontSize: 32,
            border: "none",
            borderRadius: 44,
            padding: "28px 80px",
            fontFamily: "'Piedra', cursive",
            cursor: "pointer",
            marginTop: 12,
            boxShadow: "0 0 24px #FFD700"
          }}
        >
          Connect Wallet
        </button>
        <div
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 26,
            marginTop: 48,
            textAlign: "center",
            fontFamily: "'Piedra', cursive",
            maxWidth: 440,
            lineHeight: "1.25",
            opacity: 1
          }}
        >
          Your privacy, your control. No email or phone required.
        </div>
      </div>
    );
  }

  // Pantalla de wallet firmada
  if (wallet && !signed) {
    return (
      <WalletSigned
        wallet={wallet}
        onOk={() => setSigned(true)}
        onDisconnect={disconnect}
      />
    );
  }

  // Pantalla de chat grupal
  if (openGroup) {
    return (
      <GroupChatScreen
        group={openGroup}
        onBack={() => setOpenGroup(null)}
      />
    );
  }

  // Navegación principal (después de login)
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#000000",
        position: "relative",
      }}
    >
      <div style={{ width: "100%", minHeight: "calc(100vh - 110px)" }}>
        {activeMenu === "chats" && (
          <ChatsScreen onDisconnect={disconnect} />
        )}
        {activeMenu === "groups" && (
          <GroupsScreen onOpenGroup={setOpenGroup} />
        )}
        {activeMenu === "settings" && (
          <SettingsScreen onDisconnect={disconnect} />
        )}
        {activeMenu === "send" && (
          <SendScreen />
        )}
      </div>
      {/* Bottom nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
          background: "#000000",
          padding: "18px 0 9px 0",
          borderTop: "1.5px solid #232323",
          zIndex: 40,
        }}
      >
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setActiveMenu("chats")}>
          <svg width="38" height="38" viewBox="0 0 36 36" fill="none">
            <rect x="5" y="8" width="26" height="16" rx="6" stroke="#FFC32B" strokeWidth="2.5" />
            <path d="M10 24 L8 30 L16 24" stroke="#FFC32B" strokeWidth="2.5" fill="none"/>
          </svg>
          <div style={{
            color: "#FFC32B",
            fontFamily: "'Piedra', cursive",
            fontSize: 22,
            fontWeight: activeMenu === "chats" ? 700 : 400,
            marginTop: 3,
          }}>
            Chats
          </div>
        </div>
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setActiveMenu("send")}>
          {/* Icono de enviar */}
          <svg width="38" height="38" viewBox="0 0 36 36" fill="none">
            <polygon points="6,32 32,18 6,4 10,18" fill="none" stroke="#FFC32B" strokeWidth="2.5"/>
          </svg>
          <div style={{
            color: "#FFC32B",
            fontFamily: "'Piedra', cursive",
            fontSize: 22,
            fontWeight: activeMenu === "send" ? 700 : 400,
            marginTop: 3,
          }}>
            Send
          </div>
        </div>
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setActiveMenu("groups")}>
          <svg width="38" height="38" viewBox="0 0 36 36" fill="none">
            <circle cx="12" cy="16" r="5" stroke="#FFC32B" strokeWidth="2.5" fill="none"/>
            <circle cx="26" cy="16" r="5" stroke="#FFC32B" strokeWidth="2.5" fill="none"/>
            <ellipse cx="19" cy="27" rx="11" ry="6" stroke="#FFC32B" strokeWidth="2.5" fill="none"/>
          </svg>
          <div style={{
            color: "#FFC32B",
            fontFamily: "'Piedra', cursive",
            fontSize: 22,
            fontWeight: activeMenu === "groups" ? 700 : 400,
            marginTop: 3,
          }}>
            Groups
          </div>
        </div>
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setActiveMenu("settings")}>
          {/* Icono de llave inglesa */}
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path
              d="M27.5 28.8l-4.4-4.4a6 6 0 0 1-8.7-7.6l2.4 2.4 2.2-2.2-2.4-2.4a6 6 0 0 1 7.6 8.7l4.4 4.4a2 2 0 1 1-1.1 1.1z"
              stroke="#FFC32B" strokeWidth="2.5" fill="none"
            />
            <circle cx="17" cy="21" r="2.6" stroke="#FFC32B" strokeWidth="2.5" fill="none"/>
          </svg>
          <div style={{
            color: "#FFC32B",
            fontFamily: "'Piedra', cursive",
            fontSize: 22,
            fontWeight: activeMenu === "settings" ? 700 : 400,
            marginTop: 3,
          }}>
            Settings
          </div>
        </div>
      </div>
    </div>
  );
}