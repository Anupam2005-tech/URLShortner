import {useState} from "react";
import URLpage from "./URLpage/URLpage";
import RegistrationForm from "./authentication/register";
import LoginForm from "./authentication/login";

function App() {

  return (
    <>
    <URLpage/>
    <RegistrationForm/>
    <LoginForm/>
    </>
  );
}

export default App;
