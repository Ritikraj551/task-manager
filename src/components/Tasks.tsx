import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { fetchTasks, deleteTask, editTask } from "../features/task/taskSlice";
import type { AppDispatch } from "../app/store";

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
    <>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingId === task.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSave(task.id)}>Save</button>
              </>
            ) : (
              <>
                {task.text}
                <button onClick={() => handleEdit(task)}>Edit</button>
              </>
            )}

            <button onClick={() => dispatch(deleteTask(task.id))}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tasks;
