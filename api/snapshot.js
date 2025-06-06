export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch('https://hub.snapshot.org/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error connecting to Snapshot", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}