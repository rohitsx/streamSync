import path from "path";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const manifest = defineManifest({
  version: "1.0.3",
  manifest_version: 3,
  name: "StreamSync",
  description:
    "StreamSync lets you integrate audio calls with YouTube Live chat",
  key: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjR/q927sYuzEtEK8FkEG
YUnHCdKY92dIYTCD6hHIXnblFHxSv2ArngoyH1nieE6bv3LRUkSN6usmTnHztKYN
OAHN7lqrKcrB6G++5sAf2NbkBMfWW7ZJmy0cIUt8rll//N/8mMUqJAPOHWM0zQLq
qCEa3RBrT6w3+lZ2i/71LzBo+giaoeRGM57Il1dV+0ufuLW3fBUNZWMT7lSulKV3
MyfgkF8OIUrpBVXxLuNKhGQVs6jyPIPVKnoFAf/X+bRgdFMXe35DmSfb2D89eXVF
s1AW8LyOCQlYGWEBTVXsflUoz83j3R0+KEl2IRngoSMEL70vRFozZjiKpxVZNF3V
EwIDAQAB
-----END PUBLIC KEY-----`,
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
  permissions: ["tabs", "identity", "cookies"],
  host_permissions: [
    "https://streamsync-server.devrohit.tech/*",
    "https://*.youtube.com/*",
  ],
  content_scripts: [
    {
      run_at: "document_end",
      matches: ["https://www.youtube.com/*"],
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
