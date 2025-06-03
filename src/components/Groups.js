import React from "react";

export default function Groups() {
  return (
    <div className="screen-content">
      <h2 className="section-title">Groups</h2>
      <input
        className="search-input"
        type="text"
        placeholder="Search groups or ENS"
        disabled
      />
      <div className="group-list">
        <div className="group-item">
          <div className="group-avatar" />
          <div className="group-info">
            <div className="group-name">Crypto Builders</div>
            <div className="group-desc">12 members · Last message 2m ago</div>
          </div>
        </div>
        <div className="group-item">
          <div className="group-avatar" />
          <div className="group-info">
            <div className="group-name">Web3 Artists</div>
            <div className="group-desc">87 members · Last message 10m ago</div>
          </div>
        </div>
        <div className="group-item">
          <div className="group-avatar" />
          <div className="group-info">
            <div className="group-name">DeFi Talk</div>
            <div className="group-desc">250 members · Last message 1h ago</div>
          </div>
        </div>
        <div className="group-item">
          <div className="group-avatar" />
          <div className="group-info">
            <div className="group-name">AI & Blockchain</div>
            <div className="group-desc">99 members · Last message 3h ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}