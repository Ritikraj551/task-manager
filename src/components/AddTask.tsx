import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/task/taskSlice";

const AddTask = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const addTaskHandler = (e) => {
    e.preventDefault();
    dispatch(addTask(input));
    setTask("");
  };

  return (
    <form
      onSubmit={addTaskHandler}
      className="flex justify-center items-center px-12 w-full gap-4"
    >
      <input
        type="text"
        className="bg-white rounded-2xl p-2 w-full text-xl font-bold"
        name=""
        id=""
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="bg-gray-600 p-2 rounded-3xl px-4 text-emerald-200 font-bold">
        Add
      </button>
    </form>
  );
};

export default AddTask;
