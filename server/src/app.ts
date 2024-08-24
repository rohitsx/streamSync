import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { MongoClient, Db, Collection } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const client: MongoClient = new MongoClient(process.env.db_connection_string || '');
let db: Db;
let usersCollection: Collection;

client.connect()
  .then(() => {
    console.log('DB connected');
    db = client.db('your_database_name');
    usersCollection = db.collection('users');
  })
  .catch(err => console.log('MongoDB connection error:', err));

app.post('/signup', async (req, res) => {
  console.log(req.body);

  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).send('email_exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await usersCollection.insertOne({ name, email, password: hashedPassword });

    res.status(201).send('success_signup');
  } catch (error) {
    console.error(error);
    res.status(500).send('server_error');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).send('wrong_id_pass');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('wrong_id_pass');
    }

    // Create access token (short-lived)
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '15m' });

    // Create refresh token (long-lived)
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret', { expiresIn: '30d' });

    // Store refresh token in database
    await usersCollection.updateOne({ _id: user._id }, { $set: { refreshToken } });

    res.status(200).json({ accessToken, refreshToken, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).send('server_error');
  }
});

app.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh Token Required' });
  }

  try {
    const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret');
    const user = await usersCollection.findOne({ _id: decoded.userId, refreshToken });

    if (!user) {
      return res.status(403).json({ error: 'Invalid Refresh Token' });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '15m' });

    res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({ error: 'Invalid Refresh Token' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});