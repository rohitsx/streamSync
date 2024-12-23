import path from "path";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const manifest = defineManifest({
  version: "1.0.0",
  manifest_version: 3,
  name: "StreamSync",
  description: "This is a Chrome extension built with React and TypeScript",
  action: {
    default_popup: "index.html",
  },
  icons: {
    "128": "src/shared/assets/icon128.png",
  },
  background: {
    service_worker: "src/background/bg.ts",
    type: "module",
  },
  permissions: [
    "tabs",
    "identity",
    "cookies",
    "scripting",
    "activeTab",
    "webRequest",
  ],
  host_permissions: ["https://localhost:8000/api/*", "https://*.youtube.com/*"],
  content_scripts: [
    {
      run_at: "document_end",
      matches: ["https://blank.org/*"],
      js: ["src/content_script/ContentMain.tsx"],
    },
  ],
});

export default defineConfig({
  plugins: [react(), crx({ manifest }), nodePolyfills()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/shared"),
      "@popup": path.resolve(__dirname, "./src/popup"),
      "@background": path.resolve(__dirname, "./src/background"),
      "@content": path.resolve(__dirname, "./src/content"),
    },
  },
  server: {
    headers: {
      "Content-Security-Policy":
        "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' http://localhost:* http://127.0.0.1:* https://accounts.google.com",
    },
  },
});
