import { join } from 'path';
import { Socket, Server } from 'socket.io';

const rooms = new Map();

export function handleSocketConnection(socket: Socket, io: Server) {

  socket.on('joinRoom', (username) => {
    console.log("username from join room", rooms);

    if (!rooms.has(username)) {
      io.to(socket.id).emit('inValidRoom');
      console.log('wrong username');
      return
    }
    rooms.get(username).add({ socketId: socket.id, username: socket.handshake.auth.username });
    socket.join(username);

    io.to(socket.id).emit('validRoom');
    io.to(username).emit('participantsUpdate', Array.from(rooms.get(username)));
    console.log("array from room", Array.from(rooms.get(username)));
  });

  socket.on('createRoom', (username) => {
    if (!rooms.has(username)) {
      rooms.set(username, new Set());
    }
    socket.join(username)
    io.to(socket.id).emit('participantsUpdate', Array.from(rooms.get(username)))

    console.log('created room', rooms);

  });

  socket.on('getUsers', (username) => {
    io.to(socket.id).emit('participantsUpdate', Array.from(rooms.get(username)))
  })

  socket.on('leave-room', (roomId: string) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  })
};