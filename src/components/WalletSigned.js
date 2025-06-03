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
        background: "#181511",
        color: "#FFC32B",
        fontFamily: "'Piedra', cursive",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2 style={{ marginBottom: 32, fontSize: 44, fontWeight: 700 }}>
        Wallet connected and signed!
      </h2>
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 28,
          marginBottom: 24,
          background: "#232323",
          borderRadius: 14,
          padding: "14px 38px",
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
          fontSize: 20,
          border: "none",
          borderRadius: 24,
          padding: "14px 34px",
          marginTop: 14,
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
          fontSize: 20,
          border: "none",
          borderRadius: 24,
          padding: "14px 34px",
          marginTop: 14,
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
          fontSize: 18,
          marginTop: 22,
          textAlign: "center",
          fontFamily: "'Piedra', cursive",
          maxWidth: 340,
          lineHeight: "1.25",
        }}
      >
        Your privacy, your control. No email or phone required
      </div>
    </div>
  );
}