import { Socket, Server as io } from "socket.io";
import redisService from "./redisService";

export default class SocketService {
    constructor(
        private _socket: Socket,
        private _io: io,
        private _username: string = _socket.handshake.auth.username,
        private _client = new redisService()
    ) { };

    private static _rooms: Map<string, Set<string>> = new Map(); //replace this database in futured
    private static _users: Map<string, string> = new Map();
    private static _primeUsers: Map<string, Map<string, {
        message: string,
        soalQuantity: number
    }>> = new Map();

    private static getRoom(roomId: string): Set<string> | undefined {
        if (!roomId) throw new Error("Invalid roomId");

        return SocketService._rooms.get(roomId);
    }

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
            console.error(`Error joining room: ${error} ${roomId}`);
        }
    }

    async getUser(roomId: string): Promise<{ score: number, value: string }[] | undefined> {
        try {
            if (!roomId) throw new Error("Invalid roomId")

            const room = await this._client.getRedisRoom(roomId);
            this._io.to(this._socket.id).emit('participantsUpdate', room)
            console.log(room)
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

            await this._client.closeRoom(roomId, this._socket.id);

            this._io.to(roomId).emit('closeRoom')

        } catch (error) {
            console.error('Error closing room', error);
        }
    }

    getSocketId({ username, publickey }: { username: string, publickey: string }) {
        try {
            console.log(username, 'asking socketId and username for', this._username, '\n');


            const strangerSocket = SocketService._users.get(username);
            if (strangerSocket) {
                this._io.to(this._socket.id).emit('getSocketId', { SocketId: strangerSocket, username: username });
                this._io.to(strangerSocket).emit('getSocketId', { socketId: this._socket.id, username: this._username, hostPublicKey: publickey })
                this._io.to(strangerSocket).emit('hostPublicId', publickey)
            }
        } catch (err) {
            console.error('Error getting socket id', err);
        }
    }

    soal(soalStr: {
        soal: {
            message: string,
            soalQuantity: number,
            roomId: string,
        }
    }): void {
        try {
            const { roomId, message, soalQuantity } = soalStr.soal;
            if (!roomId) throw new Error("Invalid roomId");

            const room = SocketService.getRoom(roomId);
            if (room) {
                if (room.has(this._username)) {
                    // Remove the user from the room
                    room.delete(this._username);

                    // Add the user to _primeUsers with roomId
                    if (!SocketService._primeUsers.has(roomId)) {
                        SocketService._primeUsers.set(roomId, new Map());
                    }
                    const roomPrimeUsers = SocketService._primeUsers.get(roomId);
                    if (roomPrimeUsers) {
                        roomPrimeUsers.set(this._username, {
                            message,
                            soalQuantity,
                        });
                    }

                    // Emit updates
                    this._io.to(roomId).emit('participantsUpdate', Array.from(room));
                    this._io.to(roomId).emit('primeUserUpdate', this.getPrimeUsersForRoom(roomId));
                } else {
                    throw new Error("User not found in the room");
                }
            } else {
                throw new Error("Invalid room");
            }
        } catch (err) {
            console.error('Error sending Soal', err);
        }
    }

    // Helper method to get prime users for a specific room
    private getPrimeUsersForRoom(roomId: string): object {
        const roomPrimeUsers = SocketService._primeUsers.get(roomId);
        if (roomPrimeUsers) {
            return Object.fromEntries(roomPrimeUsers);
        }
        return {};
    }
}