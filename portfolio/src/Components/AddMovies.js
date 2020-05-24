import React, { Component } from 'react';

class AddMovies extends Component {
    render() {
        return (
            <div>
                <div className='title'>
                    <h1>Add New Movie</h1>
                </div>

                <div className='lowerBody'>
                    <div className='article'>
                        Here you can add a new movie.
                    </div>
                </div>
            </div>
        );
    }
}

export default AddMovies;