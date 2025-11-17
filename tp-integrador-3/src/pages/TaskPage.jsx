import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { useForm } from "../hooks/useForm.js";

export const TasksPage = ({ onTasksChange }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { formState, setForm, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const [idEdit, setIdEdit] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks || (Array.isArray(data) ? data : []));
      } else {
        setTasks([]);
      }
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (idEdit) {
      await handleUpdateTask();
    } else {
      await handleCreateTask();
    }
  };

  const handleSelectEdit = (task) => {
    setIdEdit(task.id);
    setForm({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
    });
  };

  const handleCanceleEdit = () => {
    setIdEdit(null);
    handleReset();
  };

  const handleCreateTask = async () => {
    if (!formState.title) {
      alert("the title is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        alert("The task created");
        handleReset();
        await fetchTasks();
        onTasksChange && onTasksChange();
      } else {
        const data = await res.json();
        alert(data.message || "Error creating task");
      }
    } catch {
      alert("Error in the server");
    }
  };

  const handleUpdateTask = async () => {
    if (!formState.title) {
      alert("The title is required");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${idEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        alert("The task updated");
        handleCanceleEdit();
        await fetchTasks();
        onTasksChange && onTasksChange();
      } else {
        const data = await res.json();
        alert(data.message || "Error updating task");
      }
    } catch {
      alert("Error in the server");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("The task deleted");
        await fetchTasks();
        onTasksChange && onTasksChange();
      } else {
        const data = await res.json();
        alert(data.message || "Error deleting the task");
      }
    } catch {
      alert("Error in the server");
    }
  };

  return (
    <main className="bg-light p-4 p-md-5" style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="row g-4">
          <section className="col-lg-4">
            <div
              className="bg-white p-4 rounded shadow position-sticky"
              style={{ top: "100px" }}
            >
              <h2
                className={`fs-4 fw-semibold mb-4 ${
                  idEdit ? "text-warning" : "text-primary"
                }`}
              >
                {idEdit ? "Edit" : "Create"} Task
              </h2>

              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-3"
              >
                <div>
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formState.title}
                    onChange={handleChange}
                    placeholder="Example: Buy bread"
                    className="form-control"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={formState.description}
                    onChange={handleChange}
                    placeholder="Details"
                    rows="4"
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    id="is_completed"
                    name="is_completed"
                    checked={formState.is_completed}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  <label htmlFor="is_completed" className="form-check-label">
                    Mark as completed
                  </label>
                </div>

                <button
                  type="submit"
                  className={`btn text-white fw-semibold ${
                    idEdit ? "btn-warning" : "btn-primary"
                  }`}
                >
                  {idEdit ? "Update task" : "Save task"}
                </button>

                {idEdit && (
                  <button
                    type="button"
                    onClick={handleCanceleEdit}
                    className="btn btn-secondary"
                  >
                    Cancel update
                  </button>
                )}
              </form>
            </div>
          </section>

          <section className="col-lg-8">
            <h2 className="fs-4 fw-semibold text-dark border-bottom pb-2 mb-4">
              My Tasks
            </h2>

            {loading && <Loading />}

            {!loading && tasks.length === 0 && (
              <p className="p-3 bg-warning bg-opacity-25 text-warning rounded">
                There are no tasks. Use the form to create your first one.
              </p>
            )}

            {!loading && tasks.length > 0 && (
              <div className="d-flex flex-column gap-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded shadow-sm border-start ${
                      task.is_completed
                        ? "border-success opacity-75"
                        : "border-primary"
                    }`}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h3
                          className={`fs-5 fw-semibold ${
                            task.is_completed
                              ? "text-muted text-decoration-line-through"
                              : "text-dark"
                          }`}
                        >
                          {task.title}
                        </h3>

                        <p className="text-muted small">{task.description}</p>

                        <span
                          className={`badge ${
                            task.is_completed
                              ? "bg-success bg-opacity-25 text-success"
                              : "bg-primary bg-opacity-25 text-primary"
                          }`}
                        >
                          {task.is_completed ? "COMPLETED" : "PENDING"}
                        </span>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          onClick={() => handleSelectEdit(task)}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};
