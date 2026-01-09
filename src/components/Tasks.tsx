import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { fetchTasks, editTask, deleteTask } from "../features/task/taskSlice";

const Tasks = () => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEdit = (task: { id: string; text: string }) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleSave = (id: string) => {
    dispatch(editTask({ id, text: editText }));
    setEditingId(null);
  };

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2 items-center">
          {editingId === task.id ? (
            <>
              <input
                className="border p-1 rounded w-48"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button
                onClick={() => handleSave(task.id)}
                className="bg-blue-600 text-white px-2 py-1 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span className="flex-1">{task.text}</span>
              <button
                onClick={() => handleEdit(task)}
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
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tasks;
