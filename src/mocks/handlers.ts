import { http, HttpResponse } from "msw";

let tasks = [
  { id: "1", text: "Learn Javascript" },
  { id: "2", text: "Build project" },
];

export const handlers = [
  // LOGIN
  http.post("/login", async ({ request }) => {
    const { username, password } = await request.json();

    if (username === "test" && password === "test123") {
      return HttpResponse.json({
        token: "fake-jwt-token",
      });
    }

    return new HttpResponse("Invalid credentials", { status: 401 });
  }),

  // GET TASKS
  http.get("/tasks", () => {
    return HttpResponse.json(tasks);
  }),

  // ADD TASK
  http.post("/tasks", async ({ request }) => {
    const newTask = await request.json();
    tasks.push(newTask);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  // UPDATE TASK
  http.put("/tasks/:id", async ({ request, params }) => {
    const updatedTask = await request.json();
    tasks = tasks.map((task) => (task.id === params.id ? updatedTask : task));
    return HttpResponse.json(updatedTask);
  }),

  // DELETE TASK
  http.delete("/tasks/:id", ({ params }) => {
    tasks = tasks.filter((task) => task.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),
];
