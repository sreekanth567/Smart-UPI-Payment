import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  /* -------- VALIDATION -------- */
  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username =
        "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9 ]+$/.test(username)) {
      newErrors.username =
        "Only letters and numbers allowed";
    }

    return newErrors;
  };

  const handleLogin = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    login(username);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen phonepe-bg">
      <div className="card w-96">
        <h2 className="text-xl font-bold mb-5">
          Login to PayFlow
        </h2>

        {/* INPUT */}
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors({});
          }}
          placeholder="Enter Username"
          className={`w-full border p-3 rounded ${
            errors.username
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />

        {/* ERROR MESSAGE BELOW FIELD */}
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">
            {errors.username}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="btn-pay mt-5"
        >
          Login
        </button>
      </div>
    </div>
  );
}