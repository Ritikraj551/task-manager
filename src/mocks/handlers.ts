import { http, HttpResponse } from "msw";

type Task = {
  id: string;
  text: string;
}

let tasks:Task[] = [
  { id: "1", text: "Learn Javascript" },
  { id: "2", text: "Build project" },
];

export const handlers = [
  //Logging in
  http.post("/login", async ({ request }) => {
    const { username, password } = await request.json() as {
      username: string;
      password: string;
    };

    if (username === "test" && password === "test123") {
      return HttpResponse.json({
        token: "fake-jwt-token",
      });
    }

    return new HttpResponse("Invalid credentials", { status: 401 });
  }),

  //fetching tasks
  http.get("/tasks", () => {
    return HttpResponse.json(tasks);
  }),

  //creating task
  http.post("/tasks", async ({ request }) => {
    const newTask = (await request.json()) as Task;
    tasks.push(newTask);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  //editing task
  http.put("/tasks/:id", async ({ request, params }) => {
    const updatedTask = (await request.json()) as Task;
    tasks = tasks.map((task) => (task.id === params.id ? updatedTask : task));
    return HttpResponse.json(updatedTask);
  }),

  //deleting task
  http.delete("/tasks/:id", ({ params }) => {
    tasks = tasks.filter((task) => task.id !== params.id);
    return new HttpResponse(null, { status: 204 });
  }),
];
