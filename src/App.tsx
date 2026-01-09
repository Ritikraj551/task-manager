import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import Login from "./components/Login";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Header from "./components/Header";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="bg-gray-100 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {isAuth ? (
        <>
          <Header />

          {/* Main container */}
          <main className="max-w-4xl mx-auto px-4 md:px-0 space-y-6">
            <AddTask />
            <Tasks />
          </main>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen px-4">
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;
