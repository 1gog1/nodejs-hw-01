import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const removeAllContacts = async () => {
  try {
    const data = await readContacts();
    data.splice(0, data.length);

    await writeContacts(data);
    console.log('All contacts have been removed.');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No contacts to remove. The contact list is already empty.');
      return;
    }
  }
};

removeAllContacts();
