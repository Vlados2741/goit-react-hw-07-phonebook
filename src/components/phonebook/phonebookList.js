import { useDispatch } from 'react-redux';
import Notiflix from 'notiflix';
import { removeContact } from 'redux/operations';

export default function PhonebookList({ contactsList }) {
  const removeMessage = () => {
    return Notiflix.Report.failure('Remove', 'Contact removed', 'Close', {
      svgSize: '200px',
      titleFontSize: '24px',
      messageFontSize: '20px',
      buttonFontSize: '16px',
      width: '300px',
      backOverlay: true,
      backOverlayClickToClose: true,
    });
  };

  const dispatch = useDispatch();
  const oneContacts = contactsList.map(({ id, name, number, gender }) => {
    return (
      <li key={id} className="list-item">
        <p>
          {name}: {number}
          {''}
        </p>
        <button
          className="delete-btn"
          type="button"
          onClick={() => dispatch(removeContact(id), removeMessage())}
        >
          Delete
        </button>
      </li>
    );
  });

  return <ul>{oneContacts}</ul>;
}
