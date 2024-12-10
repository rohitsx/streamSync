import { RedisClientType } from "redis";
import getRedis from "../../config/redis.ts";
import { AddedAccessTokenProps } from "../../types/types.ts";

export default class RedisChase {
  private client: RedisClientType;
  constructor() {
    this.client = getRedis();
  }

  async addedAccessToken({ id, token, ms }: AddedAccessTokenProps) {
    try {
      const ex = ms - Date.now();
      return await this.client.set(id, token, {
        PX: ex,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAccessToken(id: string) {
    return await this.client.get(id);
  }

}
