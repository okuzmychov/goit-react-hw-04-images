import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BackDrop, CloseBtn, Content, Icon } from './Modal.styled';

export class Modal = ({onClose, children}) => {
  useEffect(() => {
    const handleKeyDown = e => { if (e.code === 'Escape') { onClose() } };
  
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

 const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

 return createPortal(
      <BackDrop onClick={handleBackdropClick}>
        <Content>
          <CloseBtn type='button' onClick={onClose}><Icon/></CloseBtn>
          {children}
        </Content>
      </BackDrop>,
      modalRoot
    );
}
