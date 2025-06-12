import React, { useEffect, useState } from "react";
import { sendETH } from "../utils/sendETH";
import { getBalance } from "../utils/getBalance";

// Placeholder para balances ERC20 (DAI, USDT)
const placeholderERC20Balance = async () => "0.00";

function shortAddress(addr) {
  if (!addr) return "";
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

// Función para obtener la URL del explorer según la red
function getExplorerUrl(chainId, txHash) {
  if (chainId === 1) return `https://etherscan.io/tx/${txHash}`;
  if (chainId === 5) return `https://goerli.etherscan.io/tx/${txHash}`;
  if (chainId === 8453) return `https://basescan.org/tx/${txHash}`;
  if (chainId === 84532) return `https://goerli.basescan.org/tx/${txHash}`;
  if (chainId === 11155111) return `https://sepolia.etherscan.io/tx/${txHash}`;
  // Puedes agregar más redes aquí
  return `https://etherscan.io/tx/${txHash}`;
}

export default function SendScreen({ wallet }) {
  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("");
  const [token, setToken] = useState("ETH");
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");
  const [balanceETH, setBalanceETH] = useState("");
  const [balanceDAI, setBalanceDAI] = useState("0.00");
  const [balanceUSDT, setBalanceUSDT] = useState("0.00");
  const [loading, setLoading] = useState(false);

  const tokenLogos = {
    USDT: "/usdt.png",
    ETH: "/eth.png",
    DAI: "/dai.png"
  };

  // Obtener chainId de la wallet y asegurarse que es número
  const chainId = Number(wallet?.provider?.network?.chainId || wallet?.chainId || 1);

  useEffect(() => {
    if (!wallet) {
      setBalanceETH("");
      setBalanceDAI("0.00");
      setBalanceUSDT("0.00");
      return;
    }
    setLoading(true);
    getBalance(wallet)
      .then(setBalanceETH)
      .catch(() => setBalanceETH("Error"));
    placeholderERC20Balance().then(setBalanceDAI);
    placeholderERC20Balance().then(setBalanceUSDT);
    setLoading(false);
  }, [wallet, txHash]);

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus("");
    setTxHash("");
    if (!to || !amount) {
      setStatus("Enter destination address and amount.");
      return;
    }
    if (token !== "ETH") {
      setStatus("Only ETH sending is implemented yet.");
      return;
    }
    setLoading(true);
    try {
      const hash = await sendETH(to, amount);
      setStatus("Transaction sent!");
      setTxHash(hash);
      setTo("");
      setAmount("");
    } catch (err) {
      setStatus("Error: " + (err.message || "Unknown error"));
    }
    setLoading(false);
  };

  // --- UI ---
  return (
    <div
      style={{
        minHeight: "calc(100vh - 110px)",
        background: "#000000",
        color: "#FFC32B",
        fontFamily: "'Piedra', cursive",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 36,
        position: "relative",
        width: "100vw",
        boxSizing: "border-box",
        paddingLeft: 36,
        paddingTop: 0
      }}
    >
      {/* Header Marca + Wallet en columna, más abajo y sin icono */}
      <div style={{
        position: "absolute",
        left: 36,
        top: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        zIndex: 10
      }}>
        <div style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          fontSize: 36,
          letterSpacing: "0.04em",
          color: "#FFC32B",
          lineHeight: 1.05,
          marginBottom: 0,
          textShadow: "none"
        }}>
          RΞAXTIV
        </div>
        <div style={{
          fontFamily: "'Piedra', cursive",
          fontSize: 32,
          color: "#FFC32B",
          marginLeft: 2,
          marginTop: 14,
          fontWeight: 700,
          letterSpacing: "0.03em",
        }}>
          Wallet
        </div>
      </div>

      {/* Espaciador para header, baja ambos recuadros */}
      <div style={{ width: 1, minWidth: 1, marginRight: 0, height: 1 }} />

      {/* Recuadro billetera conectada y saldos */}
      <div style={{
        width: 440,
        background: "#232323",
        borderRadius: 28,
        boxShadow: "0 0 24px #18151177",
        padding: "42px 30px 38px 30px",
        marginBottom: 24,
        marginTop: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
      }}>
        <div style={{ fontSize: 19, color: "#FFC32B", fontWeight: 700, marginBottom: 12 }}>
          Connected Wallet
        </div>
        <div style={{
          fontFamily: "monospace",
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 20,
          wordBreak: "break-all"
        }}>
          {wallet ? shortAddress(wallet) : "Not connected"}
        </div>
        <div style={{ width: "100%" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 10
          }}>
            <img src={tokenLogos.ETH} alt="ETH" style={{ width: 28, height: 28, borderRadius: 8 }} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>ETH:</span>
            <span style={{ color: "#FFC32B", fontWeight: 700, fontSize: 18 }}>
              {loading ? "Loading..." : (balanceETH !== "" ? `${balanceETH} ETH` : "-")}
            </span>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 10
          }}>
            <img src={tokenLogos.DAI} alt="DAI" style={{ width: 28, height: 28, borderRadius: 8 }} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>DAI:</span>
            <span style={{ color: "#FFC32B", fontWeight: 700, fontSize: 18 }}>
              {balanceDAI} DAI
            </span>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 10
          }}>
            <img src={tokenLogos.USDT} alt="USDT" style={{ width: 28, height: 28, borderRadius: 8 }} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>USDT:</span>
            <span style={{ color: "#FFC32B", fontWeight: 700, fontSize: 18 }}>
              {balanceUSDT} USDT
            </span>
          </div>
        </div>
      </div>
      {/* Recuadro de envío */}
      <div style={{
        width: 440,
        background: "#232323",
        borderRadius: 28,
        boxShadow: "0 0 24px #18151177",
        padding: "32px 20px 28px 20px",
        marginBottom: 24,
        marginTop: 200,
      }}>
        <form onSubmit={handleSend}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
            <img src={tokenLogos[token]} alt={token} style={{ width: 48, height: 48, marginRight: 16, borderRadius: 12 }} />
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
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
              <option value="DAI">DAI</option>
            </select>
          </div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ color: "#fff", fontSize: 18, marginBottom: 4, textAlign: "left" }}>To (address or ENS)</div>
            <input
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="0x... or name.eth"
              style={{
                width: 420,
                background: "#181511",
                color: "#FFC32B",
                border: "none",
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: 18,
                fontFamily: "'Piedra', cursive",
                marginBottom: 4
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ color: "#fff", fontSize: 18, marginBottom: 4, textAlign: "left" }}>Amount</div>
            <input
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Amount"
              style={{
                width: 220,
                background: "#181511",
                color: "#FFC32B",
                border: "none",
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: 18,
                fontFamily: "'Piedra', cursive"
              }}
              type="number"
              min={0}
              step="any"
              inputMode="decimal"
            />
          </div>
          <button
            type="submit"
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
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: 16,
              boxShadow: "0 0 16px #FFD700"
            }}
            disabled={loading}
          >
            Send {amount || ""} {token}
          </button>
        </form>
        {status && <div style={{ marginTop: 14, color: status.startsWith("Error") ? "red" : "#16ff72" }}>{status}</div>}
        {txHash && (
          <div style={{ marginTop: 8 }}>
            <a
              href={getExplorerUrl(chainId, txHash)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#FFC32B" }}
            >
              View on Explorer
            </a>
          </div>
        )}
      </div>
    </div>
  );
}