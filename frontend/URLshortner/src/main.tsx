import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>

      <App />

  </BrowserRouter>
);
