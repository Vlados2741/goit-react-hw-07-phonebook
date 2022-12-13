import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
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
      Notiflix.Report.success('Super !', ` New contact added!`, 'Close', {
        svgSize: '200px',
        titleFontSize: '24px',
        messageFontSize: '20px',
        buttonFontSize: '16px',
        width: '300px',
        backOverlay: true,
        backOverlayClickToClose: true,
      });
      return result;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
  {
    condition: (data, { getState }) => {
      const { contacts } = getState();
      if (isDublicate(data, contacts.items)) {
        return Notiflix.Report.warning(
          'Oopps...',
          `${contacts.name} already exists 🤪 Try entering the full name.`,
          'Close',
          {
            svgSize: '200px',
            titleFontSize: '24px',
            messageFontSize: '18px',
            buttonFontSize: '16px',
            width: '300px',
            backOverlay: true,
            backOverlayClickToClose: true,
          }
        );
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
