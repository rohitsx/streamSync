import { REDIS_URL } from "./environment.ts";
import { createClient, RedisClientType } from "redis";

let redis: RedisClientType;

export async function connectToRedis() {
  try {
    if (!REDIS_URL) throw new Error("redis not configured");
    
    redis = createClient({ url: REDIS_URL });
    
    await redis.connect();
    console.log("redis connected");
  } catch (err) {
    console.log("Redis connection error:", err);
  }
}

const getRedis = () => redis;
export default getRedis;
