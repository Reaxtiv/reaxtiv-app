import React, { useState, useRef, useEffect } from "react";
import WalletSigned from "./components/WalletSigned";
import SettingsScreen from "./components/SettingsScreen";
import SendScreen from "./components/SendScreen";
import SnapshotDAOs from "./components/SnapshotDAOs";
import ChatsScreen from "./components/ChatsScreen";
import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";
import { AiOutlineMessage } from "react-icons/ai";
import { FaWallet } from "react-icons/fa";
import { RiCommunityLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";

// Icono de billetera para el menú
const WalletIcon = ({ active }) => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <rect x="7" y="12" width="24" height="14" rx="4" stroke="#FFC32B" strokeWidth="2.5" fill={active ? "#FFC32B22" : "none"}/>
    <rect x="23" y="18" width="6" height="4" rx="2" fill="#FFC32B"/>
    <circle cx="27" cy="20" r="1.7" fill="#181511"/>
  </svg>
);

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [signed, setSigned] = useState(false);
  const [activeMenu, setActiveMenu] = useState("chats");
  const [xmtp, setXmtp] = useState(null);
  const xmtpRef = useRef(null);

  // Connect and sign with Metamask, store address in localStorage for session persistence
  const connectWallet = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts && accounts[0]) {
          setWallet(accounts[0]);
        }
      } catch (err) {
        alert("Connection rejected.");
      }
    } else {
      alert("Please install MetaMask extension in your browser.");
    }
  };

  // Request signature on WalletSigned screen (after connect)
  const signAndProceed = async (ethAddress) => {
    try {
      const message = "Sign to enter RΞAXTIV. This proves wallet ownership.";
      await window.ethereum.request({
        method: "personal_sign",
        params: [message, ethAddress],
      });
      setSigned(true);
      localStorage.setItem("reaxtiv_myAddress", ethAddress);
    } catch (signError) {
      setSigned(false);
      alert("You must sign the message in MetaMask to continue.");
    }
  };

  // Initialize XMTP only once per session (don't ask for signature every menu change)
  useEffect(() => {
    const setupXmtp = async () => {
      if (!wallet || !signed) {
        setXmtp(null);
        xmtpRef.current = null;
        return;
      }
      if (xmtpRef.current) {
        setXmtp(xmtpRef.current);
        return;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const _xmtp = await Client.create(signer, { env: "production" });
        setXmtp(_xmtp);
        xmtpRef.current = _xmtp;
      } catch (err) {
        setXmtp(null);
        xmtpRef.current = null;
      }
    };
    setupXmtp();
  }, [wallet, signed]);

  const disconnect = () => {
    setWallet(null);
    setSigned(false);
    setActiveMenu("chats");
    setXmtp(null);
    xmtpRef.current = null;
    localStorage.removeItem("reaxtiv_myAddress");
  };

  // On mount, restore wallet from localStorage (if any)
  useEffect(() => {
    const addr = localStorage.getItem("reaxtiv_myAddress");
    if (addr && !wallet) setWallet(addr);
  }, [wallet]);

  // Main UI
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
        <img src="/logo.png" alt="logo"
          style={{
            width: 340,
            marginBottom: 24,
            borderRadius: 72,
            background: "transparent",
            display: "block"
          }}
        />
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

  if (wallet && !signed) {
    return (
      <WalletSigned
        wallet={wallet}
        onOk={() => signAndProceed(wallet)}
        onDisconnect={disconnect}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#000000",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {activeMenu === "chats" && (
        <ChatsScreen
          xmtp={xmtp}
          myAddress={wallet}
          onDisconnect={disconnect}
        />
      )}
      {activeMenu === "settings" && (
        <SettingsScreen onDisconnect={disconnect} />
      )}
      {activeMenu === "wallet" && ( // <--- Cambiado de send a wallet
        <SendScreen wallet={wallet} />
      )}
      {activeMenu === "daos" && (
        <SnapshotDAOs />
      )}
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
          <AiOutlineMessage size={38} color={activeMenu === "chats" ? "#FFD700" : "#FFC32B"} />
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
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setActiveMenu("wallet")}>
          <FaWallet size={38} color={activeMenu === "wallet" ? "#FFD700" : "#FFC32B"} />
          <div style={{
            color: "#FFC32B",
            fontFamily: "'Piedra', cursive",
            fontSize: 22,
            fontWeight: activeMenu === "wallet" ? 700 : 400,
            marginTop: 3,
          }}>
            Wallet
          </div>
        </div>
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setActiveMenu("daos")}>
          <RiCommunityLine size={38} color={activeMenu === "daos" ? "#FFD700" : "#FFC32B"} />
          <div style={{
            color: "#FFC32B",
            fontFamily: "'Piedra', cursive",
            fontSize: 22,
            fontWeight: activeMenu === "daos" ? 700 : 400,
            marginTop: 3,
          }}>
            DAOs
          </div>
        </div>
        <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setActiveMenu("settings")}>
          <FiSettings size={38} color={activeMenu === "settings" ? "#FFD700" : "#FFC32B"} />
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