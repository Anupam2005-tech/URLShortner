import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { CreateUserHandle } from "../connections";
import { useNavigate } from "react-router-dom";

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
    setMsg(result.msg); // Show backend message

    if (result.redirectTo) {
      setTimeout(() => {
        navigate(result.redirectTo!);
      }, 1000);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* name input */}
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}

            {/* email input */}
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
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}

            {/* password input */}
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
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            {/* submit button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium text-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
            >
              Register
            </button>
          </form>

          {/* Show backend message */}
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
    </>
  );
};

export default RegistrationForm;
