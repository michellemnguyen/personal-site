import React, { Component } from 'react';
import { SRLWrapper } from "simple-react-lightbox";
import YouTube from 'react-youtube';

import swe from './../Images/helsingborg.jpg';
import brussels from './../Images/brussels-wide.jpg';
import ams from './../Images/amsterdam.jpg';

class Travel extends Component {
    render() {

        const videoOpts = {
            height: '390',
            width: '640',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            },
          };

        return (
            <div>
                {/* <div className='page-title'>Travel</div> */}

                {/* TWO VIDEOS, SIDE BY SIDE */}
                {/* <div className='travel-entry'>
                    <div className='video-container'>
                        <iframe title="1 Second/Day" src="https://www.youtube.com/embed/5_dbVMXtqNs" frameborder="0" width="100%" height="250%"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className='video-container'>
                        <iframe title="summer 2018" src="https://www.youtube.com/embed/BCly0NsWc-g" frameborder="0" width="100%" height="250%"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div> */}

                <div className="title">
                    <h1>Travel</h1>
                </div>

                <div className="lowerBody">
                        <div className='article2'>
                            <h2>One Second a Day Abroad</h2>
                            <i>we get it u studied abroad</i>
                            <br/>
                            <br/>
                            <YouTube videoId="5_dbVMXtqNs" opts={videoOpts} />;                        
                        </div>
                        <div className='article2'>
                            <h2>Summer 2018 in Sweden</h2>
                            Some clips from just the summer portion
                            <br/><br/>
                                <YouTube videoId="BCly0NsWc-g" opts={videoOpts}/>;
                        </div>
                </div>

                <p></p>

                <SRLWrapper>
                <div className="lowerBody">
                    <div className='article3'>
                        <h2>Helsingborg, Sweden</h2><br/>
                            <img src={swe} alt=''/>
                    </div>
                    <div className='article3'>
                        <h2>Brussels, Belgium</h2><br/>
                            <img src={brussels} alt=''/>
                    </div>
                    <div className='article3'>
                        <h2>Amsterdam, The Netherlands</h2><br/>
                            <img src={ams} alt=''/>
                    </div>
                </div>
                </SRLWrapper>

            </div>
        );
    }
}

export default Travel;