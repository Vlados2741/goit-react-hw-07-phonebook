import { createAsyncThunk } from '@reduxjs/toolkit';
import { instanceContacts } from 'services/api';

const isDublicate = ({ name }, contacts) => {
  const normalizedName = name.toLowerCase();
  const result = contacts.find(item => {
    return normalizedName === item.name.toLowerCase();
  });
  return Boolean(result);
};

const getContacts = async () => {
  const { data } = await instanceContacts.get('/contacts');
  return data;
};

const addContacts = async data => {
  const { data: result } = await instanceContacts.post('/contacts', data);
  return result;
};

const removeContacts = async id => {
  const { data } = await instanceContacts.delete(`/contacts/${id}`);
  return data;
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, thunkApi) => {
    try {
      const data = await getContacts();
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (data, { rejectWithValue }) => {
    try {
      const result = await addContacts(data);
      return result;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
  {
    condition: (data, { getState }) => {
      const { contacts } = getState();
      if (isDublicate(data, contacts.items)) {
        return alert('The contact already exists');
      }
    },
  }
);

export const removeContact = createAsyncThunk(
  'contacts/remove',
  async (id, { rejectWithValue }) => {
    try {
      await removeContacts(id);
      return id;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
