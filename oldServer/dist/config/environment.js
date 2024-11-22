"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redis_port = exports.Redis_host = exports.Redis_password = exports.PUBLIC_WEBSOCKET_URL = exports.JWT_SECRET = exports.DB_CONNECTION_STRING = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3000;
exports.DB_CONNECTION_STRING = process.env.db_connection_string || '';
exports.JWT_SECRET = process.env.JWT_SECRET || '';
exports.PUBLIC_WEBSOCKET_URL = process.env.PUBLIC_WEBSOCKET_URL || '';
exports.Redis_password = process.env.Redis_pasword || '';
exports.Redis_host = process.env.Redis_host || '';
exports.Redis_port = process.env.Redis_port;
