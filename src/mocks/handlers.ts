import { http, HttpResponse } from "msw";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
};

// Load tasks from localStorage
const loadTasks = (): Task[] => {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
};

// Save tasks to localStorage
const saveTasks = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// In-memory tasks (initialized from localStorage)
let tasks: Task[] = loadTasks();

export const handlers = [
  // LOGIN
  http.post("/login", async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    if (username === "test" && password === "test123") {
      return HttpResponse.json({ token: "fake-jwt-token" });
    }

    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  // GET TASKS
  http.get("/tasks", () => {
    return HttpResponse.json(tasks);
  }),

  // CREATE TASK
  http.post("/tasks", async ({ request }) => {
    const body = (await request.json()) as Omit<Task, "id">;

    const newTask: Task = {
      id: Date.now().toString(),
      ...body,
    };

    tasks.push(newTask);
    saveTasks(tasks);

    return HttpResponse.json(newTask, { status: 201 });
  }),

  // UPDATE TASK
  http.put("/tasks/:id", async ({ request, params }) => {
    const body = (await request.json()) as Omit<Task, "id">;

    tasks = tasks.map((task) =>
      task.id === params.id ? { ...task, ...body } : task
    );

    saveTasks(tasks);

    return HttpResponse.json({ success: true });
  }),

  // DELETE TASK
  http.delete("/tasks/:id", ({ params }) => {
    tasks = tasks.filter((task) => task.id !== params.id);
    saveTasks(tasks);

    return new HttpResponse(null, { status: 204 });
  }),
];
