import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="phonepe-bg text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">PayFlow</h1>

      <div className="space-x-4">
        <Link to="/dashboard">Home</Link>
        <Link to="/send">Pay</Link>
        <Link to="/history">History</Link>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-white text-purple-700 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}