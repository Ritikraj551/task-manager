import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/store";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    try {
      await dispatch(login({ username, password })).unwrap();
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-10 w-full max-w-md flex flex-col gap-6 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
          Login
        </h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-300"
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-300"
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors shadow-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
