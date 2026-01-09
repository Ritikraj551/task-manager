import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
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

// Fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  return api.fetchTasks();
});

// Create task
export const createTask = createAsyncThunk(
  "tasks/create",
  async (task: Omit<Task, "id">) => {
    return api.createTask(task);
  }
);

// Update task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
    await api.updateTask(id, updates);
    return { id, updates };
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: string) => {
    await api.deleteTask(id);
    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tasks";
      })

      // Create
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      // Update
      .addCase(updateTask.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.id);
        if (task) {
          Object.assign(task, action.payload.updates);
        }
      })

      // Delete
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
