import { useState } from "react";
import { useNavigate } from "react-router";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    lastname: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message || "Usuario registrado");
        navigate("/login");
      } else {
        setError(data.message || "Error registrando usuario");
      }
    } catch (err) {
      setError("Error en el servidor");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formState.name}
          onChange={handleChange}
          className="form-control"
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Lastname"
          value={formState.lastname}
          onChange={handleChange}
          className="form-control"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formState.username}
          onChange={handleChange}
          className="form-control"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
          className="form-control"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
          className="form-control"
          required
        />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};
