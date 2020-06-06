import React, { Component } from 'react';
import * as d3 from 'd3';

class MovieGraph extends Component {

    componentDidMount() {
        const elem = document.getElementById('mySvg');
        elem.appendChild(this.chart());
    }

    chart(nodes, links) {
        const width = 1920;
        const height = 1080;

        const svg = d3.create('svg').attr('viewBox', [0, 0, width, height]);

        return svg.node();
    }


    render() {
        return (
            <div>
                <div className='title'>
                    <h1>Movie Graph</h1>
                </div>

                <div className='lowerBody'><div className='article'>
                    
                    <div id='mySvg'>
                        hello
                    </div>
                            
                </div></div> 
            </div>
        );
    }
}

export default MovieGraph;