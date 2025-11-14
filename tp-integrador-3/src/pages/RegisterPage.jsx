import { useForm } from "../hooks/useForm.js";
export const RegisterPage = () => {
  const { formValue, handleChange, handleSubmit } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dni: "",
  });

  const { username, email, password, firstname, lastname, dni } = formValue;

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
          <br />
          <input
            name="username"
            value={username}
            onChange={handleChange}
            type="text"
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <br />
          <input
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <br />
          <input
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Firstname</label>
          <br />
          <input
            name="firstname"
            value={firstname}
            onChange={handleChange}
            type="text"
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Lastname</label>
          <br />
          <input
            name="lastname"
            value={lastname}
            onChange={handleChange}
            type="text"
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">DNI</label>
          <br />
          <input
            name="dni"
            value={dni}
            onChange={handleChange}
            type="identification"
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Registrarse
        </button>
      </form>
    </div>
  );
};
