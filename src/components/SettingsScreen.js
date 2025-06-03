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
        position: "relative"
      }}
    >
      <div
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          fontSize: 38,
          letterSpacing: "0.04em",
          color: "#FFC32B",
          marginBottom: 0,
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
          marginBottom: 36,
          paddingLeft: 26,
        }}
      >
        Settings
      </div>
      <div style={{ width: "92%", margin: "0 auto" }}>
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

const settingRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#232323",
  borderRadius: 20,
  padding: "18px 22px",
  marginBottom: 18,
  fontFamily: "'Piedra', cursive",
  fontSize: 21,
  fontWeight: 700,
  cursor: "pointer"
};

const activeLabelStyle = {
  color: "#FFC32B",
  fontWeight: 700,
};

const inactiveLabelStyle = {
  color: "#fff",
  fontWeight: 400,
};


// --- Pantallas secundarias ---

function ProfileScreen({ onBack }) {
  return (
    <SectionShell title="Profile" onBack={onBack}>
      <div style={profileFieldStyle}>
        <span style={profileLabelStyle}>Name:</span>
        <input style={inputStyle} placeholder="Your Name" />
      </div>
      <div style={profileFieldStyle}>
        <span style={profileLabelStyle}>Avatar:</span>
        <span style={{fontSize: "2.1rem", color: "#fff", marginLeft: 16}}>Not available on web</span>
      </div>
      <div style={{...profileFieldStyle, flexDirection: "column", alignItems: "center"}}>
        <span style={profileLabelStyle}>Bio:</span>
        <textarea style={{ ...inputStyle, height: 60, fontSize: "2.1rem", width: "90%", marginTop: 12 }} placeholder="Short bio..." />
      </div>
      <button style={saveButtonStyle}>Save</button>
    </SectionShell>
  );
}

function NotificationsScreen({ onBack }) {
  return (
    <SectionShell title="Notifications" onBack={onBack}>
      <div style={centeredRow}>
        <span style={profileLabelStyle}>Push Notifications:</span>
        <input type="checkbox" style={{ transform: "scale(2)", marginLeft: 20 }} />
      </div>
      <div style={centeredRow}>
        <span style={profileLabelStyle}>Email Alerts:</span>
        <input type="checkbox" style={{ transform: "scale(2)", marginLeft: 20 }} />
      </div>
      <button style={saveButtonStyle}>Save</button>
    </SectionShell>
  );
}

function PrivacyScreen({ onBack }) {
  return (
    <SectionShell title="Privacy & Security" onBack={onBack}>
      <div style={centeredRow}>
        <input type="checkbox" style={{ transform: "scale(2)", marginRight: 20 }} />
        <span style={profileLabelStyle}>Show profile publicly</span>
      </div>
      <div style={centeredRow}>
        <input type="checkbox" style={{ transform: "scale(2)", marginRight: 20 }} />
        <span style={profileLabelStyle}>Enable 2FA</span>
      </div>
      <button style={saveButtonStyle}>Save</button>
    </SectionShell>
  );
}

function LanguageScreen({ onBack }) {
  return (
    <SectionShell title="Language" onBack={onBack}>
      <div style={{
        color: "#fff",
        fontSize: "2.5rem",
        marginBottom: 24,
        textAlign: "center"
      }}>Choose your language:</div>
      <ul style={{
        listStyle: "none",
        padding: 0,
        color: "#FFC32B",
        fontSize: "2.2rem",
        textAlign: "center"
      }}>
        <li style={langItemStyle}><input type="radio" name="lang" /> English</li>
        <li style={langItemStyle}><input type="radio" name="lang" /> Español</li>
        <li style={langItemStyle}><input type="radio" name="lang" /> Français</li>
        <li style={langItemStyle}><input type="radio" name="lang" /> Deutsch</li>
        <li style={langItemStyle}><input type="radio" name="lang" /> 中文</li>
      </ul>
    </SectionShell>
  );
}

function WalletScreen({ onBack }) {
  return (
    <SectionShell title="Wallet & Tokens" onBack={onBack}>
      <div style={{
        color: "#fff",
        fontSize: "2.2rem",
        marginBottom: 26,
        textAlign: "center"
      }}>
        Wallet: <span style={{ color: "#FFC32B" }}>0x8b...1234</span>
      </div>
      <div style={{
        color: "#fff",
        fontSize: "2.2rem",
        marginBottom: 10,
        textAlign: "center"
      }}>
        Tokens: <span style={{ color: "#FFC32B" }}>USDT, ETH, DAI</span>
      </div>
    </SectionShell>
  );
}

function LogoutDialog({ onConfirm, onCancel }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.85)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#232323", borderRadius: 18, padding: 40, minWidth: 320, textAlign: "center"
      }}>
        <div style={{ color: "#FFC32B", fontSize: 34, marginBottom: 28 }}>Log Out</div>
        <div style={{ color: "#fff", fontSize: 26, marginBottom: 32 }}>Are you sure you want to disconnect your wallet?</div>
        <button onClick={onConfirm} style={{ ...saveButtonStyle, background: "#FFC32B", color: "#181511", marginRight: 18, fontSize: 22 }}>Yes</button>
        <button onClick={onCancel} style={{ ...saveButtonStyle, background: "#181511", color: "#FFC32B", border: "1.5px solid #FFC32B", fontSize: 22 }}>No</button>
      </div>
    </div>
  );
}

function SectionShell({ title, onBack, children }) {
  return (
    <div style={{
      minHeight: "calc(100vh - 110px)",
      background: "#000000",
      color: "#FFC32B",
      fontFamily: "'Piedra', cursive",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      position: "relative"
    }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 32, marginTop: 24, width: "100%", justifyContent: "center" }}>
        <button onClick={onBack} style={{
          background: "none",
          border: "none",
          color: "#FFC32B",
          fontSize: 40,
          cursor: "pointer",
          marginRight: 24
        }}>←</button>
        <div
          style={{
            fontFamily: "'Piedra', cursive",
            fontSize: 38,
            color: "#FFC32B",
            textAlign: "center"
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ width: "96%", maxWidth: 500, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

const profileLabelStyle = {
  color: "#FFC32B",
  fontWeight: 700,
  fontSize: "2.2rem",
  minWidth: 100,
  textAlign: "right",
  marginRight: 12
};

const profileFieldStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 36,
  fontSize: "2.3rem",
  width: "100%"
};

const inputStyle = {
  background: "#232323",
  color: "#FFC32B",
  border: "none",
  borderRadius: 12,
  padding: "16px 24px",
  fontSize: "2.2rem",
  fontFamily: "'Piedra', cursive",
  width: 220,
  marginLeft: 10
};

const saveButtonStyle = {
  background: "#FFC32B",
  color: "#181511",
  fontWeight: 700,
  fontSize: 22,
  border: "none",
  borderRadius: 20,
  padding: "18px 60px",
  fontFamily: "'Piedra', cursive",
  cursor: "pointer",
  marginTop: 18,
  marginBottom: 10,
  boxShadow: "0 0 10px #FFD700"
};

const centeredRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 40,
  fontSize: "2.2rem",
  width: "100%"
};

const langItemStyle = {
  marginBottom: 16,
  cursor: "pointer"
};