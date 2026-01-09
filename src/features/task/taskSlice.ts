import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { api } from "../../api";

export interface Task {
  id: string;
  text: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return api.fetchTasks();
});

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (text: string) => {
    const task: Task = { id: nanoid(), text };
    return api.createTask(task);
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, text }: { id: string; text: string }) => {
    return api.updateTask({ id, text });
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    return api.deleteTask(id);
  }
);

// Slice
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
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
