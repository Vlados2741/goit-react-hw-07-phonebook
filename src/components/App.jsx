import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Phonebook from './phonebook/phonebook';
import PhonebookFilter from './phonebook/phonebookFilter';
import PhonebookList from './phonebook/phonebookList';
import { fetchContacts } from 'redux/operations';
import { getFilteredContacts } from 'redux/contactsSelector';
import { getFilter } from 'redux/filter';

import './phonebook/phonebook-style.css';

export function App() {
  const contacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1 className="phonebook-title">Phonebook</h1>
      <Phonebook />
      <>
        <h2>Contacts :</h2>
        <PhonebookFilter filter={filter} />
        {contacts.length > 0 && <PhonebookList contactsList={contacts} />}
      </>
    </>
  );
}
