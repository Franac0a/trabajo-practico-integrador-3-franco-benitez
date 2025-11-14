import { AppRouter } from "./router/AppRouter";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
//Importante importar el AppRouter para que al rendirezar App, nos pueda mostrar las distintas rutas
export const App = () => {
  return (
    <>
      <Navbar />
      <AppRouter />
      <Footer />
    </>
  );
};
