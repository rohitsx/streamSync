import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_CONNECTION_STRING = process.env.db_connection_string || '';
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const PUBLIC_WEBSOCKET_URL = process.env.PUBLIC_WEBSOCKET_URL || '';