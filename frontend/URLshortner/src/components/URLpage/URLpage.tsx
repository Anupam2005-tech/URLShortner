import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { URLshortnerHandle } from "../../connections";
import { useNavigate } from "react-router-dom";
import copysrc from "../../assets/copy.svg";
import { useAppDispatch,useAppSelector } from "../../redux/hooks";
import QuickLinkLoader from "../utils/loader";
import { checkLoadingIn,checkLoadingOut } from "../../redux/slice/usersSlice/usersSlice";
import { userauthHandle } from "../../connections";
interface FormValues {
  redirectURL: string;
}

const URLpage: React.FC = () => {
  const navigate = useNavigate();
  const [shortId, setShortId] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const dispatch=useAppDispatch()
  const isloading=useAppSelector(state=>state.loading.isLoadingIn)
  const [name,setname]=useState('')

  async function getUserName(){
    try{
      const response=await userauthHandle()
     
      if( response.user?.name ){
        return response.user.name || 'User'
      }
      else{
        return response.msg || "Unauthorized";
      }
    }catch(err){
      return 'Network Error Occured'
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    dispatch(checkLoadingIn())
    try {
      const result = await URLshortnerHandle(data.redirectURL, navigate);
      setShortId(result.shortId);
    } catch (err: any) {
      return err;
    }
    finally{
      dispatch(checkLoadingOut())
    }
  };
useEffect(()=>{
  getUserName().then((res) => setname(res || "User"));

})
  return (
    <>
    {isloading?(
      <div className="flex items-center justify-center w-full h-full">
      <QuickLinkLoader />
    </div>
    ):(
      <><h1 className="absolute top-8 left-1/2 -translate-x-1/2 text-center text-3xl md:text-5xl lg:text-7xl font-bold text-gray-700 px-2">
      Welcome back {name} !
    </h1>
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">

            <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-200">
              <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
                🔗 URL Shortener
              </h1>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <input
                    type="url"
                    {...register("redirectURL", {
                      required: "URL is required",
                    })}
                    placeholder="Paste your long URL here..."
                    className={`w-full px-5 py-4 rounded-xl border ${errors.redirectURL ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-800 placeholder-gray-400 bg-white shadow-sm`} />
                  {errors.redirectURL && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.redirectURL.message}
                    </p>
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

                  <a
                    href={`${backendURL}/url/${shortId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-700 font-semibold underline hover:text-indigo-900 break-words"
                  >
                    {backendURL}/{shortId}
                  </a>
                  <img
                    src={copysrc}
                    alt="copy"
                    onClick={() => navigator.clipboard.writeText(`${backendURL}/url/${shortId}`)}
                    className="w-5 h-5 absolute right-2 hover:cursor-pointer" />
                </div>

              )}
            </div>
          </div></>
    )}
    </>
  );
};

export default URLpage;
