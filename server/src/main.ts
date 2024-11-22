import { connectToDatabase } from "./config/database.ts";
import router from "./routes/index.ts";

const handler = async (req: Request): Promise<Response> => {
  try {
    return await router(req);
  } catch (error) {
    console.error("Request failed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

connectToDatabase()
  .then(() => {
    Deno.serve({
      port: 8000,
      handler,
    });
  })
  .catch((err) => console.error("Failed to start server:", err));
