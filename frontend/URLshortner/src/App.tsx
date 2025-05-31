import URLpage from "./components/URLpage/URLpage";
import RegistrationForm from "./components/authentication/register";
import LoginForm from "./components/authentication/login";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard/dashboard";
import URLanalytics from "./components/URLpage/URLanalytics";

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/user/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />

        <Route
          path="/url"
          element={

              <URLpage />

          }
        />
        <Route path="/url/analytics" element={<URLanalytics/>} />
      </Routes>
    </>
  );
}

export default App;
