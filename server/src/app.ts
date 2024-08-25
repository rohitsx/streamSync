import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const client: MongoClient = new MongoClient(process.env.db_connection_string || '');
const JWT_Token: string = process.env.JWT_SECRET || '';
let db: Db;
let usersCollection: Collection;

client.connect()
  .then(() => {
    console.log('DB connected');
    db = client.db('streamSync');
    usersCollection = db.collection('users');
  })
  .catch(err => console.log('MongoDB connection error:', err));

app.post('/signup', async (req, res) => {
  console.log("/singup");
  
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) return res.send('email_exists');

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
  console.log('/login');
  

  try {
    const { email, password } = req.body;

    // Find user
    const user = await usersCollection.findOne({ email });
    if (!user) return res.send('incorrect_email');

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.send('incorrect_pass');

    const token = jwt.sign({ userId: user._id }, JWT_Token, { expiresIn: '30d' });

    res.status(200).json({ message: 'success_login', token, userName: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server_error' });
  }
});


app.post('/validate-token', async (req, res) => {
  console.log('valdata-token');
  

  const token = req.body.token;
  if (!token) {
    return res.status(401).json({ valid: false });
  }

  try {
    const jwtToken = jwt.verify(token, JWT_Token) as { userId: string };
    const userId = jwtToken.userId;

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    
    if (user) {
      res.json({ valid: true, userName: user.name });
    } else {
      res.status(404).json({ valid: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(401).json({ valid: false });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});