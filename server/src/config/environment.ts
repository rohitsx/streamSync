import "jsr:@std/dotenv/load";

export const PORT = Deno.env.get("PORT");
export const DB_CONNECTION_STRING = Deno.env.get("MONGO_URL");
export const JWT_SECRET = Deno.env.get("JWT_SECRET");
export const WEBSOCKET_URL = Deno.env.get("WEBSOCKET_URL");
console.log("koki kokik koki ", PORT, DB_CONNECTION_STRING);

