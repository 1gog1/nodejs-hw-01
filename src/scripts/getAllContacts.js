import { readContacts } from '../utils/readContacts.js';

export const getAllContacts = async () => {
  try {
    const data = await readContacts();
    return data;
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
};

console.log(await getAllContacts());
