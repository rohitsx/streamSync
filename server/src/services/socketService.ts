import { RedisClientType } from "redis";
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

            await this._client.createRedisRoom(roomId, publicKey)

        } catch (error) {
            error === 'Room already exists' ? this.getUser(roomId) :
                console.error(`Error creating room: ${error}`);
        }
    }

    joinRoom(roomId: string): void {
        try {
            if (!roomId) throw new Error("Invalid roomId")

            const room = SocketService.getRoom(roomId);
            if (!room) throw new Error("Invalid room");

            SocketService._users.set(this._username, this._socket.id);
            console.log(this._username, 'joining the room', roomId, SocketService._rooms);

            this._io.to(this._socket.id).emit('validRoom');
            this._io.to(roomId).emit('participantsUpdate', Array.from(room));
            this._socket.join(roomId);
        } catch (error) {
            this._io.to(this._socket.id).emit('invalidRoom')
            console.error(`Error joining room: ${error}`);
        }
    }

    getUser(roomId: string): void {
        try {
            if (!roomId) throw new Error("Invalid roomId");

            // redis
            const room = this._client.getRedisRoom(roomId);

            console.log(this._username, "getting user for", roomId, '\n');

            // const room = SocketService.getRoom(roomId);
            if (room) {
                this._io.to(this._socket.id).emit('participantsUpdate', room);
            }
            else throw new Error("Room not found");

        } catch (error) {
            console.error(`Error getting user: ${error}`, roomId);
        }
    }

    leaveRoom(roomId: string): void {
        try {
            if (!roomId) throw new Error("Invalid roomId");

            console.log(this._username, "leaving from", roomId, '\n');

            const room = SocketService.getRoom(roomId);
            if (room) {
                if (room.has(this._username)) {
                    this._socket.leave(this._username);
                    const checkroom = room.delete(this._username);
                    SocketService._users.delete(this._username)

                    checkroom && this._io.to(roomId).emit('participantsUpdate', Array.from(room));
                } else {
                    throw new Error("Not in room");
                }
            } else {
                throw new Error("Invalid room");
            }
        } catch (error) {
            console.error(`Error leaving room: ${error}`);
        }
    }

    closeRoom(roomId: string): void {
        try {
            if (!roomId) throw new Error("Invalid roomId");

            console.log(this._username, "user , closing room");

            const room = SocketService.getRoom(roomId);
            if (room) {
                SocketService._rooms.delete(roomId)
                SocketService._users.clear()
                SocketService._primeUsers.clear()
                this._io.to(roomId).emit('closeRoom')
            }

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