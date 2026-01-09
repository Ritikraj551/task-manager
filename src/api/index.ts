import type { Task } from "../features/task/taskSlice";

// fake API
let tasks: Task[] = [
  { id: "1", text: "Learn Javascript" },
  { id: "2", text: "Build project" },
];

const fakeApi = {
  login: async (username: string, password: string) => {
    if (username === "test" && password === "test123") {
      return { token: "fake-jwt-token" };
    } else {
      throw new Error("Invalid credentials");
    }
  },
  fetchTasks: async (): Promise<Task[]> => tasks,
  createTask: async (task: Task): Promise<Task> => {
    tasks.push(task);
    return task;
  },
  updateTask: async (task: Task): Promise<Task> => {
    tasks = tasks.map((t) => (t.id === task.id ? task : t));
    return task;
  },
  deleteTask: async (id: string): Promise<string> => {
    tasks = tasks.filter((t) => t.id !== id);
    return id;
  },
};

// MSW
const devApi = {
  login: async (username: string, password: string) => {
    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Invalid credentials");
    return res.json();
  },
  fetchTasks: async () => {
    const res = await fetch("/tasks");
    return res.json();
  },
  createTask: async (task: Task) => {
    const res = await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return res.json();
  },
  updateTask: async (task: Task) => {
    const res = await fetch(`/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return res.json();
  },
  deleteTask: async (id: string) => {
    const res = await fetch(`/tasks/${id}`, { method: "DELETE" });
    return id;
  },
};

// ---- Export correct API based on environment ----
export const api = import.meta.env.DEV ? devApi : fakeApi;
