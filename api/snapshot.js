export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST allowed" });
    return;
  }
  try {
    const snapshotRes = await fetch("https://hub.snapshot.org/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await snapshotRes.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Snapshot proxy error" });
  }
}