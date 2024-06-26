import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

import pino from 'pino-http';

import express from 'express';

// import { env } from './utils/env.js';

import cors from 'cors';

import dotenv from 'dotenv';

import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { createDirIfNotExists } from './utils/createDirIfNotExist.js';

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
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  setupServer();
};

bootstrap();
