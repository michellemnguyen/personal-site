import React, { Component } from 'react';
import axios from "axios"; 
import '../milligram.css'

const omdb_api_key = '1bfcf4bf'
const api_url = 'http://www.ombdapi.com/?apikey='+omdb_api_key+'&i=' // needs IMDB ID

let movies_list = ['tt0381707', 'tt0878804', 'tt0109830', 'tt0245429', 'tt0095016', 'tt0268978', 'tt0319343', 'tt0119177']
// White Chicks, The Blind Side, Forrest Gump, Spirited Away, Die Hard, A Beautiful Mind, Elf, Gattaca

class Movies extends Component {

     

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

export default Movies;