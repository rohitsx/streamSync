import { MongoClient, Database } from "jsr:@db/mongo";
import { DB_CONNECTION_STRING } from "./environment.ts";

const client = new MongoClient();
let db: Database;

export const connectToDatabase = async () => {
  if (!DB_CONNECTION_STRING) return;
  try {
    await client.connect(DB_CONNECTION_STRING);
    db = client.database("streamSync");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    throw err;
  }
};

export const getDb = () => db;
