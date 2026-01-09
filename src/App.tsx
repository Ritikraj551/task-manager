import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import Login from "./components/Login";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Header from "./components/Header";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="bg-gray-400 min-h-screen">
      {isAuth ? (
        <>
          <Header/>
          <AddTask />
          <Tasks />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
