import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // LAN(로컬 네트워크)에서 접속 가능하도록 설정 (예: 모바일 기기에서 접속 테스트 시 필요)
    port: 5173, // Vite 개발 서버 포트
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
