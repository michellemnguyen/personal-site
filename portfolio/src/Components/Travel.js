import React, { Component } from 'react';

class Travel extends Component {
    render() {
        return (
            <div>
                <div className='page-title'>Travel</div>

                {/* TWO VIDEOS, SIDE BY SIDE */}
                <div className='travel-entry'>
                    <div className='video-container'>
                        <iframe title="1 Second/Day" src="https://www.youtube.com/embed/5_dbVMXtqNs" frameborder="0" width="100%" height="250%"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className='video-container'>
                        <iframe title="summer 2018" src="https://www.youtube.com/embed/BCly0NsWc-g" frameborder="0" width="100%" height="250%"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>

                {/* SWEDEN PHOTO, GOLDEN RULE */}

                {/* DENMARK PHOTO, GOLDEN RULE */}

                {/* AMSTERDAM PHOTO, GOLDEN RULE */}

                {/* UK PHOTOS, GOLDEN RULE */}
            </div>
        );
    }
}

export default Travel;