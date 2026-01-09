import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/store";

interface LogoutProps {
  className?: string;
}

const Logout: React.FC<LogoutProps> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <button
      onClick={() => dispatch(logout())}
      className={`bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-colors ${className}`}
    >
      Logout
    </button>
  );
};

export default Logout;
