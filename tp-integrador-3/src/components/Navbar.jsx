import { Link, useNavigate } from "react-router";

export const Navbar = ({ isAuth, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      onLogout();
      navigate("/login");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/home");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container-fluid">
        <h1 className="navbar-brand fs-4 fw-bold">TP 2 INTEGRADOR</h1>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
            {isAuth ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/home"
                    onClick={handleSubmit}
                    className="nav-link text-light"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/tasks" className="nav-link text-light">
                    Tasks
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/profile" className="nav-link text-light">
                    Profile
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger btn-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link fw-semibold text-light">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/register"
                    className="nav-link fw-semibold text-light"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
