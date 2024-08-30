import { emit } from "process";
import { Socket, Server as io } from "socket.io";

export default class SocketService {
    constructor(
        private _socket: Socket,
        private _io: io,
        private _username: string = _socket.handshake.auth.username
    ) {
        console.log('SocketService constructor:', {
            socketId: this._socket.id,
            username: this._username,
        });
    };

    private static _rooms: Map<string, Set<string>> = new Map(); //replace this database in futured

    private static getRoom(roomId: string): Set<string> | undefined {
        if (!roomId) throw new Error("Invalid roomId");

        return SocketService._rooms.get(roomId);
    }

    createRoom(roomId: string): void {
        try {
            if (!roomId) throw new Error("Invalid roomId");

            if (this._socket) {
                const checkRoom = SocketService._rooms.has(roomId);
                console.log('checkroom', checkRoom);

                checkRoom ? this._socket.emit('joiningLastRoom') : SocketService._rooms.set(roomId, new Set());

                const room = SocketService.getRoom(roomId);
                room && this._io.to(this._socket.id).emit('participantsUpdate', Array.from(room));

                console.log(this._username, 'creating room', roomId, SocketService._rooms);
                this._socket.join(roomId);
            } else {
                throw new Error('socket not created')
            }
        } catch (error) {
            console.error(`Error creating room: ${error}`);
            this._socket.emit('tryAgian')
        }
    }

    joinRoom(roomId: string): void {
        try {
            if (!roomId) {
                console.log("wrong room code", roomId);
                throw new Error("Invalid roomId")
            }

            const room = SocketService.getRoom(roomId);
            if (room) room.has(roomId) ? this._socket.emit('joiningLastRoom') : room.add(this._username);
            else throw new Error("Invalid room");

            console.log(this._username, 'joining the room', roomId, SocketService._rooms);

            this._socket.emit('validRoom');
            this._io.to(roomId).emit('participantsUpdate', Array.from(room));
            this._socket.join(roomId);
        } catch (error) {
            this._socket.emit('invalidRoom');
            console.error(`Error joining room: ${error}`);
        }
    }

    getUser(roomId: string): void {
        try {
            if (!roomId) throw new Error("Invalid roomId");

            console.log(this._username, "getting user for", roomId);

            const room = SocketService.getRoom(roomId);
            if (room) this._io.to(this._socket.id).emit('participantsUpdate', Array.from(room));
            else throw new Error("Room not found");

        } catch (error) {
            console.error(`Error getting user: ${error}`);
            this._socket.emit('errorGettingUser', error);
        }
    }

    leaveRoom(roomId: string): void {
        try {
            if (!roomId) throw new Error("Invalid roomId");

            console.log(this._username, "leaving from", roomId);

            const room = SocketService.getRoom(roomId);
            if (room) {
                console.log(room);

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