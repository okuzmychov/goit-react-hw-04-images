import { GlobalStyle } from './GlobalStyle';
import { Component } from 'react';
import { ErrorMsg, Layout } from './Layout';

import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { serviceGetImages } from 'api';
import { EndGallery } from './EndGallery/EndGallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    gallery: [],
    query: {
      searchString: '',
      page: 1,
      perPage: 12,
      totalHits: 0,
      timeStamp: null,
    },
    loader: false,
    error: false,
    showModal: false,
    selectedImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query.timeStamp !== this.state.query.timeStamp ||
      prevState.query.page !== this.state.query.page
    ) {
      try {
        this.setState({ loader: true, error: false });
        const responce = await serviceGetImages(this.state.query);
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...responce.hits],
          query: { ...prevState.query, totalHits: responce.totalHits },
        }));
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loader: false });
      }
    }
    if (
      prevState.gallery !== this.state.gallery &&
      this.state.query.page !== 1
    ) {
      this.scrollUp();
    }
  }

  handleChange = ev => {
    this.setState(prevState => ({
      query: { ...prevState.query, searchString: ev.target.value },
    }));
  };

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState(prevState => ({
      query: {
        ...prevState.query,
        searchString: ev.target.search.value,
        page: 1,
        timeStamp: Date.now(),
      },
      gallery: [],
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      query: { ...prevState.query, page: prevState.query.page + 1 },
    }));
  };

  scrollUp() {
    const height = (window.innerHeight - 128) / 18;
    function scr() {
      window.scrollBy(0, height);
    }
    for (let i = 1; i < 19; i++) {
      const delay = i * 50;
      setTimeout(scr, delay);
    }
  }

  openModal = largeImageURL => {
    this.setState({ showModal: true, selectedImage: largeImageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { gallery, loader, error, showModal, selectedImage,
    query: { searchString, perPage, page, totalHits, timeStamp }, } = this.state;
    const showGallery = (gallery.length > 0);
    const showEndGallery = ((totalHits / perPage) < page);
    const showBtnMore = !showEndGallery && showGallery;
    const showError = error && !showEndGallery;

    return (
      <Layout>
        <Searchbar
          search={searchString}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        {showGallery && (
          <ImageGallery gallery={gallery} onImageClick={this.openModal} />
        )}
        {loader && <Loader />}
        {showBtnMore && <Button onClick={this.handleLoadMore} />}
        {showEndGallery && !!totalHits && <EndGallery />}
        {!loader && !showGallery && !!timeStamp && (
          <ErrorMsg>
            Вибачте, але за вашим запитом нічого не знайдено. Спробуйте змінити
            запит.
          </ErrorMsg>
        )}
        {showError && (
          <ErrorMsg>
            Вибачте, щось пішло не так. Спробуйте перезавантажити сторінку.
          </ErrorMsg>
        )}
        {showModal && (
          <Modal largeImageURL={selectedImage} onClose={this.closeModal} isOpen={showModal}/>
        )}
        <GlobalStyle />
      </Layout>
    );
  }
}
