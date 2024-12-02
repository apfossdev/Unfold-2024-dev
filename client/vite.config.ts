import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

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
        target: process.env.AGENT_DEPLOYED_URI || 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/agent/, ''),
      },
      '/blockberry': {
        target: 'https://api.blockberry.one',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blockberry/, ''),
      },
    },
  },
})