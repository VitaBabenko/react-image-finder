import { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';

export class App extends Component {
  state = {
    imageName: ''
  };

  handleFormSubmit = imageName => {
    this.setState({imageName})
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery value={this.state.imageName} />
      </>
    )
  }
};
