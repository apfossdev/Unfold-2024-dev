import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dotenv from "dotenv"

dotenv.config()

const agentUri = process.env.AGENT_DEPLOYED_URI || "http://localhost:5000"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/agent': {
        target: agentUri,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/agent/, '')
      }
    }
  }
})