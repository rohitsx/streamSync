import "jsr:@std/dotenv/load";

export const PORT = Deno.env.get("PORT");
export const MONGO_URL = Deno.env.get("MONGO_URL");
export const JWT_SECRET = Deno.env.get("JWT_SECRET");
export const WEBSOCKET_URL = Deno.env.get("WEBSOCKET_URL");

