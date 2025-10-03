import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

export const addOneContact = async () => {
  try {
    const data = await readContacts();
    data.push(createFakeContact());
    await writeContacts(data);
    console.log(`1 contact added ✅`);
  } catch (error) {
    console.log('❌ Error generate contacts:', error.message);
  }
};

addOneContact();
