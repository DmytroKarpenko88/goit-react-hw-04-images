import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

const ImageGallery = ({ photos }) => {
  return (
    <ul className={css.ImageGallery}>
      {/* <!-- Набір <li> із зображеннями --> */}
      {photos.map(({ webformatURL, tags, largeImageURL }, index) => {
        return (
          <ImageGalleryItem
            key={index}
            url={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.protoTypes = {
  photos: PropTypes.array.isRequired,
};

export default ImageGallery;
