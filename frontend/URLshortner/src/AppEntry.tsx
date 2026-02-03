import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { checkLogIn } from "./redux/slice/auth/authThunks";
import App from "./App";
import QuickLinkLoader from "./components/utils/loader";

function AppEntry() {
  const dispatch = useAppDispatch();
  const loginChecked = useAppSelector((state) => state.authentication.loginChecked);
  const error = useAppSelector((state) => state.authentication.error);

  useEffect(() => {
    dispatch(checkLogIn());
  }, [dispatch]);

  if (!loginChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
        <QuickLinkLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Connection Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => dispatch(checkLogIn())}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-lg transition-shadow shadow-md hover:shadow-lg"
          >
            Retry Connection
          </button>
          <p className="text-sm text-gray-500 mt-4">
            If the problem persists, the backend server may be unavailable.
          </p>
        </div>
      </div>
    );
  }

  return <App />;
}

export default AppEntry;