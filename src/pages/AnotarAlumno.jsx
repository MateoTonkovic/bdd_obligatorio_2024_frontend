import { useState, useEffect } from "react";
import VolverHome from "../components/VolverHome";

export default function AnotarAlumno() {
  const [clases, setClases] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [equipamientos, setEquipamientos] = useState([]);
  const [anotacion, setAnotacion] = useState({
    id_clase: "",
    ci_alumno: "",
    id_equipamiento: "",
  });
  const [error, setError] = useState(null);

  const fetchDatosIniciales = async () => {
    try {
      const [clasesResponse, alumnosResponse, equipamientosResponse] =
        await Promise.all([
          fetch("http://localhost:8000/clases/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
            },
          }),
          fetch("http://localhost:8000/alumnos/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
            },
          }),
          fetch("http://localhost:8000/equipamientos/", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
            },
          }),
        ]);

      if (
        !clasesResponse.ok ||
        !alumnosResponse.ok ||
        !equipamientosResponse.ok
      )
        throw new Error("Error al obtener datos iniciales");

      const [clasesData, alumnosData, equipamientosData] = await Promise.all([
        clasesResponse.json(),
        alumnosResponse.json(),
        equipamientosResponse.json(),
      ]);

      setClases(clasesData);
      setAlumnos(alumnosData);
      setEquipamientos(equipamientosData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchDatosIniciales();
  }, []);

  const anotarAlumno = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `http://localhost:8000/clases/${anotacion.id_clase}/alumnos/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
          },
          body: JSON.stringify({
            ci_alumno: anotacion.ci_alumno,
            id_equipamiento: anotacion.id_equipamiento || null,
          }),
        }
      );

      setAnotacion({ id_clase: "", ci_alumno: "", id_equipamiento: "" });
      fetchDatosIniciales();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <VolverHome />
      <h1>Anotar Alumno a Clase</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={anotarAlumno}>
        <div>
          <label>Clase:</label>
          <select
            value={anotacion.id_clase}
            onChange={(e) =>
              setAnotacion({ ...anotacion, id_clase: e.target.value })
            }
            required
          >
            <option value="">Seleccione una clase</option>
            {clases.map((clase) => (
              <option key={clase.id_clase} value={clase.id_clase}>
                {`Clase ${clase.id_clase} - ${clase.descripcion_actividad}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Alumno:</label>
          <select
            value={anotacion.ci_alumno}
            onChange={(e) =>
              setAnotacion({ ...anotacion, ci_alumno: e.target.value })
            }
            required
          >
            <option value="">Seleccione un alumno</option>
            {alumnos.map((alumno) => (
              <option key={alumno.ci} value={alumno.ci}>
                {`${alumno.nombre} ${alumno.apellido}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Equipamiento:</label>
          <select
            value={anotacion.id_equipamiento}
            onChange={(e) =>
              setAnotacion({ ...anotacion, id_equipamiento: e.target.value })
            }
          >
            <option value="">Sin equipamiento</option>
            {equipamientos.map((equipamiento) => (
              <option key={equipamiento.id} value={equipamiento.id}>
                {equipamiento.descripcion}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Anotar Alumno</button>
      </form>
    </div>
  );
}
