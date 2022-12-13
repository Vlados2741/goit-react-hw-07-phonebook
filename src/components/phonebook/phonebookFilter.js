import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filter';

export default function PhonebookFilter({ filter }) {
  const filterId = nanoid();
  const dispatch = useDispatch();

  const filterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <form>
      <label htmlFor={filterId}>Find contacts by name</label>
      <input
        autoComplete="off"
        id={filterId}
        value={filter}
        type="text"
        name="filter"
        onChange={filterChange}
      />
    </form>
  );
}
