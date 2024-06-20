import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import dotenv from 'dotenv'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
  
  }
  ,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
