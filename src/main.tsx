import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from './App'
import { AuthProvider } from "./AuthProvider.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
            <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
