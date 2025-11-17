import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "../hooks/useForm.js";
import { Loading } from "../components/Loading.jsx";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { formState, handleChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    name: "",
    lastname: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Usuario registrado exitosamente");
        handleReset();
        navigate("/login");
      } else {
        alert(data.message || "Error al registrar usuario");
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
      <h2 className="mb-4">Register</h2>

      {loading && <Loading />}

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div>
          <label htmlFor="lastname" className="form-label">
            Lastname
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formState.lastname}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

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
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
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
          Register
        </button>
      </form>
    </main>
  );
};
