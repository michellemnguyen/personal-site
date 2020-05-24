import React, { Component } from 'react';
import Home from './Home';
import Projects from './Projects';
import Travel from './Travel';
import About from './About';
import Guestbook from './Guestbook';
import Movies from './Movies';
import AddMovies from './AddMovies';
import Page404 from './Page404';

class Body extends Component {

    displayContent = () => {
        let activeTab = this.props.activeTab;
        switch (activeTab) {
            case 1:
                return (<Home/>);
            case 2:
                return (<Projects/>);
            case 3:
                return (<Travel/>);
            case 4:
                return (<About/>);
            case 5:
                return (<Guestbook/>);
            case 6:
                return (<Movies/>);
            case 7:
                return (<AddMovies/>);  
            default:
                return (<Page404/>);
        }
    }

    render() {
        return (
            this.displayContent()
        );
    }
}

export default Body;