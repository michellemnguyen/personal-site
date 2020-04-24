import React, { Component } from 'react';
import Home from './Home';
import Projects from './Projects';
import Travel from './Travel';
import About from './About';

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