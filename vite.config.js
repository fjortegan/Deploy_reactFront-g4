import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  cors:{
    server: {
      proxy: {
        '/login': {
          target: 'https://request-flaskapi-qx9g.onrender.com',
          changeOrigin: true,
          secure: false,
        },
        '/refresh': {
          target: 'https://request-flaskapi-qx9g.onrender.com',
          changeOrigin: true,
          secure: false,
        },
        '/api': {
          target: 'https://request-flaskapi-qx9g.onrender.com',
          changeOrigin: true,
          secure: false,
        },
      },
    },

  }

});
