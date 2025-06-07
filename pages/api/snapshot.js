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

      // Chequea status y contenido antes de parsear
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        data = null;
      }

      if (!response.ok) {
        return res.status(response.status).json({
          error: "Error from Snapshot API",
          status: response.status,
          body: text
        });
      }

      if (data === null) {
        return res.status(500).json({
          error: "Snapshot API did not return valid JSON",
          body: text
        });
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        error: "Error connecting to Snapshot",
        details: error.message
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}