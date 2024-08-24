import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Node Express!');
});

app.post('/login', (req, res) => {
  console.log(req.body);
  res.send('success_login');
});

app.post('/singup', (req, res) => {
  console.log(req.body);
  res.send('success_singup')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
