import React, { Component } from 'react';
import firebase from '../firebase'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import '../milligram.css'

// let movies_list = ['tt0381707', 'tt0878804', 'tt0109830', 'tt0245429', 'tt0095016', 'tt0268978', 
//                     'tt0319343', 'tt0119177', 'tt0119116', 'tt0816692', 'tt0910970', 'tt0099785',
//                     'tt3104988', 'tt0162222', 'tt0360717', 'tt0486655', 'tt1049413', 'tt0097165',
//                     'tt1431045', 'tt0091042', 'tt0241527', 'tt1375666']
// White Chicks, The Blind Side, Forrest Gump, Spirited Away, Die Hard, A Beautiful Mind,
// Elf, Gattaca, The Fifth Element, Interstellar, Wall-E, Home Alone
// Crazy Rich Asians, Cast Away, King Kong, Stardust, Up, Dead Poet's Society
// Deadpool, Ferris Bueller's Day Off, Harry Potter, Inception

/*

TODO:

1.1 - Add new movie
------------
- DONE

1.2 - Delete a movie
------------
- need to delete from ALL databases
- tbd when modal fixed

1.3 - Display movies
------
- DONE

1.4 - Create new list
------
- DONE

1.5 - Choose the list to display
------
- currently have the ability to command an onClick() to show specific list, 
    just need to implement the onClick()/helper function

1.6 - Add a movie to a list
------
- tbd when modal fixed

1.7 - Search for a movie
------
- 

1.8 - Pagination
------
- tbd after everything

*/
class Movies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moviesList: [],
            listOfLists: [],
            titleSearch: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        console.log('called component did mount')

        let currentComponent = this;

        // load movies to display into state
        firebase.database().ref('/movieList/All/').once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                childSnapshot.forEach(function(grandSnapshot) {
                    var movieObject = grandSnapshot.val();

                    // create object with data
                    let newMovie = {
                        title: movieObject.title,
                        director: movieObject.director,
                        rating: movieObject.rating,
                        poster: movieObject.poster,
                        imdbID: movieObject.imdbID
                    }

                    if (newMovie.title !== undefined) {
                        // place into state
                        currentComponent.setState(prevState => ({
                            moviesList: [...prevState.moviesList, newMovie]
                        }))
                    }
                        
                });
              });
        });

        // load listNames to dropdown into state
        firebase.database().ref('/movieList/').once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                let listName = childSnapshot.key;
                currentComponent.setState(prevState => ({
                    listOfLists: [...prevState.listOfLists, listName]
                }))
            });
        });
          
    }

    renderCustomList(e, listName) {

        e.preventDefault();
        
        console.log('called render custom list')

        let currentComponent = this;

        // clear out state
        // currentComponent.setState({moviesList: []})

        // read from firebase with specific list
        firebase.database().ref('/movieList/' + 'Watched' + '/').once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                childSnapshot.forEach(function(grandSnapshot) {
                    var movieObject = grandSnapshot.val();

                    // create object with data
                    let newMovie = {
                        title: movieObject.title,
                        director: movieObject.director,
                        rating: movieObject.rating,
                        poster: movieObject.poster,
                        imdbID: movieObject.imdbID
                    }

                    if (newMovie.title !== undefined) {
                        // place into state
                        currentComponent.setState(prevState => ({
                            moviesList: [...prevState.moviesList, newMovie]
                        }))
                    }
                        
                });
              });
        });
    }

    handleChange(e) {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {

        e.preventDefault(); 

        // get movie name
        let targetName = this.state.titleSearch;
        console.log(targetName);

        let foundMovie = false;

        // connect to firebase to search through all movies 
        firebase.database().ref('/movieList/All/').once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                childSnapshot.forEach(function(grandSnapshot) {
                    let currMovieObject = grandSnapshot.val();
                    let currTitle = currMovieObject.title;
                    if (currTitle === targetName){
                        foundMovie = true;

                        // display ONLY that movie below now
                    } 
                });
            });

            if (!foundMovie) {
                console.log('Movie does not exist in database');
            }
        });
        
        // reset item search to empty
        this.setState({
            titleSearch: ''
        });
    }

    render() {
        
        return (
            <div>
                
                <div className='title'>
                    <h1>Movie Database</h1>
                </div>

                <div className='lowerBody'>
                    <div className='article'>
                        <form onSubmit={this.handleSubmit}>
                            <label>Type the name of the movie you're searching for</label>
                            <input type="text" name="titleSearch" placeholder="New Custom List Name" 
                                onChange={this.handleChange} value={this.state.name} />
                            <button>Search</button>
                        </form>
                    </div>
                </div>

                <p></p>

                <div className='lowerBody'>

                    <div className='article'> 

                    <div className="dropdown">
                        <button className="dropbtn">Select List</button>
                        <br/><br/>
                        <div className="dropdown-content">
                            { this.state.listOfLists.map((listName) => {
                                return (
                                    <a href=' ' key={listName}
                                       onClick={() => this.renderCustomList(listName)}>{listName}</a>
                                )
                            }) 
                            }
                        </div>
                    </div>

                    <p>
                        { this.state.moviesList.map((movie) => {

                            if (movie.title !== '' || movie.title !== undefined) {
                                let movieTitle = movie.title;
                                let movieDirector = movie.director;
                                let movieRating = movie.rating;
                                let altInfo = movieTitle + ' | Directed by ' + movieDirector + ' | IMDB Rating: ' + movieRating;
                                
                                return (
                                    <img className='movie' 
                                        alt={altInfo} 
                                        key={movie.imdbID} 
                                        src={movie.poster}
                                    />
                                )
                            }
                            
                        })
                    }
                    </p>

                    </div>
                </div>

            </div>
        );
    }
}

export default Movies;