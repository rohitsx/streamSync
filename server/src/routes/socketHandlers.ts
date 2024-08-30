import { Socket, Server } from 'socket.io';
import SocketService from '../services/socketService';

const rooms = new Map();

export function handleSocketConnection(socket: Socket, io: Server) {

  const mySocketService = new SocketService(socket, io);

  socket.on('createRoom', (roomId: string) => mySocketService.createRoom(roomId));
  socket.on('joinRoom', (roomId: string) => mySocketService.joinRoom(roomId));
  socket.on('getUser', (roomId: string) => mySocketService.getUser(roomId));
  socket.on('leaveRoom', (roomId: string) => mySocketService.leaveRoom(roomId));


  // const clientUsername = socket.handshake.auth.username;


  // socket.on('joinRoom', (roomName) => {
  //   console.log("username from join room", rooms);

  //   if (!rooms.has(roomName)) {
  //     io.to(socket.id).emit('invalidRoom');
  //     console.log('wrong username');
  //     return;
  //   }

  //   const userSet = rooms.get(roomName);
  //   const newUser = { socketId: socket.id, username: clientUsername };

  //   if (!Array.from(userSet).some((user: any) => user.username === newUser.username)) {
  //     userSet.add(newUser);
  //   } else {
  //     io.to(socket.id).emit('alreadyJoined');
  //     console.log('User already in the room');
  //   }
  //   socket.join(roomName);
  //   io.to(socket.id).emit('validRoom');
  //   io.to(roomName).emit('participantsUpdate', Array.from(userSet));
  //   console.log("array from room", Array.from(userSet));
  // });

  // socket.on('createRoom', (username: string) => {
  //   if (!rooms.has(username)) {
  //     rooms.set(username, new Set());
  //   }
  //   socket.join(username)
  //   io.to(socket.id).emit('participantsUpdate', Array.from(rooms.get(username)))

  //   console.log('created room', rooms);

  // });

  // socket.on('getUsers', (username: string) => {
  //   io.to(socket.id).emit('participantsUpdate', Array.from(rooms.get(username)))
  // })

  // socket.on('leaveRoom', (username: string) => {
  //   console.log('working leaving room');

  //   const room = rooms.get(username);
  //   if (room) {
  //     const userToRemove = Array.from(room).find(
  //       (participant: any) =>
  //         participant.socketId === socket.id &&
  //         participant.username === socket.handshake.auth.username
  //     );

  //     if (userToRemove) {
  //       room.delete(userToRemove);
  //       socket.leave(username);
  //       io.to(username).emit('participantsUpdate', Array.from(room));
  //       console.log(`User ${socket.handshake.auth.username} left room ${username}`);

  //     }
  //   }
  // });


  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  })
};