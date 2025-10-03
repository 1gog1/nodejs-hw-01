import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

const generateContacts = async (number) => {
  try {
    const data = await readContacts();
    for (let i = 0; i < number; i++) {
      data.push(createFakeContact());
    }
    await writeContacts(data);
    console.log(`${number} contacts added ✅`);
  } catch (error) {
    console.log('❌ Error generate contacts:', error.message);
  }
};

generateContacts(5);
