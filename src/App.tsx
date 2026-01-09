import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Logout from "./components/Logout";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuth ? (
    <>
      <Logout />
      <AddTask />
      <Tasks />
    </>
  ) : (
    <Login />
  );
}

export default App;
