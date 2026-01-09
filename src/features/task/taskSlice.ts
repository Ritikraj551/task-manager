import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

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

export const fetchTasks = createAsyncThunk<Task[]>(
  "task/fetchTasks",
  async () => {
    const res = await fetch("/tasks");
    return res.json();
  }
);

export const createTask = createAsyncThunk<Task, string>(
  "task/createTask",
  async (text) => {
    const newTask = { id: nanoid(), text };

    await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    return newTask;
  }
);

export const deleteTask = createAsyncThunk<string, string>(
  "task/deleteTask",
  async (id) => {
    await fetch(`/tasks/${id}`, { method: "DELETE" });
    return id;
  }
);

export const editTask = createAsyncThunk<Task, { id: string; text: string }>(
  "task/editTask",
  async ({ id, text }) => {
    const updatedTask = { id, text };

    await fetch(`/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    return updatedTask;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
