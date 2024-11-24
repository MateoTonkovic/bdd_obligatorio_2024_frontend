import React from "react";
import { Link, useNavigate } from "react-router-dom";

const VolverHome = () => {
  const navigation = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bdd_token")}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("bdd_token");
        navigation("/login");
      }

      return response;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: "  blue",
          padding: "10px 20px",
          borderRadius: "5px",
          display: "inline-block",
          fontWeight: "bold",
        }}
      >
        Volver al Home
      </Link>
      <button
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: "red",
          padding: "10px 20px",
          borderRadius: "5px",
          display: "inline-block",
          fontWeight: "bold",
          marginLeft: "20px",
        }}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default VolverHome;
