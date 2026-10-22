import { useState } from "react";

function TaskForm({ onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      alert("Task title is required");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: trimmedTitle,
            description: description,
            priority: priority,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.msg || "Failed to create task");
        return;
      }

      alert("Task created successfully!");

      setTitle("");
      setDescription("");
      setPriority("medium");
      onCancel();
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Create a new task
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add details to organize your work.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Task title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description
          <span className="ml-1 font-normal text-gray-400">(Optional)</span>
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows={3}
          className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Priority
        </label>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Create Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
