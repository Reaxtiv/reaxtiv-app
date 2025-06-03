import React from "react";

export default function WelcomeScreen({ onConnect }) {
  // Cambia aquí el color si tu logo usa otro negro distinto a #181511
  const logoBgColor = "#0A0804";
  return (
    <div
      style={{
        minHeight: "100vh",
        background: logoBgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Piedra', cursive",
        color: "#FFC32B",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 36 }}>
        <img
          src="/logo.png"
          alt="RΞAXTIV Logo"
          style={{
            width: 350,
            height: 350,
            objectFit: "contain",
            borderRadius: 40,
            boxShadow: "0 0 44px #FFD70088",
          }}
        />
      </div>
      {/* Brand */}
      <div
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          fontSize: 82,
          letterSpacing: "0.04em",
          marginBottom: 18,
          color: "#FFC32B",
          textShadow: "0 2px 10px #FFD700", // sombra dorada más sutil
        }}
      >
        R&#x039E;AXTIV
      </div>
      {/* Slogan */}
      <div
        style={{
          color: "#FFC32B",
          fontWeight: 400,
          fontSize: 32,
          marginBottom: 38,
          fontFamily: "'Piedra', cursive",
        }}
      >
        Code your voice
      </div>
      {/* Connect Button */}
      <button
        onClick={onConnect}
        style={{
          background: "#FFC32B",
          color: "#0A0804",
          fontWeight: 700,
          fontSize: 24,
          border: "none",
          borderRadius: 40,
          padding: "18px 54px",
          marginBottom: 24,
          boxShadow: "0 2px 12px #FFC32B33",
          fontFamily: "'Piedra', cursive",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
      >
        Connect wallet
      </button>
      {/* Privacy Note */}
      <div
        style={{
          color: "#fff",
          fontWeight: 400,
          fontSize: 22,
          marginTop: 0,
          textAlign: "center",
          fontFamily: "'Piedra', cursive",
          maxWidth: 340,
          lineHeight: "1.25",
          letterSpacing: "0.01em",
        }}
      >
        Your privacy, your control. No email or<br />phone required
      </div>
    </div>
  );
}