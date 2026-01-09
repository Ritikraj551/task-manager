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

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const startEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setTitle(currentTitle);
  };

  const saveEdit = (id: string) => {
    if (!title.trim()) return;

    dispatch(
      updateTask({
        id,
        updates: { title },
      })
    );

    setEditingId(null);
    setTitle("");
  };

  if (loading) {
    return <p className="text-center">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks yet</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task:Task) => (
        <li
          key={task.id}
          className="flex items-center gap-2 border p-2 rounded"
        >
          {editingId === task.id ? (
            <>
              <input
                className="border p-1 rounded flex-1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                onClick={() => saveEdit(task.id)}
                className="bg-blue-600 text-white px-2 py-1 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span className="flex-1">{task.title}</span>
              <button
                onClick={() => startEdit(task.id, task.title)}
                className="bg-yellow-400 px-2 py-1 rounded"
              >
                Edit
              </button>
            </>
          )}

          <button
            onClick={() => dispatch(deleteTask(task.id))}
            className="bg-red-600 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tasks;
