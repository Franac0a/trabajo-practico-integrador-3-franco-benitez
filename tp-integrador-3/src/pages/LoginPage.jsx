import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "../hooks/useForm.js";

export const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const { formValue, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formValue),
      });

      if (res.ok) {
        onLogin(); // actualiza el estado de autenticación en App.jsx
        handleReset();
        navigate("/home"); // redirige a home
      } else {
        const data = await res.json();
        alert(data.message || "Error en login");
      }
    } catch (error) {
      console.error(error);
      alert("Error del servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-5">
      <h2 className="mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formValue.username} // nunca será undefined
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValue.password} // nunca será undefined
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
};
