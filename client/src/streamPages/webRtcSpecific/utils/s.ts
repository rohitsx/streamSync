import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://127.0.0.1:5173",
    },
});

let users = [];

function makePeer(socketId) {
    if (!users.includes(socketId)) {
        users.push(socketId);
    }
    if (users.length === 2) {
        io.to(users[0]).emit('peer', { 'strangerId': users[1], 'polite': true });
        io.to(users[1]).emit('peer', { 'strangerId': users[0], 'polite': false });
        users = []
    }
}

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('connectPeer', () => makePeer(socket.id));
    socket.on('message', m => io.to(m.to).emit('message', m));
    socket.on('disconnect', () => {
        users = users.filter(id => id !== socket.id)
        io.to(users[0]).emit('strangerLeft');
    });
});

httpServer.listen(3001, () => console.log("listening at 3001"));