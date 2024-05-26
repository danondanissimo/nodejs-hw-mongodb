import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
  });

  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await getAllContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (err) {
      next(err);
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);

      if (!contact) {
        res.status(404).json({
          status: 404,
          message: `Successfully found contact with id ${contactId}!`,
        });
      } else {
        res.json({ status: 200, data: contact });
      }
    } catch (err) {
      next(err);
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found', status: 404 });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
