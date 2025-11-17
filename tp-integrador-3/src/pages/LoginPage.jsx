import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "../hooks/useForm.js";
import { Loading } from "../components/Loading.jsx";

export const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { formState, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // MUY IMPORTANTE para cookies
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (res.ok) {
        handleReset();
        onLogin(); // actualiza isAuth en App.jsx
        navigate("/home");
      } else {
        alert(data.message || "Error en login");
      }
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-5">
      <h2 className="mb-4">Login</h2>

      {loading && <Loading />}

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formState.username}
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
            value={formState.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </main>
  );
};
