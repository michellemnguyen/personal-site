import React, { Component } from 'react';
import Tab from './Tab';

class TabList extends Component {
    render() {
        return this.props.tabs.map((tab, id) => (
            <Tab tab={tab} 
                 activeTab={this.props.activeTab}
                 changeTab={this.props.changeTab}
                 key={id}/>
        ));
    }
}

export default TabList;