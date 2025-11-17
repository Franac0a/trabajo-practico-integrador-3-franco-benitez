import { useState } from "react";
import { useNavigate } from "react-router";

export const useForm = (initialValue = {}) => {
  const [formValue, setFormValue] = useState(initialValue);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormValue(initialValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formValue),
      });

      if (response.ok) {
        navigate("/home");
        handleReset();
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return {
    handleChange,
    handleReset,
    handleSubmit,
    formValue,
  };
};
