import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    __COMMIT_SHA__: JSON.stringify((process.env.COMMIT_REF ?? 'dev').slice(0, 7)),
    __BUILD_CONTEXT__: JSON.stringify(process.env.CONTEXT ?? 'local'),
  },
})
