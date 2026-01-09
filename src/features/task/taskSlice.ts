import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [{ id: 1, text: "Hello World" }],
};

export const taskSLice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = {
        id: nanoid(),
        text: action.payload.text,
      };
      state.tasks.push(task);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    //update task
  },
});

export const {addTask,removeTask} = taskSLice.actions

export default taskSLice.reducer