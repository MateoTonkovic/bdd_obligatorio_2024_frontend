import React, { useState, useEffect } from "react";
import VolverHome from "../components/VolverHome";
import { formatearHoraHHMM } from "../helpers/formateoDeHoras";

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [nuevoTurno, setNuevoTurno] = useState({
    hora_inicio: "",
    hora_fin: "",
  });
  const [error, setError] = useState(null);

  const fetchTurnos = async () => {
    try {
      const response = await fetch("http://localhost:8000/turnos/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
      });

      const data = await response.json();
      setTurnos(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTurnos();
  }, []);

  const agregarTurno = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:8000/turnos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
        body: JSON.stringify(nuevoTurno),
      });

      setNuevoTurno({ hora_inicio: "", hora_fin: "" });
      fetchTurnos();
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminarTurno = async (id) => {
    try {
      await fetch(`http://localhost:8000/turnos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
      });

      fetchTurnos();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <VolverHome />
      <h1>Gestión de Turnos</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={agregarTurno}>
        <h2>Agregar Turno</h2>
        <div>
          <label>Hora de Inicio:</label>
          <input
            type="time"
            value={nuevoTurno.hora_inicio}
            onChange={(e) =>
              setNuevoTurno({ ...nuevoTurno, hora_inicio: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Hora de Fin:</label>
          <input
            type="time"
            value={nuevoTurno.hora_fin}
            onChange={(e) =>
              setNuevoTurno({ ...nuevoTurno, hora_fin: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>

      <h2>Lista de Turnos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hora de Inicio</th>
            <th>Hora de Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((turno) => (
            <tr key={turno.id}>
              <td>{turno.id}</td>
              <td>{formatearHoraHHMM(turno.hora_inicio)}</td>
              <td>{formatearHoraHHMM(turno.hora_fin)}</td>
              <td>
                <button onClick={() => eliminarTurno(turno.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Turnos;
