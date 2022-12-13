import axios from 'axios';

const BASE_URL = 'https://636e3b1eb567eed48ad7269a.mockapi.io/';

export const instanceContacts = axios.create({
  baseURL: BASE_URL,
});
