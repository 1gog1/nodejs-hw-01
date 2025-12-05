import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors as celebrateErrors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import userRouter from './routes/userRoutes.js';

import authRouter from './routes/authRoutes.js';
import notesRouter from './routes/notesRoutes.js';

const app = express();

const startServer = async () => {
  try {
    await connectMongoDB();

    app.use(logger);
    app.use(cors({ origin: true, credentials: true }));
    app.use(express.json());
    app.use(cookieParser());

    app.use('/auth', authRouter);
    app.use('/notes', notesRouter);
    app.use('/users', userRouter);

    app.use(notFoundHandler);
    app.use(celebrateErrors());
    app.use(errorHandler);

    const { PORT = 3000 } = process.env;

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
