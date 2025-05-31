import URLpage from "./components/URLpage/URLpage";
import RegistrationForm from "./components/authentication/register";
import LoginForm from "./components/authentication/login";
import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProtectedRoute from "../protectedRoutes/protectedRoute";
import Dashboard from "./components/dashboard/dashboard";
import URLanalytics from "./components/URLpage/URLanalytics";

function App() {
  // const { isAuthenticated } = useSelector((state: any) => state.root);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/user/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        {/* protected route */}
        <Route
          path="/url"
          element={
            // <ProtectedRoute isAuthenticated={isAuthenticated}>
              <URLpage />
            /* </ProtectedRoute> */
          }
        />
        <Route path="/url/analytics" element={<URLanalytics/>} />
      </Routes>
    </>
  );
}

export default App;
