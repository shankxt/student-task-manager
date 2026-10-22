function TaskCard({ task }) {
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <input type="checkbox" className="mt-1 h-4 w-4" />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>

          {task.description && (
            <p className="mt-1 text-sm text-gray-500">{task.description}</p>
          )}

          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="rounded bg-gray-100 px-2 py-1 text-gray-700">
              {task.priority}
            </span>

            <span className="rounded bg-gray-100 px-2 py-1 text-gray-700">
              {task.status}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
            >
              Complete
            </button>

            <button
              type="button"
              className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
            >
              Edit
            </button>

            <button
              type="button"
              className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
