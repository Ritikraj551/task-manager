import type { Task } from "../features/task/taskSlice";

export const api = {
  login: async (username: string, password: string) => {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    return res.json();
  },

  fetchTasks: async (): Promise<Task[]> => {
    const res = await fetch("/tasks");
    return res.json();
  },

  createTask: async (task: Omit<Task, "id">) => {
    const res = await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    return res.json();
  },

  updateTask: async (id: string, task: Partial<Task>) => {
    const res = await fetch(`/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    return res.json();
  },

  deleteTask: async (id: string) => {
    await fetch(`/tasks/${id}`, { method: "DELETE" });
    return id;
  },
};
