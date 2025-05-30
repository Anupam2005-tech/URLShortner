import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginuserHandle } from '../../connections';
import { useNavigate } from "react-router-dom";

const frontendURL = import.meta.env.VITE_FRONTEND_URL;

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [msg, setmsg] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const result = await loginuserHandle(data);
    setmsg(result.msg);
    if (result.redirectTo) {
      setTimeout(() => {
        navigate(result.redirectTo!);
      }, 1000);
    } else {
      console.log("Error occurred while login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left branding section */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-700 to-blue-500 text-white flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="text-6xl font-bold mb-6">✳️</div>
        <h1 className="text-4xl font-extrabold mb-3">Hello QuickLink! 👋</h1>
        <p className="text-lg text-center max-w-md">
          Skip repetitive and manual link sharing. Get highly productive through automation and save tons of time!
        </p>
        <p className="absolute bottom-6 text-sm text-white/70">© 2025 QuickLink. All rights reserved.</p>
      </div>

      {/* Right login form section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome Back!</h2>
          <p className="text-sm text-gray-600 mb-6">
            Don’t have an account? <a href={`${frontendURL}/register`} className="text-blue-600 font-medium hover:underline">Create a new account now</a>, it’s FREE! Takes less than a minute.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                } focus:outline-none focus:ring-2 focus:ring-blue-300`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-300`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-medium text-lg hover:cursor-pointer hover:bg-gray-900 transition-shadow shadow-md hover:shadow-lg"
            >
              Login Now
            </button>

            {/* Forgot password */}
            <p className="text-sm text-center mt-2">
              Forget password? <a href="#" className="text-blue-600 hover:underline">Click here</a>
            </p>
          </form>

          {/* Status message */}
          {msg && (
            <p
              className={`text-center mt-4 ${
                msg.includes("success") ? "text-green-600" : "text-red-600"
              }`}
            >
              {msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
