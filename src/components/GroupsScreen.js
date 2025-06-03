import React, { useState } from "react";

const GROUPS = [
  {
    id: "builders",
    name: "Crypto Builders",
    members: 12,
    last: "2m ago"
  },
  {
    id: "artists",
    name: "Web3 Artists",
    members: 87,
    last: "10m ago"
  },
  {
    id: "defi",
    name: "DeFi Talk",
    members: 250,
    last: "1h ago"
  },
  {
    id: "ai",
    name: "AI & Blockchain",
    members: 99,
    last: "3h ago"
  }
];

export default function GroupsScreen({ onOpenGroup }) {
  const [search, setSearch] = useState("");

  const filtered = GROUPS.filter(
    group =>
      group.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "calc(100vh - 110px)",
        background: "#000000",
        color: "#FFC32B",
        fontFamily: "'Piedra', cursive",
        padding: "0 0 32px 0",
      }}
    >
      <div
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          fontSize: 38,
          letterSpacing: "0.04em",
          color: "#FFC32B",
          marginBottom: 12,
          paddingLeft: 26,
          paddingTop: 34,
        }}
      >
        RΞAXTIV
      </div>
      <div
        style={{
          fontFamily: "'Piedra', cursive",
          fontSize: 32,
          color: "#FFC32B",
          marginBottom: 16,
          paddingLeft: 26,
        }}
      >
        Groups
      </div>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search groups or ENS"
        style={{
          width: "85%",
          margin: "0 auto 26px auto",
          display: "block",
          padding: "16px 22px",
          border: "none",
          borderRadius: 24,
          background: "#232323",
          color: "#fff",
          fontSize: 20,
          fontFamily: "'Piedra', cursive",
          outline: "none"
        }}
      />
      <div style={{ width: "92%", margin: "0 auto" }}>
        {filtered.map(group => (
          <div
            key={group.id}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#232323",
              borderRadius: 20,
              padding: "16px 18px",
              marginBottom: 18,
              boxShadow: "none",
              cursor: "pointer"
            }}
            onClick={() => onOpenGroup(group)}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: "#FFC32B",
                borderRadius: "50%",
                marginRight: 18,
                flexShrink: 0
              }}
            ></div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#FFC32B",
                  fontFamily: "'Piedra', cursive",
                  marginBottom: 2,
                }}
              >
                {group.name}
              </div>
              <div
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontFamily: "'Piedra', cursive",
                  opacity: 0.8
                }}
              >
                {group.members} members · Last message {group.last}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}