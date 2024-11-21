import { connectToDatabase } from "./config/database.ts";

connectToDatabase().then(() => {
  Deno.serve((req) => {
	  console.log("working")
	  new Response("Hello, World!");
  });
});
