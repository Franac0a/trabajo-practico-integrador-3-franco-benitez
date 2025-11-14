import { useEffect } from "react";
import { useForm } from "../hooks/useForm.js";
export const LoginPage = () => {
  const { formValue, handleChange, handleReset, handleSubmit } = useForm({
    username: "",
    password: "",
  });

  useEffect(() => {
    console.log(formValue);
  }, [formValue]);

  return (
    <div>
      {/* etiqueta form que es de formulario */}
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          name="username"
          value={formValue.username}
          onChange={handleChange}
          type="text"
          required
        />
        <br />
        <label>Password</label>
        <input
          name="password"
          value={formValue.password}
          onChange={handleChange}
          type="password"
          required
        />
        <br />
        <button type="submit">Iniciar Sesion</button>
      </form>
    </div>
  );
};
