import React from "react";

function shortWallet(address) {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export default function WalletSigned({ wallet, onOk, onDisconnect }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        color: "#FFC32B",
        fontFamily: "'Piedra', cursive",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",           // Centrado horizontal
        justifyContent: "center",       // Centrado vertical
        padding: 0,
      }}
    >
      <div
        style={{
          background: "#232323",
          borderRadius: 32,
          padding: "44px 36px",
          boxShadow: "0 2px 24px #ffd70044",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 320,
        }}
      >
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            fontSize: 36,
            letterSpacing: "0.04em",
            color: "#FFC32B",
            marginBottom: 10,
          }}
        >
          R&#x039E;AXTIV
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 28, textAlign: "center" }}>
          Wallet connected and signed!
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 26,
            marginBottom: 22,
            background: "#181511",
            borderRadius: 14,
            padding: "12px 32px",
            color: "#FFC32B",
            letterSpacing: "1px",
          }}
        >
          {shortWallet(wallet)}
        </div>
        <button
          onClick={onOk}
          style={{
            background: "#FFC32B",
            color: "#181511",
            fontWeight: 700,
            fontSize: 19,
            border: "none",
            borderRadius: 24,
            padding: "12px 30px",
            marginTop: 6,
            fontFamily: "'Piedra', cursive",
            cursor: "pointer",
          }}
        >
          OK
        </button>
        <button
          onClick={onDisconnect}
          style={{
            background: "#FFC32B",
            color: "#181511",
            fontWeight: 700,
            fontSize: 19,
            border: "none",
            borderRadius: 24,
            padding: "12px 30px",
            marginTop: 12,
            fontFamily: "'Piedra', cursive",
            cursor: "pointer",
          }}
        >
          Disconnect
        </button>
        <div
          style={{
            color: "#fff",
            fontWeight: 400,
            fontSize: 16,
            marginTop: 22,
            textAlign: "center",
            fontFamily: "'Piedra', cursive",
            maxWidth: 280,
            lineHeight: "1.25",
          }}
        >
          Your privacy, your control. No email or phone required
        </div>
      </div>
    </div>
  );
}