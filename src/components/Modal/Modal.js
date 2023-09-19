import Modal from 'react-modal';
import { customStyles } from './Modal.styled';

Modal.setAppElement('#root');

export const ModalStyled = ({ isOpen, onRequestClose, image }) => {
 return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onRequestClose}>
      <img src={image.largeImageURL} alt={image.tags} />
    </Modal>
  );
};