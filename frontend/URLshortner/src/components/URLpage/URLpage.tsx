import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { URLshortnerHandle } from "../../connections";
import { useNavigate } from "react-router-dom";
import copysrc from '../../assets/copy.svg'
interface FormValues {
  redirectURL: string;
}

const URLpage: React.FC = () => {
  const navigate = useNavigate();
  const [shortId, setShortId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const result = await URLshortnerHandle(data.redirectURL, navigate);
      setShortId(result.shortId);
    } catch (err: any) {
      return err;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">🔗 URL Shortener</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="url"
              {...register("redirectURL", {
                required: "URL is required",
              })}
              placeholder="Paste your long URL here..."
              className={`w-full px-5 py-4 rounded-xl border ${
                errors.redirectURL ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-800 placeholder-gray-400 bg-white shadow-sm`}
            />
            {errors.redirectURL && (
              <p className="text-red-500 text-sm mt-1">{errors.redirectURL.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-lg transition-shadow shadow-md hover:shadow-lg hover:cursor-pointer "
          >
            Shorten URL
          </button>
        </form>

        {shortId && (
  <div className="mt-6 bg-gray-200 rounded-2xl p-1.5 flex items-center relative space-x-2">
    <p className="text-green-700 font-medium">Shortened URL:</p>
    <a
      href={`http://localhost:8000/url/${shortId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-700 font-semibold underline hover:text-indigo-900 break-words"
    >
      http://localhost:8000/url/{shortId}
    </a>
    <img
      src={copysrc}
      alt="copy"
      onClick={() =>
        navigator.clipboard
          .writeText(`http://localhost:8000/url/${shortId}`)
      }
      className="w-5 h-5 absolute right-2 hover:cursor-pointer"
    />
  </div>
)}

      </div>
    </div>
  );
};

export default URLpage;
