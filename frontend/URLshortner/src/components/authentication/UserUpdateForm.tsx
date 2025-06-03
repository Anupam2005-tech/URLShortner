import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { checkLoadingIn, checkLoadingOut } from "../../redux/slice/usersSlice/usersSlice";
import QuickLinkLoader from "../utils/loader";
import { updateUserHandle } from "../../connections";

type FormValues = {
  newName?: string;
  newEmail?: string;
  newPassword?: string;
};

const UserUpdateForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const isloading = useAppSelector((state) => state.loading.isLoadingIn);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    dispatch(checkLoadingIn())
    try{
      const payload={
        newName:data.newName,
        newEmail:data.newEmail,
        newPassword:data.newPassword

      }
      const result=await updateUserHandle(payload)
      setMsg(result.msg)
      navigate('/')

    }finally{
      dispatch(checkLoadingOut())
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-sky-100 via-white to-indigo-100">
      {/* Left: Update Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-white/80 backdrop-blur-md">
        {isloading ? (
          <div className="w-full h-full flex items-center justify-center">
            <QuickLinkLoader />
          </div>
        ) : (
          <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 text-center">
              Update Profile 🛠️
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* newName */}
              <div>
                <input
                  type="text"
                  {...register("newName")}
                  placeholder="Full Name (optional)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm"
                />
              </div>

              {/* newEmail */}
              <div>
                <input
                  type="newEmail"
                  {...register("newEmail", {
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid Email",
                    },
                  })}
                  placeholder="Email (optional)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm"
                />
                {errors.newEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.newEmail.message}</p>
                )}
              </div>

              {/* newPassword */}
              <div>
                <input
                  type="newPassword"
                  {...register("newPassword", {
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="New Password (optional)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gray-900 hover:bg-black cursor-pointer text-white py-3 rounded-xl font-semibold shadow-md transition-all"
              >
                Save Changes
              </button>
            </form>

            {/* Status Message */}
            {msg && (
              <p
                className={`text-center mt-4 ${
                  msg.toLowerCase().includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {msg}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right: Branding */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-indigo-700 to-purple-700 text-white px-6 py-12 sm:p-12">
        <div className="text-center max-w-md space-y-4">
          <div className="text-4xl sm:text-5xl font-extrabold">🛠️ QuickLink</div>
          <h1 className="text-xl sm:text-2xl font-semibold">
            Update with Confidence
          </h1>
          <p className="text-sm sm:text-lg text-white/90 leading-relaxed">
            Keep your profile fresh and secure. QuickLink makes it easy to manage your identity in seconds.
          </p>
          <p className="text-sm text-white/60 pt-4">
          &copy; {new Date().getFullYear()}{" "} QuickLink. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateForm;
