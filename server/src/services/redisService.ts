import RedisClient from "../config/redis";

export default class redisService {
    private _client = RedisClient.getInstance()

    async checkRoom(roomId: string) {
        const checkRoom = await this._client.hExists('rooms', roomId);
        return checkRoom
    }

    async createRedisRoom(roomId: string, hostPublicKey: string) {
        const checkRoom = await this.checkRoom(roomId);

        if (checkRoom) await this._client.hSet('roomId', roomId, hostPublicKey);
        else throw new Error(`Room ${roomId} already exists`);
    }

    async joinRedisRoom(roomId: string, username: string, soalQuantity: number = 0) {
        const checkRoom = await this.checkRoom(roomId);

        if (checkRoom) {
            await this._client.zAdd(roomId, { value: username, score: soalQuantity });
        }
    }

    async getRedisRoom(roomId: string): Promise<{ value: string; score: number }[]> {
        const checkRoom = await this.checkRoom(roomId);

        const room = await this._client.zRangeWithScores(roomId, -1, 0)
        return room
    }
}