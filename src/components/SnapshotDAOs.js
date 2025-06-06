import React, { useState } from "react";

// Aquí está el array famousDaos, ¡no lo quites ni lo pongas en otro archivo!
const famousDaos = [
  {
    id: "ensdao.eth",
    name: "ENS DAO",
    symbol: "ENS",
    about: "The Ethereum Name Service DAO",
    avatar: "https://cdn.stamp.fyi/avatar/ensdao.eth",
    followersCount: 90000,
    network: "Ethereum"
  },
  {
    id: "aave.eth",
    name: "Aave",
    symbol: "AAVE",
    about: "Decentralized liquidity protocol",
    avatar: "https://cdn.stamp.fyi/avatar/aave.eth",
    followersCount: 85000,
    network: "Ethereum"
  },
  {
    id: "uniswap.eth",
    name: "Uniswap",
    symbol: "UNI",
    about: "Uniswap Governance",
    avatar: "https://cdn.stamp.fyi/avatar/uniswap.eth",
    followersCount: 80000,
    network: "Ethereum"
  },
  {
    id: "balancer.eth",
    name: "Balancer",
    symbol: "BAL",
    about: "Balancer DAO Governance",
    avatar: "https://cdn.stamp.fyi/avatar/balancer.eth",
    followersCount: 55000,
    network: "Ethereum"
  },
  {
    id: "gitcoindao.eth",
    name: "Gitcoin DAO",
    symbol: "GTC",
    about: "Public goods funding DAO",
    avatar: "https://cdn.stamp.fyi/avatar/gitcoindao.eth",
    followersCount: 40000,
    network: "Ethereum"
  }
  // Puedes agregar más DAOs aquí
];

export default function SnapshotDAOs() {
  const [search, setSearch] = useState("");
  const [daos, setDaos] = useState(famousDaos);
  const [error, setError] = useState("");

  const handleSearch = e => {
    e.preventDefault();
    setError("");
    const q = search.trim().toLowerCase();
    if (!q) {
      setDaos(famousDaos);
      return;
    }
    const filtered = famousDaos.filter(dao =>
      dao.name.toLowerCase().includes(q) ||
      dao.symbol.toLowerCase().includes(q) ||
      dao.id.toLowerCase().includes(q)
    );
    setDaos(filtered);
    if (filtered.length === 0) setError("No DAOs found for this search.");
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
          onSubmit={handleSearch}
          style={{ display: "flex", alignItems: "center", width: "100%" }}
        >
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search DAO by name, id or symbol..."
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
          <button
            type="submit"
            style={{
              marginLeft: 18,
              padding: "10px 30px",
              borderRadius: 12,
              border: "none",
              background: "#FFC32B",
              color: "#181511",
              fontWeight: 700,
              fontSize: 18,
              fontFamily: "'Piedra', cursive",
              cursor: "pointer"
            }}
          >
            Search
          </button>
        </form>
      </div>
      {error && (
        <div style={{ color: "red", fontSize: 18 }}>{error}</div>
      )}
      <ul style={{ padding: 0, margin: 0, listStyle: "none", width: "100%" }}>
        {daos.map((dao) => (
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
                  <a
                    href={`https://snapshot.org/#/${dao.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#181511",
                      background: "#FFC32B",
                      padding: "6px 16px",
                      borderRadius: 10,
                      fontWeight: 700,
                      textDecoration: "none",
                      fontSize: 15
                    }}
                  >
                    View proposals
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}