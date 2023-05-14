import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ url, tags, largeImageURL }) => {
  const newModalData = {
    largeImageUrl: largeImageURL,
    altName: tags,
  };

  const [isModalShow, setIsModalShow] = useState(false);

  const handleModalToggle = () => {
    setIsModalShow(prev => {
      console.log(prev);
      return !prev;
    });
  };

  return (
    <li className={css.ImageGalleryItem} onClick={handleModalToggle}>
      <img src={url} alt={tags} className={css.ImageGalleryItemImage} />
      <>
        {/* ---------Modal window------------- */}

        {isModalShow && (
          <Modal modalData={newModalData} onClose={handleModalToggle} />
        )}
      </>
    </li>
  );
};

ImageGalleryItem.protoType = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
