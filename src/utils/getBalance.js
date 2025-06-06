import { ethers } from "ethers";

// Obtiene el saldo en ETH de la dirección indicada
export async function getBalance(address) {
  if (!window.ethereum) throw new Error("No wallet found");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}