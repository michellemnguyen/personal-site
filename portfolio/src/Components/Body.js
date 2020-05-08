import React, { Component } from 'react';
import Home from './Home';
import Projects from './Projects';
import Travel from './Travel';
import About from './About';
import Guestbook from './Guestbook';

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
            default:
                return ('404');
        }
    }

    render() {
        return (
            this.displayContent()
        );
    }
}

export default Body;