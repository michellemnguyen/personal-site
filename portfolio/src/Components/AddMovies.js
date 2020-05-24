import React, { Component } from 'react';
import firebase from '../firebase'
import axios from "axios"; 
import '../milligram.css'

const api_url = 'https://www.omdbapi.com/?apikey=1bfcf4bf&i=' // needs IMDB ID

const validateForm = (errors, imdbID) => {
    let valid = true;
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    if (imdbID.length === 0) {
        valid = false
    }
    return valid;
};

class AddMovies extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imdbID: '',
            errors: {
                imdbID: ''
            },
            movieObject: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const {name, value} = e.target;
        let errors = this.state.errors;

        switch (name) {

            case 'imdbID':
                errors.imdbID = value.length < 9
                                ? 'IMDB ID must be a valid, existing ID.'
                                : '';
                break;
            default:
                break;

        }

        this.setState({errors, [name]: value});

    }

    handleSubmit(e) {

        // prevent page from refreshing
        e.preventDefault(); 

        if(validateForm(this.state.errors, this.state.imdbID)) {
            console.info('Valid Form');
        } else {
            alert('There is an error with your submission. Please check if the IMDB ID is correct.');
            return;
        }

        // make api call to get the desired data
        axios.get(api_url+this.state.imdbID)
            .then(res => {
                let movieObject = res.data;

                // tell firebase where to store our form data
                const moviesRef = firebase.database().ref('movieList/' + movieObject.imdbID);

                let newMovie = {
                    title: movieObject.Title,
                    director: movieObject.Director,
                    rating: movieObject.imdbRating,
                    poster: movieObject.Poster,
                    imdbID: movieObject.imdbID
                };
                console.log(newMovie);

                // package the movie data into an object, store in state
                this.setState({movieObject: newMovie});

                 // send movie to firebase
                moviesRef.push(newMovie);

                // tell user the movie they've submitted
                alert('The movie ' + newMovie.title + ' has been added to the database.');

            }).catch(err => {
                console.log(err);
        });

        // reset items in the form to empty
        this.setState({
            imdbID: '',
            movieObject: ''
        });
    }

    render() {

        const {errors} = this.state;

        return (
            <div>
                <div className='title'>
                    <h1>Add New Movie</h1>
                </div>

                <div className='lowerBody'>
                    <div className='article'>
                        Here you can add a new movie.

                        <form onSubmit={this.handleSubmit}>
                            <label>Enter the IMDB ID of the movie you would like to add.</label>
                            <input type="text" name="imdbID" placeholder="IMDB Movie ID" 
                                onChange={this.handleChange} value={this.state.name} />
                            {errors.imdbID.length > 0 && <div className='error'>{errors.imdbID}</div>}
                            <button>Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default AddMovies;