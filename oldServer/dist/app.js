"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const auth_1 = __importDefault(require("./routes/auth"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
require("dotenv/config");
const socketHandlers_1 = require("./routes/socketHandlers");
const app = (0, express_1.default)();
const port = 3000;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.PUBLIC_CLIENT_URL || 'https://stream-sync-virid.vercel.app/',
        methods: ["GET", "POST"]
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', auth_1.default);
io.on("connection", (socket) => {
    (0, socketHandlers_1.handleSocketConnection)(socket, io);
});
(0, database_1.connectToDatabase)()
    .then(() => {
    httpServer.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch(err => {
    console.error('Failed to connect to the database', err);
    process.exit(1);
});
