import { Panel, LoadMore } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <Panel>
      <LoadMore type="button" onClick={onClick}>
        Завантажити більше...
      </LoadMore>
    </Panel>
  );
};
