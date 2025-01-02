import {  RedisClientType } from "redis";
import getRedis from "../../config/redis.ts";
import { RedisRoomMethodProp } from "../../types/types.ts";
import { dbRoomUserProp } from "../../types/user.ts";

export default class RedisRoom {
  private client: RedisClientType = getRedis();

  async createRoom({ streamId, username }: RedisRoomMethodProp) {
    try {
      await this.client.hSet(`room:${streamId}`, "owner", username);
      console.log(`Room created with streamId: ${streamId}`);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  }

  async deleteRoom(streamId: string) {
    try {
      await this.client.del(`room:${streamId}`);
      console.log(`Room with streamId: ${streamId} deleted`);
      return await this.client.del(`room:${streamId}:users`);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  }

  async addUserToRoom({ streamId, username }: RedisRoomMethodProp) {
    try {
      const exists = await this.getRoomUser({ streamId, username });

      if (exists) {
        console.log(`${username} already in room`);
        return false;
      }
      await this.client.sAdd(`room:${streamId}:users`, username);
      console.log(`${username} added to room with streamId: ${streamId}`);
      return true;
    } catch (error) {
      console.error("Error adding user to room:", error);
    }
  }

  async removeUserFromRoom({ streamId, username }: RedisRoomMethodProp) {
    try {
      console.log(`${username} removed from room with streamId: ${streamId}`);
      return await this.client.sRem(`room:${streamId}:users`, username);
    } catch (error) {
      console.error("Error removing user from room:", error);
    }
  }

  async getRoomUser({ streamId, username }: dbRoomUserProp) {
    try {
      return await this.client.sIsMember(
        `room:${streamId}:users`,
        username,
      );
    } catch (error) {
      console.error("Error fetching users from room:", error);
    }
  }

  async checkRoomExists(streamId: string) {
    try {
      const exists = await this.client.exists(`room:${streamId}`);
      return exists === 1;
    } catch (error) {
      console.error("Error checking if room exists:", error);
    }
  }
}
