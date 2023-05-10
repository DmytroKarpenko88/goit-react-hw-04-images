import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ url, tags, largeImageURL, openModalWindow }) => {
  const newModalData = {
    largeImageUrl: largeImageURL,
    altName: tags,
  };

  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => openModalWindow(newModalData)}
    >
      <img src={url} alt={tags} className={css.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.protoType = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModalWindow: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
