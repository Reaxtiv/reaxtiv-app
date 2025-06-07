import React, { useState, useEffect } from "react";

// Usa el endpoint de tu API route en Vercel
const SNAPSHOT_API = "/api/snapshot";

async function fetchDaos(search = "") {
  let filter = "";
  if (search) {
    filter = `where: { 
      OR: [
        { id_contains: "${search.toLowerCase()}" },
        { name_contains: "${search}" }
      ]
    }`;
  }
  return fetch(SNAPSHOT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify({
      query: `
        query {
          spaces(
            first: 20
            skip: 0
            orderBy: "followersCount"
            orderDirection: desc
            ${filter}
          ) {
            id
            name
            about
            avatar
            symbol
            followersCount
            network
          }
        }
      `
    })
  })
    .then(res => res.json())
    .then(res => (res?.data?.spaces || []).filter(d => d.followersCount && d.followersCount > 1000));
}

async function fetchProposals(space) {
  const res = await fetch(SNAPSHOT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
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
            choices
            scores
            created
          }
        }
      `,
      variables: { space }
    })
  });
  const json = await res.json();
  return json?.data?.proposals || [];
}

export default function SnapshotDAOs() {
  const [daos, setDaos] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loadingDaos, setLoadingDaos] = useState(true);

  const [proposals, setProposals] = useState({});
  const [loadingProps, setLoadingProps] = useState({});

  useEffect(() => {
    setLoadingDaos(true);
    setApiError("");
    fetchDaos()
      .then(spaces => {
        setDaos(spaces);
        setLoadingDaos(false);
        if (!spaces.length) setApiError("No DAOs found on Snapshot.");
      })
      .catch((e) => {
        setDaos([]);
        setApiError("Error connecting to the Snapshot API: " + e.message);
        setLoadingDaos(false);
      });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setApiError("");
    setLoadingDaos(true);

    const q = search.trim();
    if (!q) {
      fetchDaos().then(spaces => {
        setDaos(spaces);
        setLoadingDaos(false);
        if (!spaces.length) setApiError("No DAOs found on Snapshot.");
      });
      return;
    }

    const spaces = await fetchDaos(q);
    setDaos(spaces);
    setLoadingDaos(false);
    if (!spaces.length) setError("No DAOs found for this search.");
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
      {loadingDaos && (
        <div style={{ color: "#FFD700", fontSize: 18 }}>Loading DAOs...</div>
      )}
      {apiError && (
        <div style={{ color: "red", fontSize: 18 }}>{apiError}</div>
      )}
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
                  <img src={
                    dao.avatar.startsWith("ipfs://")
                      ? `https://ipfs.io/ipfs/${dao.avatar.replace("ipfs://", "")}`
                      : dao.avatar
                  } alt={dao.name} style={{
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
                <div style={{ fontSize: 17, fontWeight: 700, color: "#FFD700", marginBottom: 4 }}>
                  Proposals:
                </div>
                <ul style={{ paddingLeft: 18 }}>
                  {proposals[dao.id].length === 0 && (
                    <li style={{ color: "#fff" }}>No recent proposals.</li>
                  )}
                  {proposals[dao.id].map((p) => (
                    <li key={p.id} style={{ color: "#fff", marginBottom: 8 }}>
                      <span style={{ fontWeight: 700 }}>{p.title}</span>
                      <span style={{ fontSize: 13, color: "#FFC32B", marginLeft: 6 }}>
                        [{p.state}]
                      </span>
                      <div style={{ fontSize: 13, color: "#FFD700" }}>
                        Start: {new Date(p.start * 1000).toLocaleString()} | End: {new Date(p.end * 1000).toLocaleString()}
                      </div>
                      <div style={{ color: "#BBB", fontSize: 13, maxWidth: 350, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
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