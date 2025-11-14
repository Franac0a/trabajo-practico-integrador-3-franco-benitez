import { useNavigate, Link } from "react-router";

export const Navbar = () => {
  return (
    <nav className="d-flex gap-3 p-3 bg-color-blue text-black">
      <Link to="/">MyApp</Link>
      <Link to="/home">Home</Link>
      <Link to="/tasks">Tareas</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/logout">Logout</Link>
    </nav>
  );
};
