import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal/Modal';
import { Img } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    console.log('componentDidMount');

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  openModal = () => {
    this.setState({ isOpen: true });
  };

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      console.log('close');
      this.setState({ isOpen: false });
    }
  };

  render() {
    const {
      image: { largeImageURL, webformatURL, tags },
    } = this.props;

    return (
      <>
        <Img src={webformatURL} alt={tags} onClick={this.openModal} />
        {this.state.isOpen && <Modal image={largeImageURL} name={tags} />}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
