import React from "react";

export default function Chats() {
  return (
    <div className="screen-content">
      <h2 className="section-title">Chats</h2>
      <input
        className="search-input"
        type="text"
        placeholder="Search chat, ENS or address"
        disabled
      />
      <div className="chat-list">
        <div className="chat-item">
          <div className="chat-avatar" />
          <div className="chat-info">
            <div className="chat-name">Bob</div>
            <div className="chat-message unread">New unread message!</div>
          </div>
          <div className="chat-meta">
            <span className="chat-dot online" />
            <span className="chat-time">13:10</span>
          </div>
        </div>
        <div className="chat-item">
          <div className="chat-avatar" />
          <div className="chat-info">
            <div className="chat-name">Charlie</div>
            <div className="chat-message">Thanks a lot!</div>
          </div>
          <div className="chat-meta">
            <span className="chat-time">15:10</span>
          </div>
        </div>
        <div className="chat-item">
          <div className="chat-avatar" />
          <div className="chat-info">
            <div className="chat-name">Alice</div>
            <div className="chat-message">Did you get the contract?</div>
          </div>
          <div className="chat-meta">
            <span className="chat-time">22:34</span>
          </div>
        </div>
      </div>
    </div>
  );
}