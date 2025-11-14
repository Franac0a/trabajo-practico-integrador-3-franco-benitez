import { useState } from "react";
import { useNavigate } from "react-router";

export const useForm = (intialValue = {}) => {
  const [formValue, setFormValue] = useState(intialValue);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleReset = () => {
    setFormValue(intialValue);
  };

  //   funcion que se ejecuta al iniciar sesion y se manda a la bd
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.msg);
    }
  };

  return {
    handleChange,
    handleReset,
    handleSubmit,
    formValue,
  };
};
