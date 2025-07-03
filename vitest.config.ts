import { defineConfig } from 'vitest/config';
import * as path from "path"
import * as dotenv from "dotenv";

dotenv.config({ path: '.env.test' })

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})