"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocketConnection = handleSocketConnection;
const socketService_1 = __importDefault(require("../services/socketService"));
function handleSocketConnection(socket, io) {
    const mySocketService = new socketService_1.default(socket, io);
    socket.on("createRoom", ({ roomId, publicKey }) => mySocketService.createRoom(roomId, publicKey));
    socket.on("checkRoom", (roomId) => mySocketService.checkRoom(roomId));
    socket.on("joinRoom", (roomId) => mySocketService.joinRoom(roomId));
    socket.on("getUsers", (roomId) => mySocketService.getUser(roomId));
    socket.on("leaveRoom", (roomId) => mySocketService.leaveRoom(roomId));
    socket.on("closeRoom", (roomId) => mySocketService.closeRoom(roomId));
    socket.on("getSocketId", ({ username, publickey }) => mySocketService.getSocketId({ username, publickey }));
    socket.on("message", (m) => io.to(m.to).emit("message", m));
    socket.on("hangupCall", (socketId) => {
        io.to(socketId).emit("hangupCall");
    });
    socket.on("soalStreamRequest", (soal) => mySocketService.primeUser(soal));
    socket.on("removePrimeUser", (roomId) => mySocketService.removePrimeUser(roomId));
    socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);
    });
}
