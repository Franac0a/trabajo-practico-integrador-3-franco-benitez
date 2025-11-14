import { useEffect } from "react";
import { useForm } from "../hooks/useForm.js";
export const LoginPage = () => {
  const { formValue, handleChange, handleSubmit } = useForm({
    username: "",
    password: "",
  });

  // useEffect(() => {
  //   console.log(formValue);
  // }, [formValue]);
  const { username, password } = formValue;

  return (
    <div className="d-flex justify-content-center mt-5">
      {/* etiqueta form que es de formulario */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow-sm bg-light"
        style={{ width: "320px" }}
      >
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            name="username"
            placeholder="usuario"
            value={username}
            onChange={handleChange}
            type="text"
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            placeholder="contraseña"
            value={password}
            onChange={handleChange}
            type="password"
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesion
        </button>
      </form>
    </div>
  );
};
