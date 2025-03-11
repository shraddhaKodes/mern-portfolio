import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173, // Runs portfolio on port 5173
    open: true, // Opens automatically in the browser
  },
  define: {
    "import.meta.env.VITE_API_BASE_URL": JSON.stringify("http://localhost:4000/api/v1"),
  },
});
