import { useState } from 'react';
import { toast } from 'react-toastify';
import { Panel, SearchForm, StyledInput, SubmitBtn } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setinputValue] = useState('');

  const handleChange = e => {
    setinputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const searchItem = e.target.elements.searchValue.value.trim();
    if (!searchItem) {
      toast.error('Вибачте, але ми нічого не знайшли по Вашому запиту.');
    }
    onSubmit(searchItem);
    e.target.reset();
  };
  return (
    <Panel>
      <SearchForm onSubmit={handleSubmit} autoComplete="off">
        <StyledInput
          type="search"
          value={inputValue}
          onChange={handleChange}
          placeholder="Що Ви шукаєте?"
          name="searchValue"
          required
          autoFocus
        />
        <SubmitBtn type="submit">
          <ImSearch />
        </SubmitBtn>
      </SearchForm>
    </Panel>
  );
};