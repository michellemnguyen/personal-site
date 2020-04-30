import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import YouTube from 'react-youtube';

import swe from './../Images/helsingborg.jpg';
import brussels from './../Images/brussels-wide.jpg';
import ams from './../Images/amsterdam.jpg';
const images = [swe, brussels, ams];  

class Travel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }

    render() {

        const { photoIndex, isOpen } = this.state;

        const videoOpts = {
            height: '100%',
            width: '100%',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            },
          };

        return (
            <div>

                <div className="title">
                    <h1>Travel</h1>
                </div>

                <div className="lowerBody">
                        <div className='article2'>
                            <h2>One Second a Day Abroad</h2>
                            <i>we get it u studied abroad</i>
                            <br/><br/>
                            <YouTube videoId="5_dbVMXtqNs" opts={videoOpts} />                       
                        </div>
                        <div className='article2'>
                            <h2>Summer 2018 in Sweden</h2>
                            Some clips from just the summer portion
                            <br/><br/>
                            <YouTube videoId="BCly0NsWc-g" opts={videoOpts}/>
                        </div>
                </div>

                <p></p>

                <div className="lowerBody">
                    <div className='article3'>
                        <h2>Helsingborg, Sweden</h2><br/>
                            <img src={swe} alt='' onClick={() => this.setState({ isOpen: true })}/>
                    </div>
                    <div className='article3'>
                        <h2>Brussels, Belgium</h2><br/>
                            <img src={brussels} alt='' onClick={() => this.setState({ isOpen: true })}/>
                    </div>
                    <div className='article3'>
                        <h2>Amsterdam, The Netherlands</h2><br/>
                            <img src={ams} alt='' onClick={() => this.setState({ isOpen: true })}/>
                    </div>
                </div>

                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                        this.setState({
                            photoIndex: (photoIndex + images.length - 1) % images.length,
                        })
                        }
                        onMoveNextRequest={() =>
                        this.setState({
                            photoIndex: (photoIndex + 1) % images.length,
                        })
                        }
                    />
                )}

            </div>
        );
    }
}

export default Travel;