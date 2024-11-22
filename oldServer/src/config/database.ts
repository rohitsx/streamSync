import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = "mongodb://myuser:dummyPass@localhost:27017/streamSync?authSource=admin";

const client = new MongoClient(url);
let db: Db;

export const connectToDatabase = async () => {
  try {
    await client.connect();
    db = client.db("streamSync");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    throw err;
  }
};

export const getDb = () => db;
