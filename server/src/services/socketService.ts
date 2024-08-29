import { Socket, Server as io } from "socket.io";

export default class SocketService {
    private static _rooms: Map<string, Set<string>> = new Map(); //replace this database in future

    private _socket: Socket;
    private _io: io;
    protected _username: any;

    constructor(socket: Socket, io: io) {
        this._socket = socket;
        this._io = io;
        this._username = socket.handshake.auth.username;
    }

    private getRoom(roomId: string): Set<string> | undefined {
        if (!roomId) {
            throw new Error("Invalid roomId");
        }
        return SocketService._rooms.get(roomId);
    }

    createRoom(roomId: string): void {
        try {
            if (!roomId) {
                throw new Error("Invalid roomId");
            }

            console.log(this._username, 'creating room', roomId);

            const room = this.getRoom(roomId);
            room ? this._socket.emit('joiningLastRoom') : SocketService._rooms.set(roomId, new Set());

            this._socket.join(roomId);
        } catch (error) {
            console.error(`Error creating room: ${error}`);
        }
    }

    joinRoom(roomId: string): void {
        try {
            if (!roomId) {
                throw new Error("Invalid roomId");
            }

            console.log(this._username, 'joining the room', roomId);

            const room = this.getRoom(roomId);
            if (room) {
                room.has(roomId) ? this._socket.emit('joiningLastRoom') : room.add(roomId);

            } else {
                throw new Error("Invalid room");
            }

            this._socket.emit('validRoom');
            this._socket.join(roomId);
            this._io.to(roomId).emit('participantsUpdate', Array.from(room));
        } catch (error) {
            console.error(`Error joining room: ${error}`);
            this._socket.emit('errorJoiningRoom', error);
        }
    }

    getUser(roomId: string): void {
        try {
            if (!roomId) {
                throw new Error("Invalid roomId");
            }

            console.log(this._username, "getting user for", roomId);

            const room = this.getRoom(roomId);
            if (room) this._io.to(roomId).emit('participantsUpdate', Array.from(room));
            else throw new Error("Room not found");

        } catch (error) {
            console.error(`Error getting user: ${error}`);
            this._socket.emit('errorGettingUser', error);
        }
    }

    leaveRoom(roomId: string): void {
        try {
            if (!roomId) {
                throw new Error("Invalid roomId");
            }

            console.log(this._username, "leaving from", roomId);

            const room = this.getRoom(roomId);
            if (room) {
                if (room.has(roomId)) {
                    this._socket.leave(roomId);
                    room.delete(roomId);
                    this._io.to(roomId).emit('participantsUpdate', Array.from(room));
                } else {
                    throw new Error("Not in room");
                }
            } else {
                throw new Error("Invalid room");
            }
        } catch (error) {
            console.error(`Error leaving room: ${error}`);
            this._socket.emit('errorLeavingRoom', error);
        }
    }
}