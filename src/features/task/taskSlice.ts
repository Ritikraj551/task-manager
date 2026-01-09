import { createSlice, nanoid } from "@reduxjs/toolkit";

interface Task {
  id: string;
  text: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [{ id: "1", text: "Hello World" }],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task: Task = {
        id: nanoid(),
        text: action.payload.text,
      };
      state.tasks.push(task);
    },

    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    updateTask: (state, action) => {
      const { id, text } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.text = text;
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
