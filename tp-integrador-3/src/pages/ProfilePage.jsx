import { useEffect, useState } from "react";
import { Loading } from "../components/Loading.jsx";
import { useNavigate } from "react-router";

export const ProfilePage = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      } else {
        onLogout();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    } finally {
      onLogout();
    }
  };

  return (
    <main
      className="d-flex justify-content-center align-items-start bg-light p-4 pt-5"
      style={{ minHeight: "100vh" }}
    >
      <section
        className="bg-white p-4 p-md-5 shadow rounded w-100"
        style={{ maxWidth: "650px" }}
      >
        {loading && <Loading />}

        <div className="d-flex align-items-center gap-3 mb-4">
          <div
            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center fw-bold"
            style={{ width: "64px", height: "64px", fontSize: "28px" }}
          >
            {userData?.name ? userData.name[0] : "U"}
          </div>

          <div>
            <h2 className="fw-bold fs-3 text-dark">
              {userData?.name
                ? `${userData.name} ${userData.lastname}`
                : "Profile"}
            </h2>
            <p className="text-muted small">Personal information</p>
          </div>
        </div>

        <hr />

        {!loading && userData && (
          <div className="d-flex flex-column gap-3">
            <div className="d-flex justify-content-between border-bottom pb-2">
              <span className="text-muted fw-semibold">Name</span>
              <p className="fw-bold text-dark m-0">{userData.name}</p>
            </div>

            <div className="d-flex justify-content-between border-bottom pb-2">
              <span className="text-muted fw-semibold">Lastname</span>
              <p className="fw-bold text-dark m-0">{userData.lastname}</p>
            </div>

            {userData.username && (
              <div className="d-flex justify-content-between border-bottom pb-2">
                <span className="text-muted fw-semibold">Username</span>
                <p className="fw-bold text-dark m-0">{userData.username}</p>
              </div>
            )}

            {userData.email && (
              <div className="d-flex justify-content-between border-bottom pb-2">
                <span className="text-muted fw-semibold">Email</span>
                <p className="fw-bold text-dark m-0">{userData.email}</p>
              </div>
            )}

            <div className="pt-3">
              <button
                onClick={handleLogout}
                className="btn btn-danger w-100 fw-bold py-2"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
