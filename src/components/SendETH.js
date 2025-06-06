import React, { useEffect, useState } from "react";
import { sendETH } from "../utils/sendETH";
import { getBalance } from "../utils/getBalance";

/**
 * Formatea una dirección Ethereum a formato corto: 0x1234...abcd
 */
function shortAddress(addr) {
  if (!addr) return "";
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

export default function SendETH({ wallet }) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);

  // Refresca el balance cuando cambia la wallet o al enviar
  useEffect(() => {
    if (!wallet) {
      setBalance("");
      return;
    }
    setLoading(true);
    getBalance(wallet)
      .then(setBalance)
      .catch(() => setBalance("Error"))
      .finally(() => setLoading(false));
  }, [wallet, txHash]);

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus("");
    setTxHash("");
    if (!to || !amount) {
      setStatus("Enter destination address and amount.");
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

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 28,
      width: "100%",
      maxWidth: 420,
      margin: "0 auto"
    }}>
      {/* Recuadro de dirección conectada y saldo */}
      <div style={{
        width: "100%",
        background: "#181511",
        borderRadius: 14,
        padding: "18px 20px",
        boxShadow: "0 1px 6px #00000033",
        marginBottom: 10
      }}>
        <div style={{ fontSize: 14, color: "#FFC32B", marginBottom: 4 }}>
          Connected Wallet
        </div>
        <div style={{
          fontFamily: "monospace",
          color: "#fff",
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 8
        }}>
          {wallet ? shortAddress(wallet) : "Not connected"}
        </div>
        <div style={{ fontSize: 15, color: "#FFD700" }}>
          Balance:{" "}
          <span style={{ color: "#fff", fontWeight: 700 }}>
            {loading
              ? "Loading..."
              : (balance !== "" ? `${balance} ETH` : "-")
            }
          </span>
        </div>
      </div>

      {/* Formulario de envío */}
      <div style={{
        width: "100%",
        background: "#232323",
        borderRadius: 16,
        padding: "24px 20px",
        color: "#FFC32B"
      }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>Send ETH (Sepolia)</h2>
        <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="text"
            placeholder="Recipient Address"
            value={to}
            onChange={e => setTo(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: "none", fontSize: 15 }}
            disabled={loading}
            autoComplete="off"
          />
          <input
            type="number"
            step="0.0001"
            placeholder="Amount (ETH)"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: "none", fontSize: 15 }}
            disabled={loading}
          />
          <button
            type="submit"
            style={{
              background: "#FFC32B",
              color: "#181511",
              fontWeight: 700,
              fontSize: 17,
              border: "none",
              borderRadius: 14,
              padding: "8px 0",
              cursor: loading ? "not-allowed" : "pointer"
            }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
        {status && <div style={{ marginTop: 14, color: status.startsWith("Error") ? "red" : "#16ff72" }}>{status}</div>}
        {txHash && (
          <div style={{ marginTop: 8 }}>
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#FFC32B" }}
            >
              View on Etherscan
            </a>
          </div>
        )}
      </div>
    </div>
  );
}