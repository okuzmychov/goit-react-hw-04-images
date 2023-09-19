import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ gallery, openModal }) => {
  return (
    <Gallery>
      {gallery.map(el => (
        <ImageGalleryItem
          key={el.id}
          url={el.webformatURL}
          tags={el.tags}
          largeImageURL={el.largeImageURL}
          openModal={() => openModal(el.largeImageURL)}
        />
      ))}
    </Gallery>
  );
};
