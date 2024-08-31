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
  socket.on('getSocketId', (username: string) => mySocketService.getSocketId(username));
  socket.on('message', m => io.to(m.to).emit('message', m));
  socket.on('hangupCall', (socketId: string) =>{
    console.log("recived hangup order", socketId);
    
    io.to(socketId).emit('hangupCall')
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  })
};