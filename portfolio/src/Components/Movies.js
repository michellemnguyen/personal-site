import React, { Component } from 'react';
import axios from "axios"; 
import firebase from '../firebase'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import '../milligram.css'

const api_url = 'https://www.omdbapi.com/?apikey=1bfcf4bf&i=' // needs IMDB ID

let movies_list = ['tt0381707', 'tt0878804', 'tt0109830', 'tt0245429', 'tt0095016', 'tt0268978', 
                    'tt0319343', 'tt0119177', 'tt0119116', 'tt0816692', 'tt0910970', 'tt0099785']
// White Chicks, The Blind Side, Forrest Gump, Spirited Away, Die Hard, A Beautiful Mind,
// Elf, Gattaca, The Fifth Element, Interstellar, Wall-E, Home Alone

// let options = {mode: 'cors', headers: { 'Access-Control-Allow-Origin': true }}

class Movies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moviesList: []
        }
    }

    /*
    ---------
    THE PLAN
    ---------
        1. Get each of the movie's JSON data using the API call
        2. Grab each movie's poster from the json to display in grid
        3. Add lightbox to each of the images
        4. Add the corresponding movie information using the json

    ---------------------------
    IMPLEMENTATION BRAINSTORM
    ---------------------------
        - Do I dynamically load each movie's JSON information on click or should I store it beforehand?
            - Note: doing this with a large # of movies -> high loading time for the page
            - Would store in state
        - If I do the above, should I dynamically load the images onto the page as well,
            or should I prestore the poster urls & load everything at runtime?
        - Can probably use a map function to run through the poster URLs and put all the images onto the page
        - Can also use map function to run through each of the imdb ID's and get each movie's information
    */

    componentDidMount() {

        firebase.database().ref('/movieList/').once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                childSnapshot.forEach(function(grandSnapshot) {
                    var movieObject = grandSnapshot.val();
                    console.log(movieObject.director);
                });
              });
        });
          

        movies_list.map((posterID) => {
            axios.get(api_url+posterID)
            .then(res => {
                let movieObject = res.data
                let newMovie = {
                    title: movieObject.Title,
                    director: movieObject.Director,
                    rating: movieObject.imdbRating,
                    poster: movieObject.Poster,
                    imdbID: movieObject.imdbID
                }
                this.setState(prevState => ({
                    moviesList: [...prevState.moviesList, newMovie]
                }))
            }).catch(err => {
                console.log(err);
            });
            return (
                console.log('Got data from: ' + api_url+posterID)
            )
        })
    }

    render() {
        
        return (
            <div>
                
                <div className='title'>
                    <h1>Movie Database</h1>
                </div>

                <div className='lowerBody'>
                    <div className='article'> 
                    <SimpleReactLightbox>

                    <SRLWrapper>
                    { this.state.moviesList.map((movie) => {
                        
                        let movieTitle = movie.title;
                        let movieDirector = movie.director;
                        let movieRating = movie.rating;
                        let altInfo = movieTitle + ' | Directed by ' + movieDirector + ' | IMDB Rating: ' + movieRating;
                        
                        return (
                            <img className='movie' alt={altInfo} key={movie.imdbID} src={movie.poster}/>
                        )
                      })
                    }
                    </SRLWrapper>
                    
                    </SimpleReactLightbox>
                    </div>
                </div>

            </div>
        );
    }
}

export default Movies;