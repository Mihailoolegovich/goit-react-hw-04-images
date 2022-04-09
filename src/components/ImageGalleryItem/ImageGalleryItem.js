import propTypes from 'prop-types';
import React from 'react';
import './ImageGalleryItem.css';

const ImageGalleryItem = ({ data, onClick }) => (
  <>
    {data &&
      data.map(({ id, webformatURL, tags }) => (
        <li key={id} className="gallery-item">
          <img
            className="gallery-item__img"
            src={webformatURL}
            alt={tags}
            onClick={() => onClick(id)}
          />
        </li>
      ))}
  </>
);

ImageGalleryItem.propTypes = {
  data: propTypes.array,
  onClick: propTypes.func,
};

export default ImageGalleryItem;
