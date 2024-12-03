import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Chỉ định thư mục chứa các tệp build
  },
  // Nếu cần, bạn có thể cấu hình lại thư mục công khai (mặc định là 'public')
  publicDir: 'src/assets',
})
