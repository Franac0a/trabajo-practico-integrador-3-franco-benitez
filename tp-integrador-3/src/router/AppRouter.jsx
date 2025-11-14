import { Routes, Route } from "react-router";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { ProfilePage } from "../pages/ProfilePage";

export const AppRouter = () => {
  return (
    <Routes>
      {/* //A Route se le pasas dos atributos, el primero es "path" (que es la url a
      la que va dirigir la pagina) //el segundo atributo es element que sirve
      para decirnos a que componente se va a dirigir cuando vaya a la url */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};
