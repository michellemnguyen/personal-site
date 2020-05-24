import React, { Component } from 'react';

class Tab extends Component {

    setActive = () => {
        if (this.props.tab.id === this.props.activeTab) {
            return {
                'borderBottom': '3px solid rgb(68, 190, 190)'
            }
        } else {
            return {
                'borderBottom': '3px solid darkgray'
            }
        }
    }

    render() {

        if (this.props.tab.id !== 6) {
            return (
                <div className='nav-tab' 
                     style={this.setActive()}
                     onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
                    {this.props.tab.title}
                </div>
            );
        } else {
            return (
                <div className='dropdown'>
                    <div className='nav-tab-dropdown' style={this.setActive()} onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
                        {this.props.tab.title}
                    </div>
                    <div className='dropdown-content'>
                        <a href='#gallery' onClick={this.props.changeTab.bind(this, this.props.tab.id)}>Movie Gallery</a>
                        <a href='#addMovie' onClick={this.props.changeTab.bind(this, 7)}>Add New Movie</a>
                        <a href='#createList' onClick={this.props.changeTab.bind(this, 8)}>Create Movie List</a>
                    </div>
                </div>
            );
        }
    }
}

export default Tab;