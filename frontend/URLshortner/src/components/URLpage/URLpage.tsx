import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { URLshortnerHandle } from "../../connections";
import { useNavigate } from "react-router-dom";
import copysrc from "../../assets/copy.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import QuickLinkLoader from "../utils/loader";
import { checkLoadingIn, checkLoadingOut } from "../../redux/slice/usersSlice/usersSlice";
import { checkLogIn } from "../../redux/slice/auth/authThunks";

interface FormValues {
  redirectURL: string;
}

const URLpage: React.FC = () => {
  const navigate = useNavigate();
  const [shortId, setShortId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.loading.isLoadingIn);
  const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
  const loginChecked = useAppSelector((state) => state.authentication.loginChecked);
  const name = useAppSelector((state) => state.authentication.user?.name || "User");

  useEffect(() => {
    if (!loginChecked) {
      dispatch(checkLogIn());
    }
  }, [dispatch, loginChecked]);

  useEffect(() => {
    if (loginChecked && !isLoggedIn) {
      navigate("/user/login");
    }
  }, [loginChecked, isLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!loginChecked) {
      setError("Please wait while we verify your login status.");
      return;
    }

    if (!isLoggedIn) {
      setError("You must be logged in to shorten URLs. Redirecting to login...");
      setTimeout(() => navigate("/user/login"), 1500);
      return;
    }

    dispatch(checkLoadingIn());
    setError(null);

    try {
      const result = await URLshortnerHandle(data.redirectURL, navigate);
      setShortId(result.shortId);
      reset();
    } catch (err: any) {
      console.error("URL shortening error:", err);

      let errorMessage = "An unexpected error occurred";

      if (err.code === "NETWORK_ERROR" || err.message?.includes("network")) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (err.status === 400) {
        errorMessage = "Invalid URL provided. Please check the URL format.";
      } else if (err.status === 401) {
        errorMessage = "You are not authorized. Please log in again.";
        navigate("/user/login");
      } else if (err.status === 429) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      } else if (err.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      dispatch(checkLoadingOut());
    }
  };

  const handleCopyClick = async () => {
    const textToCopy = `${shortId}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } else {
        copyToClipboardFallback(textToCopy);
      }
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      copyToClipboardFallback(textToCopy);
    }
  };

  const copyToClipboardFallback = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      textArea.setAttribute("readonly", "");
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      const successful = document.execCommand && document.execCommand("copy");
      document.body.removeChild(textArea);

      if (successful) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } else {
        throw new Error("Copy command failed");
      }
    } catch (fallbackErr) {
      console.error("Fallback copy failed:", fallbackErr);
      setError("Failed to copy to clipboard. Please copy the URL manually.");
      setTimeout(() => setError(null), 3000);
    }
  };

  if (!loginChecked) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-screen">
        <QuickLinkLoader />
      </div>
    );
  }

  return (
    <>
      {isLoggedIn && (
        <h1 className="absolute top-8 left-1/2 -translate-x-1/2 text-center text-7xl lg:text-8xl font-bold px-2 bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 text-transparent bg-clip-text">
          Welcome back {name}!
        </h1>
      )}

      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-200">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            🔗 URL Shortener
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                type="url"
                {...register("redirectURL", {
                  required: "URL is required",
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Please enter a valid URL starting with http:// or https://"
                  }
                })}
                placeholder="Paste your long URL here..."
                className={`w-full px-5 py-4 rounded-xl border ${
                  errors.redirectURL ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-800 placeholder-gray-400 bg-white shadow-sm`}
              />
              {errors.redirectURL && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.redirectURL.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !loginChecked}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold text-lg transition-shadow shadow-md hover:shadow-lg hover:cursor-pointer flex items-center justify-center"
            >
              {isLoading ? <QuickLinkLoader /> : "Shorten URL"}
            </button>
          </form>

          {shortId && (
            <div className="mt-6 bg-gray-200 rounded-2xl p-4 relative">
              <div className="flex items-center justify-between">
                <a
                  href={`${backendURL}/url/${shortId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-700 font-semibold underline hover:text-indigo-900 break-words flex-1 mr-4"
                >
                  {shortId}
                </a>
                <div className="flex items-center space-x-2">
                  {copySuccess && (
                    <span className="text-green-600 text-sm font-medium">Copied!</span>
                  )}
                  <img
                    src={copysrc}
                    alt="copy"
                    onClick={handleCopyClick}
                    className="w-5 h-5 hover:cursor-pointer hover:opacity-70 transition-opacity"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default URLpage;