import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">Task Tracker</h1>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => {
            const isCompleted = task.status === "done";
            return (
              <li
                key={task.id}
                className={`task-item ${isCompleted ? "completed" : "pending"}`}
              >
                <div className="task-title">{task.title}</div>
                <div className="task-status">{task.status}</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;