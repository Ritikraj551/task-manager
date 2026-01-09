import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/task/taskSlice";
import type { AppDispatch } from "../app/store";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const addTaskHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    dispatch(
      createTask({
        title,
        description: "",
        status: "pending",
      })
    );

    setTitle("");
  };

  return (
    <form
      onSubmit={addTaskHandler}
      className="flex gap-2 mb-4 justify-center items-center"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        className="border p-2 rounded w-64"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </form>
  );
};

export default AddTask;
