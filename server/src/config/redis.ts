import { createClient, RedisClientType } from 'redis';
import { Redis_password, Redis_host, Redis_port } from './environment';

class RedisClient {
    private static instance: RedisClientType;
    private static retryCount = 0;
    private static maxRetries = 5;

    private constructor() { }

    public static getInstance(): RedisClientType {
        if (!RedisClient.instance) {
            RedisClient.instance = createClient({
                password: Redis_password,
                socket: {
                    host: Redis_host,
                    port: Number(Redis_port)
                }
            });

            RedisClient.instance.on('error', (err) => console.error('Redis Client Error', err));
            RedisClient.instance.on('connect', () => console.log('Redis Client Connected'));
            RedisClient.instance.on('reconnecting', () => console.log('Redis Client Reconnecting'));
        }

        return RedisClient.instance;
    }

    public static async connect(): Promise<void> {
        const client = RedisClient.getInstance();
        try {
            await client.connect();
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            throw error;
        }
    }

    // New method to get the connected client
    public static getConnectedClient(): RedisClientType {
        if (!RedisClient.instance || !RedisClient.instance.isOpen) {
            throw new Error('Redis client is not connected. Call connect() first.');
        }
        return RedisClient.instance;
    }
}

export default RedisClient;