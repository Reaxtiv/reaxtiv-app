import React, { useState } from "react";

export default function SendScreen() {
  const [amount, setAmount] = useState("120");
  const [to, setTo] = useState("0x8b...1234");
  const [token, setToken] = useState("USDT");

  // Puedes agregar más logos locales si añades ETH, DAI, etc.
  const tokenLogos = {
    USDT: "/usdt.png",
    ETH: "/eth.png",
    DAI: "/dai.png"
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 110px)",
        background: "#000000",
        color: "#FFC32B",
        fontFamily: "'Piedra', cursive",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 36
      }}
    >
      <div
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          fontSize: 38,
          letterSpacing: "0.04em",
          color: "#FFC32B",
          marginBottom: 10
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
        }}
      >
        Send Tokens
      </div>
      <div style={{
        width: 340,
        background: "#232323",
        borderRadius: 28,
        boxShadow: "0 0 24px #18151177",
        padding: "32px 28px 28px 28px",
        marginBottom: 24
      }}>
        <div style={{display: "flex", alignItems: "center", marginBottom: 18}}>
          <img src={tokenLogos[token]} alt={token} style={{width: 48, height: 48, marginRight: 16, borderRadius: 12}} />
          <select
            value={token}
            onChange={e => setToken(e.target.value)}
            style={{
              background: "#181511",
              color: "#FFC32B",
              border: "none",
              borderRadius: 10,
              fontSize: 22,
              fontFamily: "'Piedra', cursive",
              padding: "8px 16px",
              marginLeft: 5,
              marginRight: 5
            }}
          >
            <option value="USDT">USDT</option>
            <option value="ETH">ETH</option>
            <option value="DAI">DAI</option>
          </select>
        </div>
        <div style={{marginBottom: 18}}>
          <div style={{color: "#fff", fontSize: 18, marginBottom: 4}}>To (address or ENS)</div>
          <input
            value={to}
            onChange={e => setTo(e.target.value)}
            placeholder="0x... or name.eth"
            style={{
              width: "100%",
              background: "#181511",
              color: "#FFC32B",
              border: "none",
              borderRadius: 12,
              padding: "13px 17px",
              fontSize: 20,
              fontFamily: "'Piedra', cursive",
              marginBottom: 4
            }}
          />
        </div>
        <div style={{marginBottom: 18}}>
          <div style={{color: "#fff", fontSize: 18, marginBottom: 4}}>Amount</div>
          <input
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Amount"
            style={{
              width: "100%",
              background: "#181511",
              color: "#FFC32B",
              border: "none",
              borderRadius: 12,
              padding: "13px 17px",
              fontSize: 20,
              fontFamily: "'Piedra', cursive"
            }}
            type="number"
            min={0}
          />
        </div>
        <button
          style={{
            width: "100%",
            background: "#FFC32B",
            color: "#181511",
            fontWeight: 700,
            fontSize: 22,
            border: "none",
            borderRadius: 20,
            padding: "18px",
            fontFamily: "'Piedra', cursive",
            cursor: "pointer",
            marginTop: 16,
            boxShadow: "0 0 16px #FFD700"
          }}
        >
          Send {amount} {token}
        </button>
      </div>
    </div>
  );
}