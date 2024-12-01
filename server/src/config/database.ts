import { MongoClient, Db } from "mongo";
import { MONGO_URL } from "./environment.ts";

let db: Db;
async function connectToDatabase() {
  try {
    if (!MONGO_URL) throw new Error("MONGO_URL is not defined");

    const client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db("streamSync");
	console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
}

const getDb = () => db;

export { connectToDatabase, getDb };
