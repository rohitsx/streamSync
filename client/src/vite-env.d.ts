/// <reference types="vite/client" />


interface ImportMetaEnv {
  readonly VITE_HOST: string
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
