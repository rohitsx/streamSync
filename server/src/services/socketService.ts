import { Socket, Server as io } from "socket.io";
import redisService from "./redisService";
import { RootNodesUnavailableError } from "redis";
import { findSocketIdByUsername } from "./authService";

export default class SocketService {
    constructor(
        private _socket: Socket,
        private _io: io,
        private _username: string = _socket.handshake.auth.username,
        private _client = new redisService()
    ) { };

    async createRoom(roomId: string, publicKey: string): Promise<void> {
        try {
            if (!roomId) throw new Error("Invalid roomId");

            await this._client.createRedisRoom(roomId, publicKey, this._socket);
            await this.getUser(roomId);
            console.log('create the room');
            this._socket.join(roomId)

        } catch (error) {
            console.error(`Error creating room: ${error}`);
        }
    }

    async checkRoom(roomId: string): Promise<void> {
        try {
            if (!roomId) throw new Error("Invalid roomId");

            await this._client.checkRoom(roomId)
            this._io.to(this._socket.id).emit('validRoom');
        } catch (error: any) {
            error.message === 'invalidRoom' && this._io.to(this._socket.id).emit('invalidRoom')

        }
    }

    async joinRoom(roomId: string): Promise<void> {
        try {
            if (!roomId) throw new Error("Invalid roomId");

            //redis
            await this._client.joinRedisRoom(roomId, this._username, this._socket)

            const room = await this.getUser(roomId)
            console.log(this._username, 'joining the room', roomId);

            this._io.to(roomId).emit('participantsUpdate', room);
            console.log('room on joining', roomId, this._username);
            this._socket.join(this._socket.id);
        } catch (error: any) {
            if (error.message === 'alredy in room') {
                const room = await this.getUser(roomId)
                this._socket.join(roomId);
            }
            error.message === 'invalidRoom' && this._io.to(this._socket.id).emit('invalidRoom')
            console.error(`Error joining room: ${error} ${roomId}`);
        }
    }

    async getUser(roomId: string): Promise<{ score: number, value: string }[] | undefined> {
        try {
            if (!roomId) throw new Error("Invalid roomId")

            const room = await this._client.getRedisRoom(roomId);
            console.log('resived users from socket',room)
            this._io.to(this._socket.id).emit('participantsUpdate', room)
            return room

        } catch (error: any) {
            error.message === 'stream endeded' ? this._socket.emit('streamEnded') :
                console.error(`Error getting user: ${error}`, roomId);
        }
    }

    async leaveRoom(roomId: string): Promise<void> {
        try {
            if (!roomId) throw new Error("Invalid roomId");

            console.log(this._username, "leaving from", roomId, '\n');

            await this._client.leaveRoom(roomId, this._username);

            const room = await this._client.getRedisRoom(roomId);            

            this._io.to(roomId).emit('participantsUpdate', room);
        } catch (error) {
            console.error(`Error leaving room: ${error}`);
        }
    }

    async closeRoom(roomId: string): Promise<void> {
        try {
            if (!roomId) throw new Error("Invalid roomId");

            this._io.to(roomId).emit('closeRoom');

            await this._client.closeRoom(roomId, this._socket.id);

            console.log('Successfully closed room:', roomId);
        } catch (error) {
            console.error('Error closing room:', error);
            // Consider re-throwing the error or handling it appropriately
        }
    }

    async getSocketId({ username, publickey }: { username: string, publickey: string }) {
        try {
            console.log(username, 'asking socketId and username for', this._username, '\n');


            const strangerSocket = await findSocketIdByUsername(username)
            console.log(strangerSocket);

            if (strangerSocket) {
                this._io.to(this._socket.id).emit('getSocketId', { SocketId: strangerSocket, username: username });
                this._io.to(strangerSocket).emit('getSocketId', { socketId: this._socket.id, username: this._username, hostPublicKey: publickey })
                this._io.to(strangerSocket).emit('hostPublicId', publickey)
            }
        } catch (err) {
            console.error('Error getting socket id', err);
        }
    }

    async primeUser(data: {
        message: string,
        soalQuantity: number,
        roomId: string,
    }): Promise<void> {
        try {
            await this._client.primeUser(data, this._username);

            const room = await this.getUser(data.roomId);

            this._io.to(data.roomId).emit('participantsUpdate', room);

        } catch (err) {
            console.error('Error sending Soal', err);
        }
    }

    async removePrimeUser(roomId: string) {
        await this._client.removePrimeUser(roomId, this._username);

        const room = await this.getUser(roomId);
        this._io.to(roomId).emit('participantsUpdate', room);
    }
}