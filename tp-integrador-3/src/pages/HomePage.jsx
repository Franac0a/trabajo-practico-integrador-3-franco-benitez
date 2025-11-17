import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Loading } from "../components/Loading.jsx";

export const HomePage = ({ taskRefreshKey }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHomeData = async () => {
    try {
      setLoading(true);

      const promiseProfile = fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      const promiseTasks = fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });

      const [profileResponse, tasksResponse] = await Promise.all([
        promiseProfile,
        promiseTasks,
      ]);

      if (profileResponse.status === 401) {
        navigate("/login");
        return;
      }

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setUserData(profileData.user); // <-- Aquí extraemos solo el user
      }

      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json();
        setTasks(
          tasksData.tasks || (Array.isArray(tasksData) ? tasksData : [])
        );
      }
    } catch (error) {
      console.error("Error loading Home:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, [taskRefreshKey]);

  const allTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const pendingTasks = allTasks - completedTasks;

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center bg-light"
        style={{ minHeight: "100vh" }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <main className="bg-light p-4" style={{ minHeight: "100vh" }}>
      <div className="container bg-white p-5 shadow rounded">
        <h1 className="fs-2 fw-light text-secondary mb-4">
          Welcome{" "}
          <span className="fw-bold text-primary">
            {userData?.name || "User"} {userData?.lastname || ""}
          </span>
        </h1>

        <div className="row g-4 border-top border-bottom py-4">
          <div className="col-md-3">
            <div className="p-3 bg-primary bg-opacity-10 border-start border-primary border-3 text-center rounded shadow-sm">
              <h2 className="fw-bold text-primary">{allTasks}</h2>
              <p className="small text-secondary mt-1">Tasks All</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-3 bg-success bg-opacity-10 border-start border-success border-3 text-center rounded shadow-sm">
              <h2 className="fw-bold text-success">{completedTasks}</h2>
              <p className="small text-secondary mt-1">Completed</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="p-3 bg-warning bg-opacity-10 border-start border-warning border-3 text-center rounded shadow-sm">
              <h2 className="fw-bold text-warning">{pendingTasks}</h2>
              <p className="small text-secondary mt-1">Pending</p>
            </div>
          </div>

          <div className="col-md-3 d-flex align-items-center justify-content-center">
            <Link to="/tasks" className="btn btn-primary w-100 fw-bold py-2">
              Go to tasks
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
