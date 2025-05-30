import React,{useState} from "react";
import { useForm,type SubmitHandler } from "react-hook-form";
import { URLshortnerHandle } from "../connections";
import { useNavigate } from "react-router-dom";

interface FormValues {
  redirectURL: string;
};

const URLpage: React.FC = () => {
  const navigate=useNavigate()
  const [shortId,setshortId]=useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> =async (data) => {
    try{
     const result=await URLshortnerHandle(data.redirectURL)
     setshortId(result.shortId)
    }catch(err:any){
     if(err.response.status===401){
      navigate('/user/login')
     }
    }
  };

  return (
    <div className="bg-white w-screen h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-gray-100 rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          URL Shortener
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="url"
            {...register("redirectURL", {
              required: "URL is required",
             
            })}
            placeholder="Enter your URL"
            className={`w-full px-5 py-4 rounded-xl border ${
              errors.redirectURL ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-4 focus:ring-blue-300 transition shadow-sm text-gray-700 placeholder-gray-400`}
          />
          {errors.redirectURL && (
            <p className="text-red-500 text-sm mt-1">
              {errors.redirectURL.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 hover:cursor-pointer rounded-xl font-medium text-lg hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
          >
            Shorten URL
          </button>
        </form>
        {shortId && (
  <p className="text-center mt-4 text-green-600 font-semibold">
    Short URL:{" "}
    <a
      href={`http://localhost:8000/${shortId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="underline text-blue-700"
    >
      http://localhost:8000/url/{shortId}
    </a>
  </p>
)}


      </div>
    </div>
  );
};

export default URLpage;
