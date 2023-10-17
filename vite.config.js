import { resolve } from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, "src")

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react()],
  build: {
    outDir: "./../../portfolio_backend/dist/",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        blogpost: resolve(root, "blogpost", "blogpost.html")
      }
    }
  },
})
