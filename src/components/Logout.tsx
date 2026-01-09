import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/store";

const Logout = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <button
      onClick={() => dispatch(logout())}
      className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
    >
      Logout
    </button>
  );
};

export default Logout;
