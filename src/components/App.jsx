import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import * as Request from 'api';
import { ScrollToTop } from './ScrollToTop/ScrollToTop';
import { ModalStyled } from './Modal/Modal';

export const App = () => {
  const [searchValues, setSearchValues] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (searchValues === '') {
      return;
    }

    async function addImages() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await Request.fetchGallery(searchValues, page);

        if (data.hits.length === 0) {
          toast.error('Спробуйте змінити запит!');
          return;
        }

        const normalImages = Request.destImages(data.hits);
        setImages(propImages => [...propImages, ...normalImages]);
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch (error) {
        setIsError(true);
        toast.error('Вибачте, щось пішло не так.');
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [searchValues, page]);

  const changeValue = query => {
    setSearchValues(query);
    setImages([]);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setImageSrc(image);
    setIsModal(true);
  };

  const closeModal = () => {
    setImageSrc('');
    setIsModal(false);
  };

  return (
    <Container>
      <Searchbar onSubmit={changeValue} />
      {isLoading && <Loader />}
      {isError &&
        !isLoading &&
        toast.error('Вибачте, але за Вашим запитом нічого не знайдено.')}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {images.length > 0 && totalPages !== page && !isLoading && (
        <Button onClick={loadMoreImages} />
      )}
      {images.length > 36 && !isLoading && <ScrollToTop />}
      <ModalStyled
        isOpen={isModal}
        onRequestClose={closeModal}
        image={imageSrc}
      />
    </Container>
  );
};