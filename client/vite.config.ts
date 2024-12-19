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
    service_worker: "src/components/script/background/bg.ts",
    type: "module",
  },
  permissions: ["tabs", "identity", "cookies", "scripting"],
  host_permissions: ["https://localhost:8000/api/*"],
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/components/script/content_script/Content.tsx"],
    },
  ],
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@comp": path.resolve(__dirname, "./src/components"),
      "@shared": path.resolve(__dirname, "./src/components/shared"),
    },
  },
  server: {
    headers: {
      "Content-Security-Policy":
        "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' http://localhost:* http://127.0.0.1:* https://accounts.google.com",
    },
  },
});
