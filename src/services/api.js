import axios from 'axios';

const BASE_URL = 'https://63986af1fe03352a94d028d9.mockapi.io/contacts';

export const instanceContacts = axios.create({
  baseURL: BASE_URL,
});
