import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider Children={<App/>} >
    </AuthProvider>
  </StrictMode>
);
