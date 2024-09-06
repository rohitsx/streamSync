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
const allowedOrigins = [
  process.env.PUBLIC_CLIENT_URL || 'https://stream-sync-virid.vercel.app' || 'http://localhost:5173'
];

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

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