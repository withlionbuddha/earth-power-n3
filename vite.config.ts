import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // N4's HTTPS certificate must be trusted by the Node process.
  const env = loadEnv(mode, process.cwd(), '')
  const target = env.N4_API_TARGET || 'https://localhost:8181'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target,
          changeOrigin: false,
          secure: true,
        },
      },
    },
  }
})
