import React, { useState } from "react";
import { ethers } from "ethers";

export default function WalletConnect({ onConnect }) {
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Pide a MetaMask acceso a las cuentas
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        // Crea el provider de ethers
        const provider = new ethers.BrowserProvider(window.ethereum);
        onConnect(account, provider); // Llama al callback con la cuenta y el provider
      } catch (err) {
        setError("Conexión rechazada o error al conectar.");
      }
    } else {
      setError("MetaMask no está instalado.");
    }
  };

  return (
    <div>
      <button className="connect-btn" onClick={connectWallet}>
        Conectar con MetaMask
      </button>
      {error && <div style={{ color: "#ff6b6b", marginTop: 8 }}>{error}</div>}
    </div>
  );
}