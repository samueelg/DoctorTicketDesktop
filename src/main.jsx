import React from "react";
import ReactDOM from "react-dom/client";
import './global.css';

import App from "./routes/AppRoutes";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";

import "./global.css"
import { ToastProvider } from "./components/context/ToastContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PrimeReactProvider value={{ pt: Tailwind }}>
      <ToastProvider>
      <App />
       </ToastProvider>
    </PrimeReactProvider>
);
