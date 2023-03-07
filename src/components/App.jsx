import { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { Modal } from './modal/Modal';
import { ImageGallery } from './imageGallery/ImageGallery';

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

  selectImage = imageUrl => {
    console.log(imageUrl);
    this.setState({ selectedImage: imageUrl });
  };

  render() {
    const { imageName, page } = this.state;

    return (
      <>
        {this.state.selectedImage && <Modal image={this.state.selectedImage} />}
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
