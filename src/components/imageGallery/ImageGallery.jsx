import { Component } from 'react';
import { getImage } from '../../services/GetImage';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Loader } from '../loader/Loader';

export class ImageGallery extends Component {
    state = {
        images: null,
        loading: false
    }

    componentDidUpdate(prevProps) {
        const prevName = prevProps.value;
        const nextName = this.props.value;

        if (prevName !== nextName) {
            this.setState({loading: true})
            getImage(nextName)
                .then(resp => resp.json())
                .then(images => {
                    console.log(images)
                    this.setState({images})
                }).finally(() => {
                    this.setState({loading: false})
                })
        }
    }

    render() {
        return (
            <>
                {this.state.loading && <p>
                    <Loader />
                </p>}
                {this.state.images && this.state.images.hits.map(image => {
                    return <li key={image.id}>
                        <ImageGalleryItem image={image} />
                    </li>
                })}
            </>
        )
    }
}