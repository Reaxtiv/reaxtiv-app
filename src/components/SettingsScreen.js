import React, { useState } from "react";

export default function SettingsScreen({ onDisconnect }) {
  const [section, setSection] = useState("main");
  const [showLogout, setShowLogout] = useState(false);

  // Pantallas secundarias:
  if (section === "profile") return <ProfileScreen onBack={() => setSection("main")} />;
  if (section === "notifications") return <NotificationsScreen onBack={() => setSection("main")} />;
  if (section === "privacy") return <PrivacyScreen onBack={() => setSection("main")} />;
  if (section === "language") return <LanguageScreen onBack={() => setSection("main")} />;
  if (section === "wallet") return <WalletScreen onBack={() => setSection("main")} />;

  return (
    <div
      style={{
        minHeight: "calc(100vh - 110px)",
        background: "#000000",
        color: "#FFC32B",
        fontFamily: "'Piedra', cursive",
        padding: 0,
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          fontSize: 36,
          letterSpacing: "0.04em",
          color: "#FFC32B",
          marginBottom: 0,
          paddingLeft: 36,
          paddingTop: 36,
          boxSizing: "border-box"
        }}
      >
        RΞAXTIV
      </div>
      <div
        style={{
          fontFamily: "'Piedra', cursive",
          fontSize: 32,
          color: "#FFC32B",
          marginBottom: 28,
          paddingLeft: 36,
          textAlign: "left",
          boxSizing: "border-box",
          marginTop: 18 // <-- Añadido para bajar la palabra Settings
        }}
      >
        Settings
      </div>
      <div style={{
        width: "100%",
        paddingLeft: 36,
        paddingRight: 36,
        boxSizing: "border-box"
      }}>
        <div style={settingRowStyle} onClick={() => setSection("profile")}>
          <span style={activeLabelStyle}>Profile</span>
          <span style={inactiveLabelStyle}>Edit</span>
        </div>
        <div style={settingRowStyle} onClick={() => setSection("notifications")}>
          <span style={activeLabelStyle}>Notifications</span>
          <span style={inactiveLabelStyle}>On</span>
        </div>
        <div style={settingRowStyle} onClick={() => setSection("privacy")}>
          <span style={activeLabelStyle}>Privacy & Security</span>
          <span style={inactiveLabelStyle}>&gt;</span>
        </div>
        <div style={settingRowStyle} onClick={() => setSection("language")}>
          <span style={activeLabelStyle}>Language</span>
          <span style={inactiveLabelStyle}>EN</span>
        </div>
        <div style={settingRowStyle} onClick={() => setSection("wallet")}>
          <span style={activeLabelStyle}>Wallet & Tokens</span>
        </div>
        <div
          style={{
            ...settingRowStyle,
            marginBottom: 0,
            color: "#FFC32B",
            background: "#232323",
          }}
          onClick={() => setShowLogout(true)}
        >
          <span style={activeLabelStyle}>Log Out</span>
        </div>
      </div>
      {showLogout && (
        <LogoutDialog
          onConfirm={() => { setShowLogout(false); onDisconnect(); }}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  );
}

// Tamaño fuente acorde a los otros menús, bien visible
const settingRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  background: "#232323",
  borderRadius: 20,
  padding: "18px 22px",
  marginBottom: 18,
  fontFamily: "'Piedra', cursive",
  fontSize: 21,
  fontWeight: 700,
  cursor: "pointer",
  gap: 18,
  width: "100%",
  boxSizing: "border-box"
};

const activeLabelStyle = {
  color: "#FFC32B",
  fontWeight: 700,
  fontSize: 21,
  marginRight: 8,
  minWidth: 0,
};

const inactiveLabelStyle = {
  color: "#fff",
  fontWeight: 400,
  fontSize: 18,
  marginLeft: "auto",
};


// --- Pantallas secundarias ---

// Submenu wrapper centrado vertical pero alineado a la izquierda
const submenuStyle = {
  minHeight: "calc(100vh - 110px)",
  background: "#000000",
  color: "#FFC32B",
  fontFamily: "'Piedra', cursive",
  width: "100vw",
  boxSizing: "border-box",
  paddingLeft: 36,
  paddingRight: 24,
  paddingTop: 0,
  overflow: "hidden",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center", // centrado vertical
};

// Espaciado arriba para el header y luego contenido más centrado
const submenuHeaderStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: 24,
  marginTop: 1, // mayor separación superior
  width: "100%",
  justifyContent: "flex-start",
};

const submenuTitleStyle = {
  fontFamily: "'Piedra', cursive",
  fontSize: 24,
  color: "#FFC32B",
  textAlign: "left"
};

const backBtnStyle = {
  background: "none",
  border: "none",
  color: "#FFC32B",
  fontSize: 22,
  cursor: "pointer",
  marginRight: 18
};

const profileLabelStyle = {
  color: "#FFC32B",
  fontWeight: 700,
  fontSize: "1.3rem",
  minWidth: 60,
  textAlign: "right",
  marginRight: 8
};

const profileFieldStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  marginBottom: 22,
  fontSize: "1.3rem",
  width: "100%"
};

const inputStyle = {
  background: "#232323",
  color: "#FFC32B",
  border: "none",
  borderRadius: 8,
  padding: "8px 14px",
  fontSize: "1.2rem",
  fontFamily: "'Piedra', cursive",
  width: 140,
  marginLeft: 6
};

const saveButtonStyle = {
  background: "#FFC32B",
  color: "#181511",
  fontWeight: 700,
  fontSize: 18,
  border: "none",
  borderRadius: 14,
  padding: "12px 36px",
  fontFamily: "'Piedra', cursive",
  cursor: "pointer",
  marginTop: 14,
  marginBottom: 10,
  boxShadow: "0 0 8px #FFD700"
};

const centeredRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  marginBottom: 22,
  fontSize: "1.3rem",
  width: "100%"
};

const langItemStyle = {
  marginBottom: 14,
  cursor: "pointer"
};

function ProfileScreen({ onBack }) {
  return (
    <div style={submenuStyle}>
      <div style={submenuHeaderStyle}>
        <button onClick={onBack} style={backBtnStyle}>←</button>
        <div style={submenuTitleStyle}>Profile</div>
      </div>
      <div style={profileFieldStyle}>
        <span style={profileLabelStyle}>Name:</span>
        <input style={inputStyle} placeholder="Your Name" />
      </div>
      <div style={profileFieldStyle}>
        <span style={profileLabelStyle}>Avatar:</span>
        <span style={{fontSize: "1.3rem", color: "#fff", marginLeft: 16}}>Not available on web</span>
      </div>
      <div style={{...profileFieldStyle, flexDirection: "column", alignItems: "flex-start"}}>
        <span style={profileLabelStyle}>Bio:</span>
        <textarea style={{ ...inputStyle, height: 36, fontSize: "1.3rem", width: "90%", marginTop: 12 }} placeholder="Short bio..." />
      </div>
      <button style={saveButtonStyle}>Save</button>
    </div>
  );
}

function NotificationsScreen({ onBack }) {
  return (
    <div style={submenuStyle}>
      <div style={submenuHeaderStyle}>
        <button onClick={onBack} style={backBtnStyle}>←</button>
        <div style={submenuTitleStyle}>Notifications</div>
      </div>
      <div style={centeredRow}>
        <span style={profileLabelStyle}>Push Notifications:</span>
        <input type="checkbox" style={{ transform: "scale(1.3)", marginLeft: 20 }} />
      </div>
      <div style={centeredRow}>
        <span style={profileLabelStyle}>Email Alerts:</span>
        <input type="checkbox" style={{ transform: "scale(1.3)", marginLeft: 20 }} />
      </div>
      <button style={saveButtonStyle}>Save</button>
    </div>
  );
}

function PrivacyScreen({ onBack }) {
  return (
    <div style={submenuStyle}>
      <div style={submenuHeaderStyle}>
        <button onClick={onBack} style={backBtnStyle}>←</button>
        <div style={submenuTitleStyle}>Privacy & Security</div>
      </div>
      <div style={centeredRow}>
        <input type="checkbox" style={{ transform: "scale(1.3)", marginRight: 20 }} />
        <span style={profileLabelStyle}>Show profile publicly</span>
      </div>
      <div style={centeredRow}>
        <input type="checkbox" style={{ transform: "scale(1.3)", marginRight: 20 }} />
        <span style={profileLabelStyle}>Enable 2FA</span>
      </div>
      <button style={saveButtonStyle}>Save</button>
    </div>
  );
}

function LanguageScreen({ onBack }) {
  return (
    <div style={submenuStyle}>
      <div style={submenuHeaderStyle}>
        <button onClick={onBack} style={backBtnStyle}>←</button>
        <div style={submenuTitleStyle}>Language</div>
      </div>
      <div style={{
        color: "#fff",
        fontSize: "1.4rem",
        marginBottom: 20,
        textAlign: "left"
      }}>Choose your language:</div>
      <ul style={{
        listStyle: "none",
        padding: 0,
        color: "#FFC32B",
        fontSize: "1.2rem",
        textAlign: "left"
      }}>
        <li style={langItemStyle}><input type="radio" name="lang" /> English</li>
        <li style={langItemStyle}><input type="radio" name="lang" /> Español</li>
        <li style={langItemStyle}><input type="radio" name="lang" /> Français</li>
        <li style={langItemStyle}><input type="radio" name="lang" /> Deutsch</li>
        <li style={langItemStyle}><input type="radio" name="lang" /> 中文</li>
      </ul>
    </div>
  );
}

function WalletScreen({ onBack }) {
  return (
    <div style={submenuStyle}>
      <div style={submenuHeaderStyle}>
        <button onClick={onBack} style={backBtnStyle}>←</button>
        <div style={submenuTitleStyle}>Wallet & Tokens</div>
      </div>
      <div style={{
        color: "#fff",
        fontSize: "1.2rem",
        marginBottom: 18,
        textAlign: "left"
      }}>
        Wallet: <span style={{ color: "#FFC32B" }}>0x8b...1234</span>
      </div>
      <div style={{
        color: "#fff",
        fontSize: "1.2rem",
        marginBottom: 12,
        textAlign: "left"
      }}>
        Tokens: <span style={{ color: "#FFC32B" }}>USDT, ETH, DAI</span>
      </div>
    </div>
  );
}

function LogoutDialog({ onConfirm, onCancel }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.85)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#232323", borderRadius: 18, padding: 32, minWidth: 260, textAlign: "center"
      }}>
        <div style={{ color: "#FFC32B", fontSize: 26, marginBottom: 22 }}>Log Out</div>
        <div style={{ color: "#fff", fontSize: 18, marginBottom: 20 }}>Are you sure you want to disconnect your wallet?</div>
        <button onClick={onConfirm} style={{ ...saveButtonStyle, background: "#FFC32B", color: "#181511", marginRight: 14, fontSize: 18 }}>Yes</button>
        <button onClick={onCancel} style={{ ...saveButtonStyle, background: "#181511", color: "#FFC32B", border: "1.5px solid #FFC32B", fontSize: 18 }}>No</button>
      </div>
    </div>
  );
}