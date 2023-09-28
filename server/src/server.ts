import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';


import { AuthRouter } from './controllers/AuthController';
import { UserRouter } from './controllers/UserController';




dotenv.config();

export const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Server is Online');
});


app.use('/login', AuthRouter);
app.use('/user', UserRouter);

app.listen(port, () => {
  console.log(`🚀🚀 Server is listening on port ${port}`);
});
