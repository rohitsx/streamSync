import { log } from 'console';
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

  socket.on('createRoom', (username: string) => {
    if (!rooms.has(username)) {
      rooms.set(username, new Set());
    }
    socket.join(username)
    io.to(socket.id).emit('participantsUpdate', Array.from(rooms.get(username)))

    console.log('created room', rooms);

  });

  socket.on('getUsers', (username: string) => {
    io.to(socket.id).emit('participantsUpdate', Array.from(rooms.get(username)))
  })

  socket.on('leaveRoom', (username: string) => {
    console.log('working leaving room');

    const room = rooms.get(username);
    if (room) {
      const userToRemove = Array.from(room).find(
        (participant: any) =>
          participant.socketId === socket.id &&
          participant.username === socket.handshake.auth.username
      );

      if (userToRemove) {
        room.delete(userToRemove);
        socket.leave(username);
        io.to(username).emit('participantsUpdate', Array.from(room));
        console.log(`User ${socket.handshake.auth.username} left room ${username}`);

      }
    }
  });


  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  })
};