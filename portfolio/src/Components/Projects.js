import React, { Component } from 'react';

import poster from './../Images/capstone_poster.png';

class Projects extends Component {
    render() {
        return (
            <div>
                <div class='title'>
                    <h1>Projects</h1>
                </div>

                <div class='lowerBody'>
                    <div class='article'>
                        <h2>Apollo - Senior Capstone Project</h2>
                        I'd say we did pretty well :)
                        <p>
                        <img src={poster} width='100%' alt=''/>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Projects;