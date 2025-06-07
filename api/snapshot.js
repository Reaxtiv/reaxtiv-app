export default async function handler(req, res) {
  if (req.method === "GET") {
    // Devuelve el listado fijo de DAOs de ejemplo
    return res.status(200).json([
      {
        "id": "kol4u.eth",
        "name": "IceCream AI",
        "about": "For the IceCream AI community",
        "network": "56",
        "members": [
          "0x4b8061942C274a88ec3C5571b62A1cDa4F33bf8E"
        ],
        "avatar": "ipfs://bafybeiacylkvwb2e4lnixxjhogrsq5mpgr3npctoawtpmzu72e57snw774"
      },
      {
        "id": "sparkfi.eth",
        "name": "SparkDAO",
        "about": "⚡️Powering DeFi with $2.6B+ in liquidity. Supply/borrow/earn with competitive rates, seamless access, and scalable liquidity. Spark: Onchain Capital Allocator.",
        "network": "1",
        "members": [],
        "avatar": "ipfs://bafkreifdtdcoo4tszgsbnjp4xzcpv2pvggfbghjlx7uu3u3ggtz5m4cqea"
      },
      {
        "id": "allocation-cbbtc-usdc-v2.altitudefi.eth",
        "name": "Altitude.fi cbBTC-USDC v2 vault",
        "about": "",
        "network": "1",
        "members": [],
        "avatar": ""
      },
      {
        "id": "allocation-wsteth-usdc-v2.altitudefi.eth",
        "name": "Altitude.fi wstETH-USDC v2 vault",
        "about": "",
        "network": "1",
        "members": [],
        "avatar": ""
      },
      {
        "id": "zack6.eth",
        "name": "ZackTest",
        "about": "",
        "network": "1",
        "members": [],
        "avatar": ""
      },
      {
        "id": "ilanklein.eth",
        "name": "NFT Bridges test DAO on Snapshot",
        "about": "This is where NFT Bridges DAO will make decisions.",
        "network": "1",
        "members": [
          "0x91F5F78d80F09F19F5EEbF9fcA84523E7EEa9107",
          "0x2520FcF18adb4073D59EfE06fEE107C5ff1A6d22"
        ],
        "avatar": ""
      },
      {
        "id": "avaxworkerants.eth",
        "name": "worker $ants",
        "about": "we don’t pump. we work.",
        "network": "43114",
        "members": [],
        "avatar": ""
      },
      {
        "id": "magicalchemy.eth",
        "name": "MA DAO sandbox",
        "about": "",
        "network": "137",
        "members": [],
        "avatar": ""
      },
      {
        "id": "sdynd.eth",
        "name": "sdYND",
        "about": "Meta-governance platform for the YND liquid locker",
        "network": "1",
        "members": [
          "0xb4542526afee2fda1d584213d1521272a398b42a",
          "0x16A9ce905ECCFaE689190Da2055832e010178a4f",
          "0x0657C6bEe67Bb96fae96733D083DAADE0cb5a179",
          "0x40938d09b4A2a40b6538F7a8F77fC1971F8cEF54"
        ],
        "avatar": "ipfs://bafkreie4sfdhehvbybr4jqcqogmtp35xqgpcfk42o4tsnk3et5inf6rpme"
      },
      {
        "id": "reddio.eth",
        "name": "Reddio DAO",
        "about": "The official snapshot space for the Reddio DAO",
        "network": "1",
        "members": [],
        "avatar": "ipfs://bafkreicp6rt72uzewa3va6pce3qu3hykgr6pyvrknsyd7katjbti6fz5nq"
      },
      {
        "id": "proofimpact.eth",
        "name": "Proof of Impact DAO",
        "about": "A decentralized ecosystem rewarding real-world impact using AI & Web3",
        "network": "8453",
        "members": [],
        "avatar": "ipfs://bafybeifhxzqi53exe67b3guhihirekaxsxq3mukcd2a6l5fwpnrbchzthq"
      },
      {
        "id": "frontiertower.eth",
        "name": "Frontier Tower",
        "about": "995 Market St, San Francisco, CA 94103",
        "network": "137",
        "members": [],
        "avatar": ""
      },
      {
        "id": "alloalliance.eth",
        "name": "Allo Alliance",
        "about": "",
        "network": "1",
        "members": [],
        "avatar": "ipfs://bafybeibwd4xfiv6fxm3oatppja5eqb4xiq3cyvuf5c3shzyzuwtn6y3jye"
      },
      {
        "id": "greenwill.eth",
        "name": "GreenWill",
        "about": "",
        "network": "42220",
        "members": [],
        "avatar": ""
      },
      {
        "id": "greenpill.eth",
        "name": "Greenpill",
        "about": "Turning Degens to Regens (one green pill at a time)\n",
        "network": "42220",
        "members": [],
        "avatar": "ipfs://bafybeig2oj2mtxowq4bvqz6t4vjpu26r6kcz6h3oqzn66bu6byv6mef5jq"
      }
    ]);
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}