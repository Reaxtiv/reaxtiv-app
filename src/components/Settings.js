import React from "react";

export default function Settings({ wallet, onLogout }) {
  return (
    <div className="screen-content">
      <h2 className="section-title">Settings</h2>
      <div className="settings-list">
        <div className="settings-item">
          <span>Profile</span>
          <button className="settings-edit-btn" disabled>Edit</button>
        </div>
        <div className="settings-item">
          <span>Notifications</span>
          <span className="settings-value">On</span>
        </div>
        <div className="settings-item">
          <span>Privacy & Security</span>
          <span className="settings-arrow">{">"}</span>
        </div>
        <div className="settings-item">
          <span>Language</span>
          <span className="settings-value">EN</span>
        </div>
        <div className="settings-item">
          <span>Wallet & Tokens</span>
        </div>
        <div className="settings-item" onClick={onLogout} style={{ cursor: "pointer", color: "#ffba08" }}>
          <span>Log Out</span>
        </div>
        {wallet && (
          <div className="settings-wallet">
            Connected wallet: <span className="wallet-address">{wallet}</span>
          </div>
        )}
      </div>
    </div>
  );
}