import React, { useState, useEffect } from "react";
import VolverHome from "../components/VolverHome";

const Instructores = () => {
  const [instructores, setInstructores] = useState([]);
  const [nuevoInstructor, setNuevoInstructor] = useState({
    ci: "",
    nombre: "",
    apellido: "",
  });
  const [instructorSeleccionado, setInstructorSeleccionado] = useState(null);
  const [error, setError] = useState(null);

  const fetchInstructores = async () => {
    try {
      const response = await fetch("http://localhost:8000/instructores/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
          AccessControlAllowOrigin: "*",
        },
        credentials: "include",
      });

      const data = await response.json();
      setInstructores(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchInstructores();
  }, []);

  const agregarInstructor = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:8000/instructores/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
        body: JSON.stringify(nuevoInstructor),
      });

      setNuevoInstructor({ ci: "", nombre: "", apellido: "" });
      fetchInstructores();
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminarInstructor = async (ci) => {
    try {
      await fetch(`http://localhost:8000/instructores/${ci}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
      });

      fetchInstructores();
    } catch (err) {
      setError(err.message);
    }
  };

  const guardarEdicion = async () => {
    try {
      await fetch(
        `http://localhost:8000/instructores/${instructorSeleccionado.ci}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
          },
          body: JSON.stringify({
            nombre: instructorSeleccionado.nombre,
            apellido: instructorSeleccionado.apellido,
          }),
        }
      );

      setInstructorSeleccionado(null);
      fetchInstructores();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <VolverHome />
      <h1>Gestión de Instructores</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={agregarInstructor}>
        <h2>Agregar Instructor</h2>
        <div>
          <label>CI:</label>
          <input
            type="number"
            value={nuevoInstructor.ci}
            onChange={(e) =>
              setNuevoInstructor({ ...nuevoInstructor, ci: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nuevoInstructor.nombre}
            onChange={(e) =>
              setNuevoInstructor({ ...nuevoInstructor, nombre: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={nuevoInstructor.apellido}
            onChange={(e) =>
              setNuevoInstructor({
                ...nuevoInstructor,
                apellido: e.target.value,
              })
            }
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>

      <h2>Lista de Instructores</h2>
      <table>
        <thead>
          <tr>
            <th>CI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {instructores.map((instructor) => (
            <tr key={instructor.ci}>
              <td>{instructor.ci}</td>
              <td>{instructor.nombre}</td>
              <td>{instructor.apellido}</td>
              <td>
                <button onClick={() => setInstructorSeleccionado(instructor)}>
                  Editar
                </button>
                <button onClick={() => eliminarInstructor(instructor.ci)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {instructorSeleccionado && (
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
          <h2>Editar Instructor</h2>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={instructorSeleccionado.nombre}
              onChange={(e) =>
                setInstructorSeleccionado({
                  ...instructorSeleccionado,
                  nombre: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              value={instructorSeleccionado.apellido}
              onChange={(e) =>
                setInstructorSeleccionado({
                  ...instructorSeleccionado,
                  apellido: e.target.value,
                })
              }
              required
            />
          </div>
          <button onClick={guardarEdicion}>Guardar</button>
          <button onClick={() => setInstructorSeleccionado(null)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default Instructores;
