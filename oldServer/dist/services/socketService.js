"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redisService_1 = __importDefault(require("./redisService"));
const authService_1 = require("./authService");
class SocketService {
    constructor(_socket, _io, _username = _socket.handshake.auth.username, _client = new redisService_1.default()) {
        this._socket = _socket;
        this._io = _io;
        this._username = _username;
        this._client = _client;
    }
    ;
    createRoom(roomId, publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!roomId)
                    throw new Error("Invalid roomId");
                yield this._client.createRedisRoom(roomId, publicKey, this._socket);
                yield this.getUser(roomId);
                console.log('create the room');
                this._socket.join(roomId);
            }
            catch (error) {
                console.error(`Error creating room: ${error}`);
            }
        });
    }
    checkRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!roomId)
                    throw new Error("Invalid roomId");
                yield this._client.checkRoom(roomId);
                console.log('connecte to room ', roomId, this._io.sockets.adapter.rooms.get(roomId));
                this._io.to(this._socket.id).emit('validRoom');
            }
            catch (error) {
                error.message === 'invalidRoom' && this._io.to(this._socket.id).emit('invalidRoom');
            }
        });
    }
    joinRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!roomId)
                    throw new Error("Invalid roomId");
                //redis
                yield this._client.joinRedisRoom(roomId, this._username, this._socket);
                const room = yield this.getUser(roomId);
                console.log(this._username, 'joining the room', roomId);
                this._io.to(roomId).emit('participantsUpdate', room);
                console.log('room on joining', roomId, this._username);
                this._socket.join(roomId);
                console.log('connecte to room ', roomId, this._io.sockets.adapter.rooms.get(roomId));
            }
            catch (error) {
                if (error.message === 'alredy in room') {
                    const room = yield this.getUser(roomId);
                    this._socket.join(roomId);
                }
                error.message === 'invalidRoom' && this._io.to(this._socket.id).emit('invalidRoom');
                console.error(`Error joining room: ${error} ${roomId}`);
            }
        });
    }
    getUser(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!roomId)
                    throw new Error("Invalid roomId");
                const room = yield this._client.getRedisRoom(roomId);
                console.log('resived users from socket', room);
                this._io.to(this._socket.id).emit('participantsUpdate', room);
                return room;
            }
            catch (error) {
                error.message === 'stream endeded' ? this._socket.emit('streamEnded') :
                    console.error(`Error getting user: ${error}`, roomId);
            }
        });
    }
    leaveRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!roomId)
                    throw new Error("Invalid roomId");
                console.log(this._username, "leaving from", roomId, '\n');
                yield this._client.leaveRoom(roomId, this._username);
                const room = yield this._client.getRedisRoom(roomId);
                this._io.to(roomId).emit('participantsUpdate', room);
            }
            catch (error) {
                console.error(`Error leaving room: ${error}`);
            }
        });
    }
    closeRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!roomId)
                    throw new Error("Invalid roomId");
                this._io.to(roomId).emit('closeRoom');
                yield this._client.closeRoom(roomId, this._socket.id);
                console.log('Successfully closed room:', roomId);
            }
            catch (error) {
                console.error('Error closing room:', error);
                // Consider re-throwing the error or handling it appropriately
            }
        });
    }
    getSocketId(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, publickey }) {
            try {
                console.log(username, 'asking socketId and username for', this._username, '\n');
                const strangerSocket = yield (0, authService_1.findSocketIdByUsername)(username);
                console.log(strangerSocket);
                if (strangerSocket) {
                    this._io.to(this._socket.id).emit('getSocketId', { SocketId: strangerSocket, username: username });
                    this._io.to(strangerSocket).emit('getSocketId', { socketId: this._socket.id, username: this._username, hostPublicKey: publickey });
                    this._io.to(strangerSocket).emit('hostPublicId', publickey);
                }
            }
            catch (err) {
                console.error('Error getting socket id', err);
            }
        });
    }
    primeUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._client.primeUser(data, this._username);
                const room = yield this.getUser(data.roomId);
                this._io.to(data.roomId).emit('participantsUpdate', room);
            }
            catch (err) {
                console.error('Error sending Soal', err);
            }
        });
    }
    removePrimeUser(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._client.removePrimeUser(roomId, this._username);
            const room = yield this.getUser(roomId);
            this._io.to(roomId).emit('participantsUpdate', room);
        });
    }
}
exports.default = SocketService;
