import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const removeLastContact = async () => {
  try {
    const data = await readContacts();
    data.pop();

    await writeContacts(data);
    console.log('The last contact has been removed.');
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
};

removeLastContact();
