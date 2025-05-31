import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CreateUserHandle } from "../../connections";
const backendURL = import.meta.env.VITE_BACKEND_URL;
type FormValues = {
  name: string;
  email: string;
  password: string;
};

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await CreateUserHandle(data);
    setMsg(result.msg);

    if (result.redirectTo) {
      setTimeout(() => {
        navigate(result.redirectTo!);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-sky-100 via-white to-indigo-100">
      {/* Left registration form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 relative z-10">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl px-6 sm:px-8 py-8 sm:py-10 border border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 text-center">Welcome to QuickLink 👋</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Create your account below to get started.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Full Name"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="Email"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Password"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gray-950 hover:cursor-pointer hover:bg-gray-900 text-white py-3 rounded-xl font-semibold text-lg shadow-md transition-all"
            >
              Register
            </button>
          </form>

          {/* Status message */}
          {msg && (
            <p
              className={`text-center mt-4 ${
                msg.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {msg}
            </p>
          )}

          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <a href={`${backendURL}/user/login`} className="text-indigo-600 font-medium hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>

     {/* Right branding section */}
<div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-indigo-700 to-purple-700 text-white px-6 py-12 sm:p-12 ">
  <div className="text-center flex flex-col items-center justify-center h-full max-w-md space-y-4">
    <div className="text-4xl sm:text-5xl font-extrabold animate-fade-in-down">🚀 QuickLink</div>
    <h1 className="text-lg sm:text-2xl font-semibold">Crafted with ❤️ by Anupam</h1>
    <p className="text-sm sm:text-lg text-white/90 leading-relaxed">
      QuickLink simplifies your workflow by transforming long URLs into smart, shareable links.
      Enhance productivity and save time with efficient link management.
    </p>
    <p className="text-sm text-white/60 pt-4">© 2025 QuickLink. All rights reserved.</p>
  </div>
</div>

    </div>
  );
};

export default RegistrationForm;
