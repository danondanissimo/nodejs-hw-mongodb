import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

import pino from 'pino-http';

import express from 'express';

// import { env } from './utils/env.js';

import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

// const PORT = 3000;

// const PORT = Number(process.env.PORT);

// const PORT = Number(env('PORT', '3000'));

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello world!',
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use(cors());

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
