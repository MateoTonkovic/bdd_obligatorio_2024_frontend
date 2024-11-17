import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Instructores from "./pages/Instructores";
import Turnos from "./pages/Turnos";
import Actividades from "./pages/Actividades";
import Alumnos from "./pages/Alumnos";
import Clases from "./pages/Clases";
import Reportes from "./pages/Reportes";
import AnotarAlumno from "./pages/AnotarAlumno";
import "./App.css";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/instructores" element={<Instructores />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/actividades" element={<Actividades />} />
          <Route path="/alumnos" element={<Alumnos />} />
          <Route path="/clases" element={<Clases />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/anotar-alumno" element={<AnotarAlumno />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
