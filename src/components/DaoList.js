import React, { useState, useEffect } from "react";

export default function DaoList() {
  const [daos, setDaos] = useState([]);

  useEffect(() => {
    fetch("/api/snapshot")
      .then(res => res.json())
      .then(data => {
        // Aquí verás el resultado en la consola
        console.log("DAOs recibidos:", data);
        setDaos(data);
      })
      .catch(error => {
        console.error("Error al obtener los DAOs:", error);
      });
  }, []);

  return (
    <ul>
      {daos.map(dao => (
        <li key={dao.id}>{dao.name}</li>
      ))}
    </ul>
  );
}