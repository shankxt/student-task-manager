import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskCard from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`);

      const result = await response.json();

      setTasks(result.data);
    }

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Navbar />

        <div className="mb-6">
          {!isFormOpen && (
            <div className="flex items-center justify-between gap-4">
              <TaskFilter />

              <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                + Add Task
              </button>
            </div>
          )}

          {isFormOpen && <TaskForm onCancel={() => setIsFormOpen(false)} />}
        </div>

        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default App;
