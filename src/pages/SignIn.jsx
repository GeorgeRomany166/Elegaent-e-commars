import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import el from "../assets/el.png";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = () => {
    if (!username || !password) {
      setError("⚠️ Please enter both username and password.");
      return;
    }

    const loginData = {
      username,
      password,
      expiresInMins: 30,
    };

    console.log(loginData, "LOGINDATA");

    axios
      .post("https://dummyjson.com/auth/login", loginData)
      .then((r) => {
        setHidden(false);
        setError("");
        navigate("/"); // يروح للـ Home بعد نجاح تسجيل الدخول
      })
      .catch((e) => {
        console.log(e, "e");
        setError("❌ Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section (Image) */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto flex-shrink-0">
        <img
          src={el}
          alt="Chair"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <h1 className="absolute top-8 left-1/2 transform -translate-x-1/2 text-black text-4xl font-semibold z-10">
          Elegant.
        </h1>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-semibold mb-2 text-center md:text-left">
            Sign In
          </h2>
          <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
            Don't have an account yet?{" "}
            <Link to="/signup" className="text-green-600">
              Sign Up
            </Link>
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your username or email address"
              className="w-full border-b border-gray-300 py-2 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border-b border-gray-300 py-2 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-400 cursor-pointer select-none"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-gray-800 font-medium">
                Forgot password?
              </a>
            </div>

            {/* زر تسجيل الدخول */}
            <button
              type="button"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
              onClick={login}
            >
              Sign In
            </button>
          </form>

          {/* رسالة الخطأ */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* رسالة النجاح */}
          {!hidden && (
            <div className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 mt-4 text-center">
              SUCCESS
            </div>
          )}

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-800">
              Continue without sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
