import type { Task } from "../features/task/taskSlice";

// Fake API for production
let tasks: Task[] = [
  { id: "1", text: "Learn JS" },
  { id: "2", text: "Build project" },
];

const fakeApi = {
  login: async (username: string, password: string) => {
    if (username === "test" && password === "test123") {
      return { token: "fake-jwt-token" };
    }
    throw new Error("Invalid credentials");
  },

  fetchTasks: async (): Promise<Task[]> => tasks,

  createTask: async (task: Task) => {
    tasks.push(task);
    return task;
  },

  updateTask: async (task: Task) => {
    tasks = tasks.map((t) => (t.id === task.id ? task : t));
    return task;
  },

  deleteTask: async (id: string) => {
    tasks = tasks.filter((t) => t.id !== id);
    return id;
  },
};

// Dev API using MSW
const devApi = {
  login: async (username: string, password: string) => {
    const _res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (!_res.ok) throw new Error("Invalid credentials");
    return _res.json();
  },

  fetchTasks: async (): Promise<Task[]> => {
    const _res = await fetch("/tasks");
    return _res.json();
  },

  createTask: async (task: Task) => {
    const _res = await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return _res.json();
  },

  updateTask: async (task: Task) => {
    const _res = await fetch(`/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return _res.json();
  },

  deleteTask: async (id: string) => {
    await fetch(`/tasks/${id}`, { method: "DELETE" });
    return id;
  },
};

// Export API based on environment
export const api = import.meta.env.DEV ? devApi : fakeApi;
