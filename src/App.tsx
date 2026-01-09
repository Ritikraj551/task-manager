import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import Login from "./components/Login";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Logout from "./components/Logout";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="p-4">
      {isAuth ? (
        <>
          <Logout />
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
