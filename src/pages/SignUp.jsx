import React from "react";
import { Link, useNavigate } from "react-router-dom"; // استيراد useNavigate
import el from "../assets/el.png";

export default function SignUp() {
  const navigate = useNavigate(); // تعريف navigate

  const handleSubmit = (e) => {
    e.preventDefault(); // منع الفورم من إعادة التحميل
    // هنا ممكن تضيف أي كود تسجيل بيانات المستخدم
    navigate("/"); // بعد الضغط على Sign Up، يروح للـ Home
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
            Sign up
          </h2>
          <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
            Already have an account?{" "}
            <Link to="/signin" className="text-green-600">
              Sign in
            </Link>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border-b border-gray-300 py-2 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full border-b border-gray-300 py-2 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full border-b border-gray-300 py-2 focus:outline-none"
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full border-b border-gray-300 py-2 focus:outline-none"
              />
              <span className="absolute right-2 top-2 text-gray-400 cursor-pointer">
                👁️
              </span>
            </div>

            <div className="flex items-start text-sm text-gray-600">
              <input type="checkbox" className="mr-2 mt-1" />
              <span>
                I agree with <b>Privacy Policy</b> and <b>Terms of Use</b>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
