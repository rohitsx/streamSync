import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.db_connection_string || '';
const client = new MongoClient(connectionString);
let db: Db;

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('DB connected');
    db = client.db('streamSync');
  } catch (err) {
    console.log('MongoDB connection error:', err);
    throw err;
  }
};

export const getDb = () => db;