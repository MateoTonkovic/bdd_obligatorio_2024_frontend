import React, { useState } from "react";
import VolverHome from "../components/VolverHome";

const Reportes = () => {
  const [reporteSeleccionado, setReporteSeleccionado] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  const fetchReporte = async (endpoint) => {
    setResultados([]);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8000/reportes/${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
          },
        }
      );

      const data = await response.json();
      setResultados(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const manejarSeleccionReporte = (e) => {
    const reporte = e.target.value;
    setReporteSeleccionado(reporte);

    if (reporte === "actividades-mas-ingresos") {
      fetchReporte("actividades-mas-ingresos");
    } else if (reporte === "actividades-mas-alumnos") {
      fetchReporte("actividades-mas-alumnos");
    } else if (reporte === "turnos-mas-clases") {
      fetchReporte("turnos-mas-clases");
    }
  };

  return (
    <div>
      <VolverHome />
      <h1>Reportes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label htmlFor="reporte">Seleccione un reporte:</label>
        <select
          id="reporte"
          value={reporteSeleccionado}
          onChange={manejarSeleccionReporte}
        >
          <option value="">Seleccione...</option>
          <option value="actividades-mas-ingresos">
            Actividades que más ingresos generan
          </option>
          <option value="actividades-mas-alumnos">
            Actividades con más alumnos
          </option>
          <option value="turnos-mas-clases">
            Turnos con más clases dictadas
          </option>
        </select>
      </div>
      {resultados.length > 0 && (
        <div>
          <h2>Resultados del Reporte</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(resultados[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resultados.map((fila, index) => (
                <tr key={index}>
                  {Object.values(fila).map((valor, idx) => (
                    <td key={idx}>{valor}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reportes;
