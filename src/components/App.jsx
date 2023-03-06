import { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Modal } from './modal/Modal';

export class App extends Component {
  state = {
    imageName: '',
    page: 1,
    selectedImage: null,
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName, page: 1 });
  };

  handleButton = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  selectImage = imageURL => {
    console.log(imageURL);
    this.setState({ selectedImage: imageURL });
  };

  render() {
    const { imageName, page, selectedImage } = this.state;

    return (
      <>
        {selectedImage && <Modal image={selectedImage} />}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          value={imageName}
          page={page}
          handleLoad={this.handleButton}
          onSelect={this.selectImage}
        />
      </>
    );
  }
}
