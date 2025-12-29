import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import helloRoute from './routes/hello.route.js';
import userRoute from './routes/user.route.js';
import connectDB from './db/init.js';

dotenv.config();

const app = express();
const port = 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.use(
      cors({
        origin: 'http://localhost:5173',
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(cookieParser());

    app.use('/api/hello', helloRoute);
    app.use('/api/user', userRoute);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log('[ERROR] failed to connect to the Database: ', error);
  }
};

startServer();

export default app;
