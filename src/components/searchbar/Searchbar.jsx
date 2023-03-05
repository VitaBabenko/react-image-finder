import { Component } from 'react';

export class Searchbar extends Component {
    state = {
        imageName: ''
    };

    handleNameChange = evt => {
        this.setState({ imageName: evt.currentTarget.value.toLowerCase() })
    };

    handleSubmit = evt => {
        evt.preventDefault();
        const { imageName } = this.state;

        if (imageName.trim() === '') {
            alert("Fill out the form, please!")
            return;
        };
        
        this.props.onSubmit(imageName);
        this.setState({ imageName: ''})
    };

    render() {
        return (
            <header>
                <form onSubmit={this.handleSubmit}>
                    <button type="submit">
                        <span>Search</span>
                    </button>
                    
                    <input
                        type="text"
                        name="imageName"
                        value={this.state.imageName}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleNameChange}
                    />
                </form>
            </header>
        )
    }
}