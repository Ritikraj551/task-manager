import React, { useState } from "react";
import Logout from "./Logout";

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark", !isDark);
  };

  return (
    <header
      className={`bg-white dark:bg-gray-900 shadow-md p-6 rounded-b-xl flex flex-col md:flex-row items-center justify-between mx-auto mb-6 transition-colors duration-300`}
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center md:text-left">
        Task Manager
      </h1>

      <div className="flex items-center gap-4 mt-4 md:mt-0">
        <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {isDark ? "Dark Mode" : "Light Mode"}
        </button>

        <Logout />
      </div>
    </header>
  );
};

export default Header;
