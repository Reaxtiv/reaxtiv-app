import { ethers } from "ethers";

// Envía ETH a una dirección usando la wallet conectada
export async function sendETH(to, amountEth) {
  if (!window.ethereum) throw new Error("No wallet found");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const tx = await signer.sendTransaction({
    to,
    value: ethers.parseEther(amountEth)
  });
  return tx.hash;
}