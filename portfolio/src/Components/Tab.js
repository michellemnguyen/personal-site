import React, { Component } from 'react';

class Tab extends Component {

    setActive = () => {
        if (this.props.tab.id === this.props.activeTab) {
            return {
                backgroundColor: 'blue',
            }
        } else {
            return {
                backgroundColor: 'yellow',
            }
        }
    }

    render() {
        return (
            <div className='tab' 
                 style={this.setActive()}
                 onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
                <h3>{this.props.tab.title}</h3>
            </div>
        );
    }
}

export default Tab;