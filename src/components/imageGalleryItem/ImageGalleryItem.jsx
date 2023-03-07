import PropTypes from 'prop-types';
import { Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { id, webformatURL, tags },
  onSelect,
}) => {
  return (
    <>
      <Img
        src={webformatURL}
        alt={tags}
        onClick={() => onSelect(webformatURL)}
      />
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
