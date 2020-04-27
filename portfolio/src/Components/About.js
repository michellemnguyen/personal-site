import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div>
                <div className='title'>
                    <h1>About Me</h1>
                </div>

                <div className='lowerBody'>
                        <div className='article2'>
                            <h2>How I Got Started in CS</h2>
                            Well, this comic is a very accurate representation of me @ age 12.
                            <br/>
                            <img src='https://preview.redd.it/fv2c69uvvog41.jpg?width=960&crop=smart&auto=webp&s=e1913cbd6b97bb521bc080edd973b33b2fd5437e' 
                                    width='300px' alt=''/>
                        </div>
                    
                        <div className='article2'>
                            <h2>I'm Michelle. Say hi!</h2>
                            <img src="https://capstone.cs.ucsb.edu/team_docs_20/pics/well/nguyen.png" width="30%" alt=''/>
                            <br/><br/>Email: michellehnguyen@gmail.com
                            <br/>LinkedIn: <a href='https://www.linkedin.com/in/michelle-mh-nguyen/' >/michelle-mh-nguyen</a>
                        </div>

                </div>
            </div>
        );
    }
}

export default About;