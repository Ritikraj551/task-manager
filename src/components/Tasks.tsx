import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTask, updateTask } from "../features/task/taskSlice";
import type { RootState } from "../app/store";

const Tasks = () => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (task: any) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleSave = (id: string) => {
    dispatch(updateTask({ id, text: editText }));
    setEditingId(null);
  };

  return (
    <>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task: any) => (
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

            <button onClick={() => dispatch(removeTask(task.id))}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tasks;
