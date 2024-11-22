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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const environment_1 = require("./environment");
class RedisClient {
    constructor() { }
    static getInstance() {
        if (!RedisClient.instance) {
            RedisClient.instance = (0, redis_1.createClient)({
                password: environment_1.Redis_password,
                socket: {
                    host: environment_1.Redis_host,
                    port: Number(environment_1.Redis_port)
                }
            });
            RedisClient.instance.on('error', (err) => console.error('Redis Client Error', err));
            RedisClient.instance.on('connect', () => console.log('Redis Client Connected'));
            RedisClient.instance.on('reconnecting', () => console.log('Redis Client Reconnecting'));
        }
        return RedisClient.instance;
    }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = RedisClient.getInstance();
            try {
                yield client.connect();
            }
            catch (error) {
                console.error('Failed to connect to Redis:', error);
                throw error;
            }
        });
    }
    // New method to get the connected client
    static getConnectedClient() {
        if (!RedisClient.instance || !RedisClient.instance.isOpen) {
            throw new Error('Redis client is not connected. Call connect() first.');
        }
        return RedisClient.instance;
    }
}
RedisClient.retryCount = 0;
RedisClient.maxRetries = 5;
exports.default = RedisClient;
