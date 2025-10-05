import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import path from "path"

export default defineConfig({
  plugins: [react(), tanstackRouter({ routesDirectory: "./src/app/routes" }), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["react-swipeable"],
  },
  build: {
    outDir: 'dist',
  },
})
