import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/database';
import authRoutes from './routes/auth';
import { createServer } from "http";
import { Server } from "socket.io";
import 'dotenv/config'
import { handleSocketConnection } from './routes/socketHandlers';
import Redis from './config/redis';

const app = express();
const port = 3000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.PUBLIC_WEBSOCKET_URL || "http://localhost:5173"
  }
});

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);

io.on("connection", (socket) => {
  handleSocketConnection(socket, io);
});


Redis.connect()
  .then(() => console.log("redis connected"))
  .catch(err => console.log("error connecting redis", err))

connectToDatabase()
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database', err);
    process.exit(1);
  });