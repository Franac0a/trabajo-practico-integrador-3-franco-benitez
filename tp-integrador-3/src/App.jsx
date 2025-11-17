import { AppRouter } from "./router/AppRouter.jsx";
import { Footer } from "./components/Footer.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading.jsx";

export const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [taskRefreshKey, setTaskRefreshKey] = useState(0);

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (res.ok) {
        setIsAuth(true);
      } else if (res.status === 401) {
        setIsAuth(false); // Usuario no logueado
      } else {
        console.error("Error al verificar auth:", res.statusText);
        setIsAuth(false);
      }
    } catch (error) {
      console.error("Error al verificar auth:", error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = () => setIsAuth(true);
  const handleLogout = () => setIsAuth(false);
  const handleTaskChange = () => setTaskRefreshKey((prev) => prev + 1);

  if (loading) return <Loading />;

  return (
    <>
      <Navbar isAuth={isAuth} onLogout={handleLogout} />
      <AppRouter
        isAuth={isAuth}
        onLogin={handleLogin}
        onLogout={handleLogout}
        taskRefreshKey={taskRefreshKey}
        onTasksChange={handleTaskChange}
      />
      <Footer />
    </>
  );
};
