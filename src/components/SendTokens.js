import React from "react";

export default function SendTokens() {
  return (
    <div className="screen-content">
      <h2 className="section-title">Send tokens</h2>
      <div className="send-tokens-graphic">
        <div className="wallet-box">You</div>
        <div className="send-tokens-arrows">
          <span style={{ fontSize: 32, color: "#ffba08" }}>⇄</span>
        </div>
        <div className="wallet-box">0xA1...91</div>
      </div>
      <div className="send-token-form">
        <div className="token-select">
          <span className="token-name">USDT</span>
          <span className="token-icon" role="img" aria-label="Tether">
            <img src="https://cryptologos.cc/logos/tether-usdt-logo.png" alt="USDT" height={24} style={{ verticalAlign: "middle" }} />
          </span>
        </div>
        <input
          className="input-address"
          type="text"
          placeholder="To (address or ENS)"
          value="0xA1a3...eF91"
          readOnly
        />
        <div className="amount-row">
          <input
            className="input-amount"
            type="number"
            placeholder="Amount"
            value="120"
            readOnly
          />
          <span className="token-unit">USDT</span>
          <span className="token-icon" role="img" aria-label="Tether">
            <img src="https://cryptologos.cc/logos/tether-usdt-logo.png" alt="USDT" height={24} style={{ verticalAlign: "middle" }} />
          </span>
        </div>
      </div>
    </div>
  );
}