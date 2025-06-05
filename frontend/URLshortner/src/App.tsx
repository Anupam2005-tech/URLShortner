import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes/protectedRoutes";
import PageSkeleton from "./components/utils/PageSkeleton"; 

// Lazy load all route-level components
const Dashboard = lazy(() => import("./components/dashboard/dashboard"));
const LoginForm = lazy(() => import("./components/authentication/login"));
const RegistrationForm = lazy(
  () => import("./components/authentication/register")
);
const URLpage = lazy(() => import("./components/URLpage/URLpage"));
const URLanalytics = lazy(() => import("./components/URLpage/URLanalytics"));
const UserUpdateForm = lazy(
  () => import("./components/authentication/UserUpdateForm")
);

function App() {
  return (

    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />

        <Route path="/url" element={<URLpage />} />

        {/* Protected routes wrapped with ProtectedRoute component */}
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
    </Suspense>
  );
}

export default App;
