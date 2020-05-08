import React, { Component } from 'react';
import './../App.css';

class Home extends Component {

    render() {
        return (
            <div>
                <div className="title">
                     {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                    <h1>Hello, world 🌎</h1>
                </div>

                <div className="lowerBody">
                    <div className="article">
                    Howdy stranger! Welcome to my portfolio website. It's very unfinished so pls don't mind the mess :)
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;