export const API_BASE =
  import.meta.env.VITE_ENV === "DEV"
    ? "http://localhost:3000"
    : "https://wn-mudir-backend.vercel.app";
