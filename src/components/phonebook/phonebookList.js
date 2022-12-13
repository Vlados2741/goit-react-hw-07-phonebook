import { useDispatch } from 'react-redux';
import { removeContact } from 'redux/operations';

export default function PhonebookList({ contactsList }) {
  const dispatch = useDispatch();
  const oneContacts = contactsList.map(({ id, name, number, gender }) => {
    return (
      <li key={id} className="contact-list">
        <p>
          {name}: {number}
          {''}
        </p>
        <button
          className="delete-btn"
          type="button"
          onClick={() => dispatch(removeContact(id))}
        >
          Delete
        </button>
      </li>
    );
  });

  return <ul>{oneContacts}</ul>;
}
