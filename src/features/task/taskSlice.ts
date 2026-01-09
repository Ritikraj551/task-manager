import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { api } from "../../api";

export interface Task {
  id: string;
  text: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

// API for thunks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return api.fetchTasks();
});

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (text: string) => {
    const newTask: Task = { id: nanoid(), text };
    return api.createTask(newTask);
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, text }: { id: string; text: string }) => {
    const updated = { id, text };
    return api.updateTask(updated);
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    return api.deleteTask(id);
  }
);

// Slices
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
