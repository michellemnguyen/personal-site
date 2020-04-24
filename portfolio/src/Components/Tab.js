import React, { Component } from 'react';

class Tab extends Component {

    setActive = () => {
        if (this.props.tab.id === this.props.activeTab) {
            return {
                'border-bottom': '3px solid rgb(68, 190, 190)'
            }
        } else {
            return {
                'border-bottom': '3px solid darkgray'
            }
        }
    }

    render() {
        return (
            <div className='nav-tab' 
                 style={this.setActive()}
                 onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
                {this.props.tab.title}
            </div>
        );
    }
}

export default Tab;