import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTask } from "../features/task/taskSlice";

const Tasks = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  return (
    <>
      <div>Tasks</div>
      {tasks.map((task) => {
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch(removeTask(todo.id))}>X</button>
        </li>;
      })}
    </>
  );
};

export default Tasks;
