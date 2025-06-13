// Mainnet Base Name Service registry address (example, replace with latest official if needed)
export const BASE_BNS_REGISTRY = "0x4bc2e5d1414de7e0f59adf4b1b2f9f9c1c0c1c1c"; // <-- PON AQUÍ LA DIRECCIÓN OFICIAL DEL REGISTRO BNS
export const BASE_BNS_RESOLVER_ABI = [
  "function addr(bytes32 node) view returns (address)"
  // Añade métodos según la spec oficial del resolver de Basenames si necesitas más
];