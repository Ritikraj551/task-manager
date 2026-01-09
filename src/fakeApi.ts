type Task = { id: string; text: string };

let tasks: Task[] = [
  { id: "1", text: "Learn Javascript" },
  { id: "2", text: "Build project" },
];

export const loginApi = async (username: string, password: string) => {
  if (username === "test" && password === "test123") {
    return { token: "fake-jwt-token" };
  } else {
    throw new Error("Invalid credentials");
  }
};

export const fetchTasksApi = async () => tasks;

export const createTaskApi = async (task: Task) => {
  tasks.push(task);
  return task;
};

export const updateTaskApi = async (task: Task) => {
  tasks = tasks.map((t) => (t.id === task.id ? task : t));
  return task;
};

export const deleteTaskApi = async (id: string) => {
  tasks = tasks.filter((t) => t.id !== id);
  return id;
};
