import URLpage from "./components/URLpage/URLpage";
import RegistrationForm from "./components/authentication/register";
import LoginForm from "./components/authentication/login";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes/protectedRoutes";
import Dashboard from "./components/dashboard/dashboard";
import URLanalytics from "./components/URLpage/URLanalytics";
import UserUpdateForm from "./components/authentication/UserUpdateForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />

        <Route path="/url" element={<URLpage />} />
        {/* protected routes */}
        <Route
          path="/url/analytics"
          element={
            <ProtectedRoute>
              <URLanalytics />
            </ProtectedRoute>
          }
        />
         <Route
        path="/user/update"
        element={
          <ProtectedRoute>
            <UserUpdateForm />
          </ProtectedRoute>
        }
      />
      
      </Routes>
     
    </>
  );
}

export default App;
