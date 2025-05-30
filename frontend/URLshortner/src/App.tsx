import {useState} from "react";
import URLpage from "./URLpage/URLpage";
import RegistrationForm from "./authentication/register";
import LoginForm from "./authentication/login";
import { Routes,Route,Navigate } from "react-router-dom";

function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/user/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/url" element={<URLpage />} />
      </Routes>
    </>
  );
}

export default App;
