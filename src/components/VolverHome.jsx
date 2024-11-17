import React from "react";
import { Link } from "react-router-dom";

const VolverHome = () => {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: "#007BFF",
          padding: "10px 20px",
          borderRadius: "5px",
          display: "inline-block",
          fontWeight: "bold",
        }}
      >
        Volver al Home
      </Link>
    </div>
  );
};

export default VolverHome;
