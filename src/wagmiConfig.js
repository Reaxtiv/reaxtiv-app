// filepath: src/wagmiConfig.js
import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(), // usa el RPC público de Base
  },
})