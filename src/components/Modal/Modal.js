import React, { Component } from 'react';
import { StyledModalOverlay, StyledModal } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;

    return (
      <StyledModalOverlay onClick={this.handleBackdropClick}>
        <StyledModal>
          <img src={largeImageURL} alt="Large" />
        </StyledModal>
      </StyledModalOverlay>
    );
  }
}
