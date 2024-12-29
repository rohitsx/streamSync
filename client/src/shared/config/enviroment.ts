type envProp = Record<"clientId" | "host" | "api" | "wsApi", string>;

const env: envProp = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  host: import.meta.env.VITE_HOST,
  api: import.meta.env.VITE_API,
  wsApi: import.meta.env.VITE_WS,
};

export default env;
