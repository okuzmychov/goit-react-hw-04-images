import React from 'react';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <GalleryItem key={image.id} onClick={() => openModal(image)}>
      <GalleryImage src={image.webformatURL} alt={image.tags} />
    </GalleryItem>
  );
};
