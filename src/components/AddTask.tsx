import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/task/taskSlice";
import type { AppDispatch } from "../app/store";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const addTaskHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      createTask({
        title,
        description,
        status: "pending",
      })
    );

    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={addTaskHandler}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-500 shadow-md max-w-3xl mx-auto flex flex-col md:flex-row gap-4 items-center transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row gap-3 flex-1 w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-300"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-300"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
