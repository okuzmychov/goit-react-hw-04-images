import styled from 'styled-components';

export const customStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 600px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1300;
`;

export const StyledModal = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;