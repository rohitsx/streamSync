import { RedisClientType } from "redis";
import getRedis from "../../config/redis.ts";
import { AddedAccessTokenProps } from "../../types/types.ts";

export default class RedisChase {
  private client: RedisClientType;
  constructor() {
    this.client = getRedis();
  }

  async addedAccessToken({ email, token, ms }: AddedAccessTokenProps) {
    const ex = ms - Date.now();
    return await this.client.set(email, token, {
      PX: ex,
    });
  }
}
