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
  .then(async () => {
    // Read the key and cert files
    const key = await Deno.readTextFile("./https/streamSync+3-key.pem");
    const cert = await Deno.readTextFile("./https/streamSync+3.pem");

    Deno.serve({
      port: 8000,
      key: key,
      cert: cert,
      handler,
    });

    console.log("Server running on https://localhost:8000");
  })
  .catch((err) => console.error("Failed to start server:", err));
