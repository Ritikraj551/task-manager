# Task Management Application (Frontend Only)

A simple **Task Management Application** built using **React + TypeScript** with a fully mocked backend using **Mock Service Worker (MSW)**. The app simulates authentication and task CRUD operations without a real backend, fulfilling common frontend internship requirements.

---

## Live Demo

**Live URL:** _(Add your Vercel / Netlify link here)_

---

## Features

### Authentication (Mocked)

- Login using predefined credentials
- Fake JWT token generation
- Authentication state persisted using `localStorage`
- Protected dashboard (tasks visible only after login)
- Logout functionality

**Test Credentials**

```
username: test
password: test123
```

---

### Task Management

- Fetch tasks from mocked API
- Add new task
- Edit existing task
- Delete task
- Tasks persist across page reloads

---

## Tech Stack

## React (Vite), TypeScript, Redux Toolkit, Tailwind CSS, Mock Service Worker (MSW), Netlify

## Architecture Overview

This project follows a **feature-based folder structure**:

```
src/
├── app/
│   └── store.ts
├── features/
│   ├── auth/
│   │   └── authSlice.ts
│   └── task/
│       └── taskSlice.ts
├── components/
│   ├── AddTask.tsx
│   ├── Tasks.tsx
│   ├── Login.tsx
│   └── Logout.tsx
├── App.tsx
└── main.tsx
```

---

## Data Flow

```
UI Component
 → dispatch
   → fetch()
     → MSW (mock API)
       → response
         → Redux
           → UI update
```

---

## Mock API (MSW)

The backend is fully mocked using **Mock Service Worker**.

### Mocked Endpoints

->| POST | /login | Simulates user login |

->| GET | /tasks | Fetch all tasks |

->| POST | /tasks | Create a new task |

->| PUT | /tasks/:id | Update a task |

->| DELETE | /tasks/:id | Delete a task |

MSW intercepts network requests in the browser and returns predefined responses, allowing realistic API simulation without a backend server.

---

## Persistence

- Authentication token is stored in `localStorage`
- Tasks persist across page reloads using mocked API state

---

## Running Locally

1. Clone the repository

```bash
git clone <your-repo-url>
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open in browser

```
http://localhost:5173
```

---

## License

This project is open for educational use.
