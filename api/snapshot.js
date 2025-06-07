export default async function handler(req, res) {
  // Si POST y body con daoId, devuelve las últimas propuestas de ese DAO
  if (req.method === "POST") {
    const { daoId } = req.body;
    if (!daoId) {
      return res.status(400).json({ error: "Falta parámetro 'daoId'" });
    }

    // Consulta las últimas 5 propuestas del DAO
    const query = {
      query: `
        {
          proposals(first: 5, where: {space_in: ["${daoId}"]}, orderBy: "created", orderDirection: desc) {
            id
            title
            body
            choices
            start
            end
            state
          }
        }
      `
    };

    try {
      const response = await fetch("https://hub.snapshot.org/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query)
      });
      const data = await response.json();
      res.status(200).json(data.data.proposals);
    } catch (error) {
      res.status(500).json({ error: "Error al consultar propuestas en Snapshot" });
    }
    return;
  }

  // Por defecto (GET), muestra los 15 principales DAOs ordenados por número de miembros
  if (req.method === "GET") {
    const query = {
      query: `
        {
          spaces(first: 15, orderBy: "members", orderDirection: desc) {
            id
            name
            about
            network
            members
            avatar
          }
        }
      `
    };

    try {
      const response = await fetch("https://hub.snapshot.org/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query)
      });
      const data = await response.json();
      res.status(200).json(data.data.spaces);
    } catch (error) {
      res.status(500).json({ error: "Error al consultar DAOs en Snapshot" });
    }
    return;
  }

  // Otros métodos no permitidos
  res.status(405).json({ error: "Método no permitido" });
}