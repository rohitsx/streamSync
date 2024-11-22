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
const database_1 = require("../config/database");
const redis_1 = __importDefault(require("../config/redis"));
const authService_1 = require("./authService");
const db = (0, database_1.getDb)();
class redisService {
    constructor() {
        this._client = redis_1.default.getInstance();
    }
    createRedisRoom(roomId, publicKey, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, authService_1.updateSocketIdDb)(socket);
            const socketId = socket.id;
            yield this._client.hSet('roomId', roomId, JSON.stringify({ publicKey, socketId }));
        });
    }
    checkRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkRoom = yield this._client.hExists('roomId', roomId);
            if (!checkRoom)
                throw new Error('invalidRoom');
        });
    }
    joinRedisRoom(roomId, username, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, authService_1.updateSocketIdDb)(socket);
            yield this.checkRoom(roomId);
            const existingEntries = yield this._client.zRange(roomId, 0, -1);
            console.log('existing entries', existingEntries);
            for (const entry of existingEntries) {
                let data;
                try {
                    data = JSON.parse(entry).username;
                }
                catch (_a) {
                    data = entry;
                }
                if (data === username) {
                    throw new Error('alredy in room');
                }
            }
            yield this._client.zAdd(roomId, { score: 0, value: username });
        });
    }
    getRedisRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            // const checkRoom = await this.checkRoom(roomId);
            // const room = await this._client.zRangeWithScores(roomId, 0, 100);
            // const withscores = await this._client.sendCommand(['ZREVRANGE', roomId, '0', '99', 'WITHSCORES']);
            // console.log('showing with scores', withscores);
            // console.log('resived user from redis method', room)
            // return room
            const response = yield this._client.sendCommand(['ZREVRANGE', roomId, '0', '99', 'WITHSCORES']);
            // Convert response to the desired format
            const resultArray = [];
            for (let i = 0; i < response.length; i += 2) {
                const value = response[i];
                const score = parseFloat(response[i + 1]);
                resultArray.push({
                    value,
                    score
                });
            }
            console.log(resultArray);
            return resultArray;
        });
    }
    closeRoom(roomId, localSocketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const roomData = yield this._client.hGet('roomId', roomId);
            if (roomData) {
                const { publicKey, socketId } = JSON.parse(roomData);
                if (localSocketId === socketId) {
                    yield this._client.hDel('roomId', roomId);
                    yield this._client.del(roomId);
                }
                else {
                    throw new Error('local SocketId not match');
                }
            }
            else {
                throw new Error('Room not found');
            }
        });
    }
    leaveRoom(roomId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkRoom(roomId);
            const existingEntries = yield this._client.zRange(roomId, 0, -1);
            console.log(existingEntries);
            for (const entry of existingEntries) {
                console.log('existing entry', existingEntries);
                let data;
                try {
                    data = JSON.parse(entry).username;
                }
                catch (_a) {
                    data = entry;
                }
                if (data === username) {
                    yield this._client.zRem(roomId, entry);
                }
            }
        });
    }
    primeUser(data, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const { message, soalQuantity, roomId } = data;
            yield this.checkRoom(roomId);
            const existingEntries = yield this._client.zRange(roomId, 0, -1);
            for (const entry of existingEntries) {
                console.log('existing entry', existingEntries);
                let data;
                try {
                    data = JSON.parse(entry).username;
                }
                catch (_a) {
                    data = entry;
                }
                if (data === username) {
                    yield this._client.zRem(roomId, entry);
                    break;
                }
            }
            yield this._client.zAdd(roomId, {
                score: soalQuantity,
                value: JSON.stringify({ message, username })
            });
        });
    }
    removePrimeUser(roomId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEntries = yield this._client.zRange(roomId, 0, -1);
            for (const entry of existingEntries) {
                console.log('existing entry', existingEntries);
                let data;
                try {
                    data = JSON.parse(entry).username;
                }
                catch (_a) {
                    data = entry;
                }
                if (data === username) {
                    yield this._client.zRem(roomId, entry);
                }
                yield this._client.zAdd(roomId, {
                    score: 0,
                    value: username
                });
            }
        });
    }
}
exports.default = redisService;
