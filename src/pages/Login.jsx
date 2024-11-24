import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    correo: "",
    contraseña: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("bdd_token", data.token); // Save the token in localStorage
      navigate("/"); // Redirect to the home page or a protected route
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={credentials.correo}
            onChange={(e) =>
              setCredentials({ ...credentials, correo: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={credentials.contraseña}
            onChange={(e) =>
              setCredentials({ ...credentials, contraseña: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
