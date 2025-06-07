import React, { useState, useEffect } from "react";

const SNAPSHOT_API = "/api/snapshot";

async function fetchDaos() {
  const res = await fetch(SNAPSHOT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          spaces(
            first: 15
            skip: 0
            orderBy: "followersCount"
            orderDirection: desc
            where: { followersCount_gt: 0 }
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
  });
  const json = await res.json();
  return json.data?.spaces || [];
}

async function fetchProposals(spaceId) {
  const res = await fetch(SNAPSHOT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
      variables: { space: spaceId }
    })
  });
  const json = await res.json();
  return json.data?.proposals || [];
}

export default function SnapshotDAOs() {
  const [daos, setDaos] = useState([]);
  const [error, setError] = useState("");
  const [loadingDaos, setLoadingDaos] = useState(true);
  const [proposals, setProposals] = useState({});
  const [loadingProps, setLoadingProps] = useState({});

  useEffect(() => {
    setLoadingDaos(true);
    fetchDaos()
      .then(setDaos)
      .catch(() => setError("Error connecting to Snapshot"))
      .finally(() => setLoadingDaos(false));
  }, []);

  const handleShowProposals = async (dao) => {
    setLoadingProps(l => ({ ...l, [dao.id]: true }));
    try {
      const props = await fetchProposals(dao.id);
      setProposals(p => ({ ...p, [dao.id]: props }));
    } catch {
      setProposals(p => ({ ...p, [dao.id]: [] }));
    }
    setLoadingProps(l => ({ ...l, [dao.id]: false }));
  };

  return (
    <div style={{ padding: 32, color: "#FFC32B", background: "#181818", minHeight: "100vh" }}>
      <h1>Top DAOs on Snapshot</h1>
      {loadingDaos && <p>Loading DAOs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {daos.map((dao) => (
          <li key={dao.id} style={{ background: "#232323", borderRadius: 12, margin: "18px 0", padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {dao.avatar && (
                <img src={dao.avatar.replace("ipfs://", "https://ipfs.io/ipfs/")} alt={dao.name} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 16 }} />
              )}
              <div>
                <strong>{dao.name}</strong> <span style={{ fontSize: 14, color: "#FFD700" }}>({dao.symbol})</span>
                <div style={{ fontSize: 13, color: "#FFD700" }}>
                  Followers: {dao.followersCount} | Network: {dao.network}
                </div>
                <div style={{ color: "#fff", fontSize: 14 }}>{dao.about}</div>
              </div>
            </div>
            <button
              onClick={() => handleShowProposals(dao)}
              style={{
                marginTop: 10,
                background: "#FFC32B",
                color: "#181511",
                border: "none",
                borderRadius: 10,
                padding: "6px 16px",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              {loadingProps[dao.id] ? "Loading..." : "View proposals"}
            </button>
            {/* Proposals */}
            {proposals[dao.id] && (
              <div style={{ marginTop: 16 }}>
                <strong style={{ color: "#FFD700" }}>Proposals:</strong>
                <ul>
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