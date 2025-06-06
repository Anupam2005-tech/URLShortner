import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../src/redux/store.ts";
import AppEntry from "./AppEntry.tsx";



createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>

      <AppEntry />
    </BrowserRouter>
  </Provider>
);
