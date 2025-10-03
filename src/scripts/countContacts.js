import { readContacts } from '../utils/readContacts.js';

export const countContacts = async () => {
  try {
    const data = await readContacts();
    return data.length;
  } catch (error) {
    console.log('Error counting contacts:', error.message);
    return 0;
  }
};

console.log(await countContacts());
