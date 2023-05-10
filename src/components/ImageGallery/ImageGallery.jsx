import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

const ImageGallery = ({ photos, openModalWindow }) => {
  return (
    <ul className={css.ImageGallery}>
      {/* <!-- Набір <li> із зображеннями --> */}
      {photos.map(({ webformatURL, tags, largeImageURL, id }) => {
        return (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            openModalWindow={openModalWindow}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.protoTypes = {
  openModalWindow: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
};

export default ImageGallery;
