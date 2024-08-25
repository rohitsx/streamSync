import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/database';
import authRoutes from './routes/auth';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database', err);
    process.exit(1);
  });