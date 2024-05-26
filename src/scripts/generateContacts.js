// import { PATH_DB } from '../constants/contacts.js';

// const generateContacts = async (number) => {};

// await generateContacts(5);

// import fs from 'node:fs';
// const generateContacts = async (number) => {
//   for (let i = 0; i < number; i++) {
//     const contact = createFakeContact();
//     fs.readFile(PATH_DB, 'utf-8', (err, data) => {
//       if (err) {
//         throw err;
//       }
//       const contacts = JSON.parse(data);

//       contacts.push(contact);

//       fs.writeFile(PATH_DB, 'utf-8', JSON.stringify(contacts), (err) => {
//         if (err) {
//           throw err;
//         }
//       });
//     });
//   }
// };

import { createFakeContact } from '../utils/createFakeContact.js';
import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';
const generateContacts = async (number) => {
  const data = await fs.readFile(PATH_DB, 'utf-8');
  const contacts = JSON.parse(data);
  for (let i = 0; i < number; i += 1) {
    const newContact = createFakeContact();
    contacts.push(newContact);
    await fs.writeFile(PATH_DB, JSON.stringify(contacts));
  }
};

await generateContacts(4);
