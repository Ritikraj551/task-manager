# Task Manager (Frontend-only, Mocked API)

This project is a React + TypeScript frontend task manager that uses Mock Service Worker (MSW) to simulate backend endpoints (auth + tasks). State is managed with Redux Toolkit and persisted via localStorage in the mock layer.

Features

- Login (mocked, credentials: `test` / `test123`)
- Dashboard: list, create, edit, delete tasks
- Mocked endpoints: `POST /login`, `GET /tasks`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`
- MSW persists tasks to `localStorage` (key: `mock-tasks`)

Quick start

1. Install dependencies

```bash
npm install
# or
yarn
```

2. Install required libs (if not already present)

```bash
npm install msw @reduxjs/toolkit react-redux axios react-router-dom uuid
```

3. Start the dev server

```bash
npm run dev
```

Notes

- MSW is started automatically in development (see `src/main.tsx`).
- The mocked user is `test` / `test123`. Login returns a fake JWT stored in `localStorage` under `token`.
- Tasks are stored in `localStorage` under `mock-tasks` by the MSW handlers, so they persist across reloads.

Project structure (key files)

- `src/mocks/handlers.ts` — MSW handlers for auth and tasks
- `src/mocks/browser.ts` — MSW worker setup
- `src/store/*` — Redux store and typed hooks
- `src/features/*` — `authSlice` and `tasksSlice` with thunks
- `src/pages` — `Login` and `Dashboard` pages
- `src/components` — `Header`, `TaskForm`, `TaskList`

Deployment

- This is a frontend-only app and can be deployed to Vercel/Netlify. MSW is disabled by default in production builds, so you'd need a real backend for production or keep MSW worker active by adjusting the startup.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
