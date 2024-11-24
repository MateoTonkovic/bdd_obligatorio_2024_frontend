import React, { useState, useEffect } from "react";
import VolverHome from "../components/VolverHome";

const Actividades = () => {
  const [actividades, setActividades] = useState([]);
  const [nuevaActividad, setNuevaActividad] = useState({
    descripcion: "",
    costo: "",
  });
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [error, setError] = useState(null);

  const fetchActividades = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/actividades/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
      });

      const data = await response.json();
      setActividades(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchActividades();
  }, []);

  const agregarActividad = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:8000/actividades/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
        body: JSON.stringify(nuevaActividad),
      });

      setNuevaActividad({ descripcion: "", costo: "" });
      fetchActividades();
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminarActividad = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/actividades/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
      });

      fetchActividades();
    } catch (err) {
      setError(err.message);
    }
  };

  const guardarEdicion = async () => {
    try {
      await fetch(
        `http://127.0.0.1:8000/actividades/${actividadSeleccionada.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
          },
          body: JSON.stringify({
            descripcion: actividadSeleccionada.descripcion,
            costo: actividadSeleccionada.costo,
          }),
        }
      );

      setActividadSeleccionada(null);
      fetchActividades();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <VolverHome />
      <h1>Gestión de Actividades</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={agregarActividad}>
        <h2>Agregar Actividad</h2>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={nuevaActividad.descripcion}
            onChange={(e) =>
              setNuevaActividad({
                ...nuevaActividad,
                descripcion: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label>Costo:</label>
          <input
            type="number"
            step="0.01"
            value={nuevaActividad.costo}
            onChange={(e) =>
              setNuevaActividad({ ...nuevaActividad, costo: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>

      <h2>Lista de Actividades</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Costo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {actividades.map((actividad) => (
            <tr key={actividad.id}>
              <td>{actividad.id}</td>
              <td>{actividad.descripcion}</td>
              <td>${actividad.costo}</td>
              <td>
                <button onClick={() => setActividadSeleccionada(actividad)}>
                  Editar
                </button>
                <button onClick={() => eliminarActividad(actividad.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {actividadSeleccionada && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <h2>Editar Actividad</h2>
          <div>
            <label>Descripción:</label>
            <input
              type="text"
              value={actividadSeleccionada.descripcion}
              onChange={(e) =>
                setActividadSeleccionada({
                  ...actividadSeleccionada,
                  descripcion: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Costo:</label>
            <input
              type="number"
              step="0.01"
              value={actividadSeleccionada.costo}
              onChange={(e) =>
                setActividadSeleccionada({
                  ...actividadSeleccionada,
                  costo: e.target.value,
                })
              }
            />
          </div>
          <button onClick={guardarEdicion}>Guardar</button>
          <button onClick={() => setActividadSeleccionada(null)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default Actividades;
