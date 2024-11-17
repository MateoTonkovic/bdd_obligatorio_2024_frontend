import React, { useState, useEffect } from "react";
import VolverHome from "../components/VolverHome";

const Clases = () => {
  const [clases, setClases] = useState([]);
  const [nuevaClase, setNuevaClase] = useState({
    ci_instructor: "",
    id_actividad: "",
    id_turno: "",
    dictada: false,
  });
  const [claseSeleccionada, setClaseSeleccionada] = useState(null); // Estado para la clase a editar
  const [error, setError] = useState(null);
  const [instructores, setInstructores] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [turnos, setTurnos] = useState([]);

  const fetchDatosIniciales = async () => {
    try {
      const [
        clasesResponse,
        instructoresResponse,
        actividadesResponse,
        turnosResponse,
      ] = await Promise.all([
        fetch("http://localhost:8000/clases/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
          },
        }),
        fetch("http://localhost:8000/instructores/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
          },
        }),
        fetch("http://localhost:8000/actividades/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
          },
        }),
        fetch("http://localhost:8000/turnos/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
          },
        }),
      ]);

      const [clasesData, instructoresData, actividadesData, turnosData] =
        await Promise.all([
          clasesResponse.json(),
          instructoresResponse.json(),
          actividadesResponse.json(),
          turnosResponse.json(),
        ]);

      setClases(clasesData);
      setInstructores(instructoresData);
      setActividades(actividadesData);
      setTurnos(turnosData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchDatosIniciales();
  }, []);

  const agregarClase = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:8000/clases/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
        body: JSON.stringify(nuevaClase),
      });

      setNuevaClase({
        ci_instructor: "",
        id_actividad: "",
        id_turno: "",
        dictada: false,
      });
      fetchDatosIniciales();
    } catch (err) {
      setError(err.message);
    }
  };

  const guardarEdicion = async () => {
    try {
      await fetch(
        `http://localhost:8000/clases/${claseSeleccionada.id_clase}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
          },
          body: JSON.stringify(claseSeleccionada),
        }
      );

      setClaseSeleccionada(null);
      fetchDatosIniciales();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <VolverHome />
      <h1>Gestión de Clases</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={agregarClase}>
        <h2>Agregar Clase</h2>
        <div>
          <label>Instructor:</label>
          <select
            value={nuevaClase.ci_instructor}
            onChange={(e) =>
              setNuevaClase({ ...nuevaClase, ci_instructor: e.target.value })
            }
            required
          >
            <option value="">Seleccione un instructor</option>
            {instructores.map((instructor) => (
              <option key={instructor.ci} value={instructor.ci}>
                {instructor.nombre} {instructor.apellido}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Actividad:</label>
          <select
            value={nuevaClase.id_actividad}
            onChange={(e) =>
              setNuevaClase({ ...nuevaClase, id_actividad: e.target.value })
            }
            required
          >
            <option value="">Seleccione una actividad</option>
            {actividades.map((actividad) => (
              <option key={actividad.id} value={actividad.id}>
                {actividad.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Turno:</label>
          <select
            value={nuevaClase.id_turno}
            onChange={(e) =>
              setNuevaClase({ ...nuevaClase, id_turno: e.target.value })
            }
            required
          >
            <option value="">Seleccione un turno</option>
            {turnos.map((turno) => (
              <option key={turno.id} value={turno.id}>
                {turno.hora_inicio} - {turno.hora_fin}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Dictada:</label>
          <input
            type="checkbox"
            checked={nuevaClase.dictada}
            onChange={(e) =>
              setNuevaClase({ ...nuevaClase, dictada: e.target.checked })
            }
          />
        </div>
        <button type="submit">Agregar</button>
      </form>

      <h2>Lista de Clases</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Instructor</th>
            <th>Actividad</th>
            <th>Turno</th>
            <th>Dictada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clases.map((clase) => (
            <tr key={clase.id_clase}>
              <td>{clase.id_clase}</td>
              <td>{`${clase.nombre_instructor} ${clase.apellido_instructor}`}</td>
              <td>{clase.descripcion_actividad}</td>
              <td>{`${clase.hora_inicio} - ${clase.hora_fin}`}</td>
              <td>{clase.dictada ? "Sí" : "No"}</td>
              <td>
                <button onClick={() => setClaseSeleccionada(clase)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {claseSeleccionada && (
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
          <h2>Editar Clase</h2>
          <div>
            <label>Instructor:</label>
            <select
              value={claseSeleccionada.ci_instructor}
              onChange={(e) =>
                setClaseSeleccionada({
                  ...claseSeleccionada,
                  ci_instructor: e.target.value,
                })
              }
              required
            >
              <option value="">Seleccione un instructor</option>
              {instructores.map((instructor) => (
                <option key={instructor.ci} value={instructor.ci}>
                  {instructor.nombre} {instructor.apellido}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Actividad:</label>
            <select
              value={claseSeleccionada.id_actividad}
              onChange={(e) =>
                setClaseSeleccionada({
                  ...claseSeleccionada,
                  id_actividad: e.target.value,
                })
              }
              required
            >
              <option value="">Seleccione una actividad</option>
              {actividades.map((actividad) => (
                <option key={actividad.id} value={actividad.id}>
                  {actividad.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Turno:</label>
            <select
              value={claseSeleccionada.id_turno}
              onChange={(e) =>
                setClaseSeleccionada({
                  ...claseSeleccionada,
                  id_turno: e.target.value,
                })
              }
              required
            >
              <option value="">Seleccione un turno</option>
              {turnos.map((turno) => (
                <option key={turno.id} value={turno.id}>
                  {turno.hora_inicio} - {turno.hora_fin}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Dictada:</label>
            <input
              type="checkbox"
              checked={claseSeleccionada.dictada}
              onChange={(e) =>
                setClaseSeleccionada({
                  ...claseSeleccionada,
                  dictada: e.target.checked,
                })
              }
            />
          </div>
          <button onClick={guardarEdicion}>Guardar</button>
          <button onClick={() => setClaseSeleccionada(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Clases;
