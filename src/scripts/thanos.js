import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';

export const thanos = async () => {
  const data = await fs.readFile(PATH_DB, 'utf-8');
  const contacts = JSON.parse(data);
  for (let i = 0; i < contacts.length; i += 1) {
    const randomContact = contacts.indexOf(
      contacts[Math.floor(Math.random() * contacts.length)],
    );
    console.log(contacts[randomContact]);
    contacts.splice(randomContact, 1);
    await fs.writeFile(PATH_DB, JSON.stringify(contacts));
  }
};

await thanos();
