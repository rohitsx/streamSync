import path from "path";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";

const manifest = defineManifest({
  version: "1.0.0",
  manifest_version: 3,
  name: "StreamSync",
  description: "This is a Chrome extension built with React and TypeScript",
  action: {
    default_popup: "./index.html",
  },
  icons: {
    "128": "src/assets/icon128.png",
  },
  background: {
    service_worker: "script/background/bg.ts",
    type: "module",
  },
  permissions: ["tabs", "identity", "cookies", "scripting"],
  host_permissions: ["https://localhost:8000/api/*"],
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "./script/shared"),
    },
  },
  server: {
    headers: {
      "Content-Security-Policy":
        "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' http://localhost:* http://127.0.0.1:* https://accounts.google.com",
    },
  },
});
