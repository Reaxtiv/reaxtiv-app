import React, { useState } from "react";
import { getXmtpClient } from "../utils/xmtpClient";

export default function XmtpSend() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      const xmtp = await getXmtpClient();
      // Verifica si la billetera tiene XMTP activado
      const canMessage = await xmtp.canMessage(recipient);
      if (!canMessage) {
        setStatus("❌ Esta dirección no tiene XMTP activado. El usuario debe conectar su billetera a una app XMTP (como https://xmtp.chat/) al menos una vez.");
        setLoading(false);
        return;
      }
      const conversation = await xmtp.conversations.newConversation(recipient);
      await conversation.send(message);
      setStatus("✅ Mensaje enviado correctamente");
      setMessage("");
    } catch (e) {
      setStatus("Error: " + (e.message || e.toString()));
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={sendMessage} style={{ maxWidth: 400, margin: "auto" }}>
      <input
        type="text"
        placeholder="Dirección del destinatario (0x...)"
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="text"
        placeholder="Tu mensaje"
        value={message}
        onChange={e => setMessage(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <button type="submit" disabled={loading} style={{ width: "100%" }}>
        {loading ? "Enviando..." : "Enviar Mensaje"}
      </button>
      {status && <div style={{ marginTop: 8 }}>{status}</div>}
    </form>
  );
}