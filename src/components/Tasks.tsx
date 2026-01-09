import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { fetchTasks, updateTask, deleteTask } from "../features/task/taskSlice";
import type { Task } from "../features/task/taskSlice";

const Tasks = () => {
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const startEdit = (
    id: string,
    currentTitle: string,
    currentDescription: string
  ) => {
    setEditingId(id);
    setTitle(currentTitle);
    setDescription(currentDescription);
  };

  const saveEdit = (id: string) => {
    if (!title.trim()) return;
    dispatch(updateTask({ id, updates: { title, description } }));
    setEditingId(null);
    setTitle("");
    setDescription("");
  };

  const toggleStatus = (task: Task) => {
    dispatch(
      updateTask({
        id: task.id,
        updates: {
          status: task.status === "pending" ? "completed" : "pending",
        },
      })
    );
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
        Loading tasks...
      </p>
    );
  if (tasks.length === 0)
    return (
      <p className="text-center text-gray-400 dark:text-gray-500 mt-10">
        No tasks yet
      </p>
    );

  return (
    <ul className="space-y-4 max-w-3xl mx-auto mt-6">
      {tasks.map((task: Task) => (
        <li
          key={task.id}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-2xl dark:hover:shadow-gray-800 transition-shadow duration-300"
        >
          {editingId === task.id ? (
            <div className="flex flex-col md:flex-row flex-1 gap-3 w-full">
              <input
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
              />
              <input
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-300"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
              />
              <button
                onClick={() => saveEdit(task.id)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
              <div className="flex items-start gap-4 flex-1">
                <button
                  onClick={() => toggleStatus(task)}
                  className={`w-6 h-6 flex items-center justify-center border rounded-full transition-colors mt-1 ${
                    task.status === "completed"
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-white dark:bg-gray-900 border-gray-400 dark:border-gray-600 text-transparent"
                  }`}
                >
                  ✓
                </button>

                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      task.status === "completed"
                        ? "text-gray-400 dark:text-gray-500 line-through"
                        : "text-gray-800 dark:text-white"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p
                    className={`mt-1 ${
                      task.status === "completed"
                        ? "text-gray-400 dark:text-gray-500 line-through"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {task.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full w-max ${
                    task.status === "completed"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400"
                      : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-400"
                  }`}
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>

                <button
                  onClick={() =>
                    startEdit(task.id, task.title, task.description)
                  }
                  disabled={task.status === "completed"}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    task.status === "completed"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Edit
                </button>

                <button
                  onClick={() => dispatch(deleteTask(task.id))}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Tasks;
