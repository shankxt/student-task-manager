
function TaskFilter() {
  return (
    <div className="flex flex-wrap gap-2">
      <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white">
        All
      </button>

      <button className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">
        Pending
      </button>

      <button className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">
        Completed
      </button>
    </div>
  );
}

export default TaskFilter;
