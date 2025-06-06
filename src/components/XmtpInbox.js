import React, { useState } from "react";
import { getXmtpClient } from "../utils/xmtpClient";

export default function XmtpInbox() {
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState("");

  const fetchMessages = async () => {
    try {
      const xmtp = await getXmtpClient();
      const conversation = await xmtp.conversations.newConversation(recipient);
      const msgs = await conversation.messages();
      setMessages(msgs);
    } catch (e) {
      alert("Error: " + (e.message || e.toString()));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <input
        type="text"
        placeholder="Dirección del contacto (0x...)"
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <button onClick={fetchMessages} style={{ width: "100%" }}>
        Ver mensajes
      </button>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>
            <b>{msg.senderAddress === recipient ? "Él" : "Tú"}:</b> {msg.content}
          </li>
        ))}
      </ul>
    </div>
  );
}