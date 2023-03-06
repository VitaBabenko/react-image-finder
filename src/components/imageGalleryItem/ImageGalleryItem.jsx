import PropTypes from 'prop-types';
import { Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, tags },
  onSelect,
}) => {
  return (
    <div onClick={() => onSelect(webformatURL)}>
      <Img src={webformatURL} alt={tags} />
    </div>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
