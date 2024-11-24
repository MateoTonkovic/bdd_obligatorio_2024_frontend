import React, { useState, useEffect } from "react";
import VolverHome from "../components/VolverHome";

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [nuevoAlumno, setNuevoAlumno] = useState({
    ci: "",
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    telefono: "",
    correo_electronico: "",
  });
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [error, setError] = useState(null);

  const fetchAlumnos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/alumnos/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
      });

      const data = await response.json();
      setAlumnos(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const agregarAlumno = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:8000/alumnos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
        body: JSON.stringify(nuevoAlumno),
      });

      setNuevoAlumno({
        ci: "",
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        telefono: "",
        correo_electronico: "",
      });
      fetchAlumnos();
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminarAlumno = async (ci) => {
    try {
      await fetch(`http://127.0.0.1:8000/alumnos/${ci}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
      });

      fetchAlumnos();
    } catch (err) {
      setError(err.message);
    }
  };

  const guardarEdicion = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/alumnos/${alumnoSeleccionado.ci}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
        body: JSON.stringify(alumnoSeleccionado),
      });

      setAlumnoSeleccionado(null);
      fetchAlumnos();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <VolverHome />

      <h1>Gestión de Alumnos</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={agregarAlumno}>
        <h2>Agregar Alumno</h2>
        <div>
          <label>CI:</label>
          <input
            type="number"
            value={nuevoAlumno.ci}
            onChange={(e) =>
              setNuevoAlumno({ ...nuevoAlumno, ci: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nuevoAlumno.nombre}
            onChange={(e) =>
              setNuevoAlumno({ ...nuevoAlumno, nombre: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={nuevoAlumno.apellido}
            onChange={(e) =>
              setNuevoAlumno({ ...nuevoAlumno, apellido: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            value={nuevoAlumno.fecha_nacimiento}
            onChange={(e) =>
              setNuevoAlumno({
                ...nuevoAlumno,
                fecha_nacimiento: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            value={nuevoAlumno.telefono}
            onChange={(e) =>
              setNuevoAlumno({ ...nuevoAlumno, telefono: e.target.value })
            }
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={nuevoAlumno.correo_electronico}
            onChange={(e) =>
              setNuevoAlumno({
                ...nuevoAlumno,
                correo_electronico: e.target.value,
              })
            }
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>

      <h2>Lista de Alumnos</h2>
      <table>
        <thead>
          <tr>
            <th>CI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.ci}>
              <td>{alumno.ci}</td>
              <td>{alumno.nombre}</td>
              <td>{alumno.apellido}</td>
              <td>{alumno.fecha_nacimiento}</td>
              <td>{alumno.telefono || "N/A"}</td>
              <td>{alumno.correo_electronico}</td>
              <td>
                <button onClick={() => setAlumnoSeleccionado(alumno)}>
                  Editar
                </button>
                <button onClick={() => eliminarAlumno(alumno.ci)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {alumnoSeleccionado && (
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
          <h2>Editar Alumno</h2>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={alumnoSeleccionado.nombre}
              onChange={(e) =>
                setAlumnoSeleccionado({
                  ...alumnoSeleccionado,
                  nombre: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              value={alumnoSeleccionado.apellido}
              onChange={(e) =>
                setAlumnoSeleccionado({
                  ...alumnoSeleccionado,
                  apellido: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              value={alumnoSeleccionado.fecha_nacimiento}
              onChange={(e) =>
                setAlumnoSeleccionado({
                  ...alumnoSeleccionado,
                  fecha_nacimiento: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              value={alumnoSeleccionado.telefono}
              onChange={(e) =>
                setAlumnoSeleccionado({
                  ...alumnoSeleccionado,
                  telefono: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={alumnoSeleccionado.correo_electronico}
              onChange={(e) =>
                setAlumnoSeleccionado({
                  ...alumnoSeleccionado,
                  correo_electronico: e.target.value,
                })
              }
            />
          </div>
          <button onClick={guardarEdicion}>Guardar</button>
          <button onClick={() => setAlumnoSeleccionado(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Alumnos;
