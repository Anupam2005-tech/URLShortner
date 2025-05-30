import React,{useState} from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {loginuserHandle}from '../connections'
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string; 
};

const LoginForm: React.FC = () => {
  const [msg,setmsg]=useState('')
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async(data) => {
    const result=   await loginuserHandle(data); 
    setmsg(result.msg)
    if(result.redirectTo){
      setTimeout(()=>{
        navigate(result.redirectTo!)

      },1000)
    }
    else{
      console.log('error occured while login');
      
    }
      
 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
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
              } focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              placeholder="Password"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium text-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
          >
            Login
          </button>          
        </form>
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
  );
};

export default LoginForm;
