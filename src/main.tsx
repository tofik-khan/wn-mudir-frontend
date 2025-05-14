import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from './App'
import { AuthProvider } from "./AuthProvider.tsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme/mainTheme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LicenseInfo } from "@mui/x-license";

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_X_PRO_LICENSE);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
