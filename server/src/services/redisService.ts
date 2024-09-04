import { Socket } from "socket.io";
import { getDb } from "../config/database";
import RedisClient from "../config/redis";
import { updateSocketIdDb } from "./authService";

const db = getDb();
export default class redisService {
    private _client = RedisClient.getInstance()

    async createRedisRoom(roomId: string, publicKey: string, socket: Socket) {
        updateSocketIdDb(socket)
        const socketId = socket.id;
        await this._client.hSet('roomId', roomId, JSON.stringify({ publicKey, socketId }));
    }

    async checkRoom(roomId: string) {
        const checkRoom = await this._client.hExists('roomId', roomId)
        if (!checkRoom) throw new Error('invalidRoom')
    }

    async joinRedisRoom(roomId: string, username: string, socket: Socket) {
        updateSocketIdDb(socket)
        this.checkRoom(roomId)

        const checkUser = await this._client.zScore(roomId, username);
        console.log('check users is', checkUser)
        if (checkUser === 0) throw new Error('alredy in room');
        await this._client.zAdd(roomId, { score: 0, value: username });


    }

    async getRedisRoom(roomId: string): Promise<{ value: string; score: number }[]> {
        // const checkRoom = await this.checkRoom(roomId);

        const room = await this._client.zRangeWithScores(roomId, -1, 0)

        return room
    }

    async closeRoom(roomId: string, localSocketId: string): Promise<void> {
        const roomData: string | undefined = await this._client.hGet('roomId', roomId);
        if (roomData) {
            const { publicKey, socketId } = JSON.parse(roomData);
            if (localSocketId === socketId) {
                await this._client.hDel('roomId', roomId);
            } else {
                throw new Error('local SocketId not match');
            }
        } else {
            throw new Error('Room not found');
        }
    }

    async leaveRoom(roomId: string, username: string): Promise<void> {
        await this.checkRoom(roomId)

        const checkUser = await this._client.zScore(roomId, username);
        if (checkUser === 0) await this._client.zRem(roomId, username);
        else throw new Error('user not in room')

    }
}