import React from "react";
import { Link } from "react-router-dom";
import VolverHome from "../components/VolverHome";

const Home = () => {
  return (
    <div>
      <VolverHome />
      <h1>Bienvenido a la Escuela de Deportes de Nieve</h1>
      <p>
        Esta aplicación te permitirá gestionar instructores, turnos,
        actividades, clases y reportes.
      </p>

      <div>
        <h2>¿Qué deseas hacer?</h2>
        <ul>
          <li>
            <Link to="/instructores">Gestión de Instructores</Link>
          </li>
          <li>
            <Link to="/turnos">Gestión de Turnos</Link>
          </li>
          <li>
            <Link to="/actividades">Gestión de Actividades</Link>
          </li>
          <li>
            <Link to="/alumnos">Gestión de Alumnos</Link>
          </li>
          <li>
            <Link to="/clases">Gestión de Clases</Link>
          </li>
          <li>
            <Link to="/anotar-alumno">Anotar alumno</Link>
          </li>
          <li>
            <Link to="/reportes">Ver Reportes</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
