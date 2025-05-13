import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/lib": path.resolve(__dirname, "src/lib"),
      "@/modules": path.resolve(__dirname, "src/modules"),
      "@/reducers": path.resolve(__dirname, "src/reducers"),
      "@/routes": path.resolve(__dirname, "src/routes"),
      "@/themes": path.resolve(__dirname, "src/themes"),
      "@/helpers": path.resolve(__dirname, "src/helpers"),
      "@/constants": path.resolve(__dirname, "src/constants"),
    }
  }
})
