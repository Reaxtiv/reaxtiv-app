import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";

export async function getXmtpClient() {
  // Solicita conexión a la wallet (MetaMask)
  if (!window.ethereum) throw new Error("MetaMask not found");
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  // Crea el cliente XMTP en mainnet (usa "dev" para pruebas)
  const xmtp = await Client.create(signer, { env: "production" });
  return xmtp;
}