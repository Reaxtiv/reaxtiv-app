import React, { useState } from "react";

// Static list of top 25 DAOs
const POPULAR_DAOS = [
  {
    id: "uniswap.eth",
    name: "Uniswap",
    about: "UNI token holders govern the Uniswap Protocol.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png",
    symbol: "UNI",
    followersCount: 80000,
    network: "1"
  },
  {
    id: "aave.eth",
    name: "Aave",
    about: "Decentralized non-custodial liquidity protocol.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png",
    symbol: "AAVE",
    followersCount: 55000,
    network: "1"
  },
  {
    id: "ens.eth",
    name: "ENS DAO",
    about: "Ethereum Name Service governance.",
    avatar: "https://raw.githubusercontent.com/ensdomains/ens-avatar-service/main/public/ens.png",
    symbol: "ENS",
    followersCount: 46000,
    network: "1"
  },
  {
    id: "balancer.eth",
    name: "Balancer",
    about: "Balancer protocol governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png",
    symbol: "BAL",
    followersCount: 25000,
    network: "1"
  },
  {
    id: "gitcoindao.eth",
    name: "Gitcoin DAO",
    about: "A community of builders funding digital public goods.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xDECAF9CD2367cdbb726E904cD6397eDFcAe6068D/logo.png",
    symbol: "GTC",
    followersCount: 21000,
    network: "1"
  },
  {
    id: "mkrgov.eth",
    name: "MakerDAO",
    about: "The Maker Protocol governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png",
    symbol: "MKR",
    followersCount: 31000,
    network: "1"
  },
  {
    id: "curve.eth",
    name: "Curve DAO",
    about: "Curve protocol governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD533a949740bb3306d119CC777fa900bA034cd52/logo.png",
    symbol: "CRV",
    followersCount: 27000,
    network: "1"
  },
  {
    id: "arbitrumfoundation.eth",
    name: "Arbitrum DAO",
    about: "Arbitrum One governance.",
    avatar: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
    symbol: "ARB",
    followersCount: 59000,
    network: "42161"
  },
  {
    id: "opcollective.eth",
    name: "Optimism Collective",
    about: "Optimism governance.",
    avatar: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
    symbol: "OP",
    followersCount: 43000,
    network: "10"
  },
  {
    id: "safe.eth",
    name: "Safe DAO",
    about: "Safe (previously Gnosis Safe) governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xd9cEeeD6e6b4B2e5C7569a7e65e65A2d8B7C689a/logo.png",
    symbol: "SAFE",
    followersCount: 9000,
    network: "1"
  },
  {
    id: "yam.eth",
    name: "Yam Finance",
    about: "Yam Finance governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0AaCfbeC6a24756c20D41914F2caba817C0d8521/logo.png",
    symbol: "YAM",
    followersCount: 8000,
    network: "1"
  },
  {
    id: "yearn.eth",
    name: "Yearn Finance",
    about: "Yearn protocol governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png",
    symbol: "YFI",
    followersCount: 15000,
    network: "1"
  },
  {
    id: "compound-finance.eth",
    name: "Compound",
    about: "Compound protocol governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png",
    symbol: "COMP",
    followersCount: 12000,
    network: "1"
  },
  {
    id: "index-coop.eth",
    name: "Index Coop",
    about: "Index Coop governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0954906da0Bf32d5479e25f46056d22f08464cab/logo.png",
    symbol: "INDEX",
    followersCount: 9000,
    network: "1"
  },
  {
    id: "sushigov.eth",
    name: "Sushi DAO",
    about: "Sushi protocol governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B3595068778DD592e39A122f4f5a5Cf09C90fE2/logo.png",
    symbol: "SUSHI",
    followersCount: 18000,
    network: "1"
  },
  {
    id: "tornado-governance.eth",
    name: "Tornado Cash",
    about: "Tornado Cash protocol governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x77777feddddffc19ff86db637967013e6c6a116c/logo.png",
    symbol: "TORN",
    followersCount: 8000,
    network: "1"
  },
  {
    id: "pooltogether.eth",
    name: "PoolTogether",
    about: "PoolTogether protocol governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0cec1a9154ff802e7934fc916ed7ca50bde6844e/logo.png",
    symbol: "POOL",
    followersCount: 11000,
    network: "1"
  },
  {
    id: "banklessvault.eth",
    name: "Bankless DAO",
    about: "A decentralized community for bankless money systems.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2d94AA3e47d9D5024503Ca8491fcE9A2fB4DA198/logo.png",
    symbol: "BANK",
    followersCount: 13000,
    network: "1"
  },
  {
    id: "piedao.eth",
    name: "PieDAO",
    about: "PieDAO protocol governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xFeeAa4A2D0B068Ce4788e9a6b0e2eC5B2b1B3C0a/logo.png",
    symbol: "PIE",
    followersCount: 7000,
    network: "1"
  },
  {
    id: "badgerdao.eth",
    name: "Badger DAO",
    about: "Badger DAO protocol governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x3472A5A71965499acd81997a54BBA8D852C6E53d/logo.png",
    symbol: "BADGER",
    followersCount: 9000,
    network: "1"
  },
  {
    id: "gnosisdao.eth",
    name: "GnosisDAO",
    about: "GnosisDAO stewards the development of Gnosis products.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6810e776880c02933d47db1b9fc05908e5386b96/logo.png",
    symbol: "GNO",
    followersCount: 9000,
    network: "1"
  },
  {
    id: "metagov.eth",
    name: "MetaCartel",
    about: "Grants DAO funding Ethereum ecosystem projects.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB4a77938a399a27F0bB6C90a3D97b0a88bE4e9f4/logo.png",
    symbol: "META",
    followersCount: 7200,
    network: "1"
  },
  {
    id: "stakedao.eth",
    name: "Stake DAO",
    about: "Stake DAO protocol governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0F2D719407FdBeFF09D87557AbB7232601FD9F29/logo.png",
    symbol: "SDT",
    followersCount: 6800,
    network: "1"
  },
  {
    id: "rarible.eth",
    name: "Rarible DAO",
    about: "Rarible protocol governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xfca59cd816ab1ead66534d82bc21e7515ce441cf/logo.png",
    symbol: "RARI",
    followersCount: 8200,
    network: "1"
  },
  {
    id: "defidollar.eth",
    name: "DeFi Dollar DAO",
    about: "DeFi Dollar protocol governance.",
    avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x3a880652f47bfaa771908c07dd8673a787daed3a/logo.png",
    symbol: "DUSD",
    followersCount: 6000,
    network: "1"
  }
];

const SNAPSHOT_API = "https://hub.snapshot.org/graphql";

async function fetchProposals(space) {
  const res = await fetch(SNAPSHOT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({
      query: `
        query Proposals($space: String!) {
          proposals(
            first: 5,
            skip: 0,
            where: { space_in: [$space] },
            orderBy: "created",
            orderDirection: desc
          ) {
            id
            title
            body
            start
            end
            state
            created
          }
        }
      `,
      variables: { space }
    })
  });
  const json = await res.json();
  if (json.errors) {
    console.error("Snapshot error:", json.errors);
    return [];
  }
  return json?.data?.proposals || [];
}

export default function SnapshotDAOs() {
  const [search, setSearch] = useState("");
  const [filteredDaos, setFilteredDaos] = useState(POPULAR_DAOS);
  const [proposals, setProposals] = useState({});
  const [loadingProps, setLoadingProps] = useState({});

  // Filter by name (case-insensitive, substring)
  const handleSearch = (e) => {
    const q = e.target.value;
    setSearch(q);
    if (!q.trim()) {
      setFilteredDaos(POPULAR_DAOS);
      return;
    }
    setFilteredDaos(
      POPULAR_DAOS.filter(
        d => d.name.toLowerCase().includes(q.trim().toLowerCase())
      )
    );
  };

  const handleShowProposals = async (dao) => {
    setLoadingProps(l => ({ ...l, [dao.id]: true }));
    try {
      const props = await fetchProposals(dao.id);
      setProposals(p => ({ ...p, [dao.id]: props }));
    } catch (e) {
      setProposals(p => ({ ...p, [dao.id]: [] }));
    }
    setLoadingProps(l => ({ ...l, [dao.id]: false }));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000000",
      color: "#FFC32B",
      fontFamily: "'Piedra', cursive",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: "36px 0 0 36px",
      boxSizing: "border-box"
    }}>
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: 700,
        fontSize: 36,
        letterSpacing: "0.04em",
        color: "#FFC32B",
        marginBottom: 22,
      }}>
        RΞAXTIV
      </div>
      <div style={{ fontSize: 32, marginBottom: 14 }}>DAOs</div>
      <div style={{
        background: "#232323",
        borderRadius: 18,
        padding: "22px 28px",
        marginBottom: 34,
        width: 420,
        boxShadow: "0 2px 8px #000a"
      }}>
        <form
          onSubmit={e => e.preventDefault()}
          style={{ display: "flex", alignItems: "center", width: "100%" }}
        >
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search DAO by name..."
            style={{
              width: 240,
              padding: "10px 16px",
              borderRadius: 12,
              border: "1.5px solid #FFC32B",
              fontSize: 18,
              background: "#181818",
              color: "#FFC32B",
              fontFamily: "'Piedra', cursive"
            }}
          />
        </form>
      </div>
      {filteredDaos.length === 0 && (
        <div style={{ color: "red", fontSize: 18, marginBottom: 14 }}>
          No DAOs found.
        </div>
      )}
      <ul style={{ padding: 0, margin: 0, listStyle: "none", width: "100%" }}>
        {filteredDaos.map((dao) => (
          <li key={dao.id} style={{
            marginBottom: 18,
            background: "#232323",
            padding: "16px 24px",
            borderRadius: 16,
            color: "#FFC32B",
            width: "90%",
            maxWidth: 440,
            boxShadow: "0 1px 4px #00000033",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 4
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <a
                href={`https://snapshot.org/#/${dao.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center" }}
                title="Open on Snapshot"
              >
                {dao.avatar && (
                  <img src={dao.avatar} alt={dao.name} style={{
                    width: 48, height: 48, borderRadius: 24, background: "#fff", marginRight: 10
                  }} onError={e => { e.target.style.display = 'none'; }} />
                )}
              </a>
              <div>
                <a
                  href={`https://snapshot.org/#/${dao.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#FFC32B", fontWeight: 700, fontSize: 22, textDecoration: "underline" }}
                  title="Open on Snapshot"
                >
                  {dao.name}
                </a>
                <span style={{ fontSize: 16, color: "#FFD700" }}> ({dao.symbol})</span>
                <div style={{ color: "#fff", fontSize: 15 }}>
                  {dao.about}
                </div>
                <div style={{ fontSize: 13, color: "#FFD700" }}>
                  Followers: {dao.followersCount} | Network: {dao.network}
                </div>
                <div style={{ marginTop: 6 }}>
                  <button
                    onClick={() => handleShowProposals(dao)}
                    style={{
                      color: "#181511",
                      background: "#FFC32B",
                      padding: "6px 16px",
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 15,
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    {loadingProps[dao.id] ? "Loading..." : "View proposals"}
                  </button>
                </div>
              </div>
            </div>
            {/* Proposals */}
            {proposals[dao.id] && (
              <div style={{ marginTop: 16, width: "100%" }}>
                <div style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#FFD700",
                  marginBottom: 4
                }}>
                  Proposals:
                </div>
                <ul style={{ paddingLeft: 18 }}>
                  {proposals[dao.id].length === 0 && (
                    <li style={{ color: "#fff", fontWeight: 400, fontFamily: "inherit", letterSpacing: 0 }}>
                      No recent proposals.
                    </li>
                  )}
                  {proposals[dao.id].map((p) => (
                    <li key={p.id} style={{ color: "#fff", marginBottom: 8 }}>
                      <a
                        href={`https://snapshot.org/#/${dao.id}/proposal/${p.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontWeight: 400,
                          fontSize: 16,
                          color: "#FFC32B",
                          textDecoration: "underline",
                          fontFamily: "inherit",
                          letterSpacing: 0.1,
                          lineHeight: 1.3,
                          display: "inline-block"
                        }}
                        title="Go to voting page"
                      >
                        {p.title}
                      </a>
                      <span style={{ fontSize: 13, color: "#FFC32B", marginLeft: 6 }}>
                        [{p.state}]
                      </span>
                      <div style={{
                        fontSize: 13,
                        color: "#FFD700",
                        fontWeight: 400,
                        fontFamily: "inherit",
                        letterSpacing: 0,
                        lineHeight: 1.2
                      }}>
                        Start: {new Date(p.start * 1000).toLocaleString()} | End: {new Date(p.end * 1000).toLocaleString()}
                      </div>
                      <div style={{
                        color: "#BBB",
                        fontSize: 13,
                        maxWidth: 350,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        fontWeight: 400,
                        fontFamily: "inherit",
                        letterSpacing: 0
                      }}>
                        {p.body}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}