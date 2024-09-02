import { Socket, Server } from 'socket.io';
import SocketService from '../services/socketService';

const rooms = new Map();

export function handleSocketConnection(socket: Socket, io: Server) {

  console.log("username", socket.handshake.auth.username);

  const mySocketService = new SocketService(socket, io);

  socket.on('createRoom', (roomId: string) => mySocketService.createRoom(roomId));
  socket.on('joinRoom', (roomId: string) => mySocketService.joinRoom(roomId));
  socket.on('getUsers', (roomId: string) => mySocketService.getUser(roomId));
  socket.on('leaveRoom', (roomId: string) => mySocketService.leaveRoom(roomId));
  socket.on('closeRoom', (roomId: string) => mySocketService.closeRoom(roomId));
  socket.on('getSocketId', ({ username, publickey }: { username: string, publickey: string }) => mySocketService.getSocketId({ username, publickey }));
  socket.on('message', m => io.to(m.to).emit('message', m));
  socket.on('hangupCall', (socketId: string) => { io.to(socketId).emit('hangupCall') });
  socket.on('soalStreamRequest', (soal: {
    soal: { message: string, soalQuantity: number, roomId: string }
  }) => mySocketService.soal(soal))

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  })
};