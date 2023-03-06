import { Component } from 'react';
import { getImage } from '../../services/GetImage';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Loader } from '../loader/Loader';
import { Button } from '../button/Button';
import { List, ListItem } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    totalHits: null,
  };

  componentDidUpdate(prevProps) {
    const prevName = prevProps.value;
    const nextName = this.props.value;

    if (prevName !== nextName || prevProps.page !== this.props.page) {
      this.setState({ loading: true, images: [], totalHits: null });

      setTimeout(() => {
        getImage(nextName.trim(), this.props.page)
          .then(resp => {
            if (resp.ok) {
              return resp.json();
            }

            return Promise.reject(
              new Error(
                'Sorry, there are no images matching your search query. Please try again.'
              )
            );
          })
          .then(images => {
            if (images.totalHits === 0) {
              return Promise.reject(
                new Error(
                  'Sorry, there are no images matching your search query. Please try again.'
                )
              );
            }
            return this.setState(prevState => ({
              images:
                this.props.page === 1
                  ? images.hits
                  : [...prevState.images, ...images.hits],
              totalHits: images.totalHits,
            }));
          })
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ loading: false }));
      }, 3000);
    }
  }

  render() {
    const { images, loading, error, totalHits } = this.state;

    return (
      <>
        {error && <h1>{error.message}</h1>}
        {loading && <Loader />}
        <>
          <List>
            {images.map(image => {
              return (
                <ListItem key={image.id}>
                  <ImageGalleryItem image={image} />
                </ListItem>
              );
            })}
          </List>
          {images.length < totalHits && (
            <Button onClick={this.props.handleLoad} />
          )}
        </>
      </>
    );
  }
}
