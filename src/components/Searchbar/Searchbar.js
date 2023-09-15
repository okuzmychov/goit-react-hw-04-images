import { Panel, SearchForm, StyledInput, SubmitBtn } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export const Searchbar = ({ search, onChange, onSubmit }) => {
  return (
    <Panel>
      <SearchForm onSubmit={onSubmit}>
        <StyledInput
          value={search}
          onChange={onChange}
          placeholder="Що Ви шукаєте?"
          name="search"
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
