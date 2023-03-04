import { Component } from 'react';
import { getImage } from '../../services/GetImage';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Loader } from '../loader/Loader';

export class ImageGallery extends Component {
    state = {
        images: null,
        loading: false,
        error: null
    }

    componentDidUpdate(prevProps) {
        const prevName = prevProps.value;
        const nextName = this.props.value;

        if (prevName !== nextName) {
            this.setState({
                loading: true,
                images: null
            });

            setTimeout(() => {
                getImage(nextName)
                    .then(resp => {
                        if (resp.ok && resp.totalHits !== 0) {
                            return resp.json()
                        }

                        return Promise.reject(new Error('There are no images!'))
                    })
                    .then(images => {
                    console.log(images)
                    this.setState({images})
                })
                    .catch(error => {
                        console.log(error);
                        this.setState({error})
                    })
                    .finally(() => {
                    this.setState({loading: false})
                })
            }, 1000);
        }
    }

    render() {
        const { images, loading, error } = this.state;

        return (
            <>
                {error && <h1>{error.message}</h1> }
                {loading && <p>
                    <Loader />
                </p>}
                {images && images.hits.map(image => {
                    return <li key={image.id}>
                        <ImageGalleryItem image={image} />
                    </li>
                })}
            </>
        )
    }
}