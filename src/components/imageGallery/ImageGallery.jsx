import { Component } from 'react';
import { getImage } from '../../services/GetImage';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Loader } from '../loader/Loader';
import { Button } from '../button/Button';
import { List, ListItem } from './ImageGallery.styled';

export class ImageGallery extends Component {
    state = {
        images: null,
        loading: false,
        error: null,
        page: 1
    }

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.value;
        const nextName = this.props.value;

        if (prevName !== nextName ||
            prevState.page !== this.state.page) {
            this.setState({ loading: true, images: null })
           
            getImage(nextName.trim(), this.state.page)
                .then(resp => {
                    if (resp.ok) {
                        return resp.json()
                    }

                    return Promise.reject(new Error('Sorry, there are no images matching your search query. Please try again.'))
                })
                .then(images => {
                    console.log(images)
                    if (images.totalHits === 0) {
                        return Promise.reject(new Error('Sorry, there are no images matching your search query. Please try again.')) 
                    }
                  
                    return this.setState({ images: { hits: [...images.hits] } })
                })
                .catch(error => this.setState({ error }))
                .finally(() => this.setState({loading: false}))
        }
    };

    handleButton = () => {
        this.setState((prev) => ({ page: prev.page + 1 }))
    }

    render() {
        const { images, loading, error } = this.state;

        return <>
            {error && <h1>{error.message}</h1>}
            {loading && <Loader />}
            {images && <>
                <List>{images.hits.map(image => {
                return <ListItem key={image.id}>
                    <ImageGalleryItem image={image} />
                </ListItem>
            })}
            </List>
                <Button onClick={this.handleButton} />
                </>
            }
        </>      
    }
}




 