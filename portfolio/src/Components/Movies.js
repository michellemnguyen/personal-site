import React, { Component } from 'react';
import axios from "axios"; 
import Lightbox from 'react-image-lightbox';
import '../milligram.css'

const omdb_api_key = '1bfcf4bf'
const api_url = 'https://www.ombdapi.com/?apikey='+omdb_api_key+'&i=' // needs IMDB ID

let movies_list = ['tt0381707', 'tt0878804', 'tt0109830', 'tt0245429', 'tt0095016', 'tt0268978', 'tt0319343', 'tt0119177']
// White Chicks, The Blind Side, Forrest Gump, Spirited Away, Die Hard, A Beautiful Mind, Elf, Gattaca

class Movies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moviePosters: []
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
    */

    render() {
        return (
            <div>
                
                <div className='title'>
                    <h1>Movie Database</h1>
                </div>

                <div class='lowerBody'>



                </div>

            </div>
        );
    }
}

async function getPosterSrc(posterID) {
    try {
        const response = await axios.get(api_url+posterID);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export default Movies;