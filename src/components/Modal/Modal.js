import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BackDrop, Content } from './Modal.styled';

export const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <BackDrop onClick={handleBackdropClick}>
      <Content>
      <img src={largeImageURL} alt="Large" />
      </Content>
    </BackDrop>,
    // modalRoot
  );
};
