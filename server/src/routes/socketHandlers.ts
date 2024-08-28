import { log } from 'console';
import { Socket, Server } from 'socket.io';

export function handleSocketConnection(socket: Socket, io: Server) {

  const rooms = new Map();

  socket.on('joinRoom', (username) => {
    socket.join(username);
    if (!rooms.has(username)) {
      // rooms.set(username, new Set());
      io.to(socket.id).emit('worngUsername');
      console.log('username: ', username);
    }
    // rooms.get(username).add(socket.id);
    // io.to(socket.id).emit('participantsUpdate', Array.from(rooms.get(username)));
  });

  socket.on('leave-room', (roomId: string) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  })
};