import React, { Component } from 'react';
import TabList from './Components/TabList';
import Body from './Components/Body';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      activeTab: 1 // default: Home
    }
    this.changeTab = (id) => {
      this.setState(
        {
          activeTab: id
        }
      )
    }
  }

  render() {

    this.tabs = [
      {
        id: 1,
        title: 'Home'
      },
      {
        id: 2,
        title: 'Projects'
      },
      {
        id: 3,
        title: 'Travel'
      },
      {
        id: 4,
        title: 'About'
      }
    ]

    return (
      <div className='body'>
        <div className='nav-bar'>
          <TabList tabs={this.tabs} 
                   activeTab={this.state.activeTab}
                   changeTab={this.changeTab}/>
        </div>
        <div className='actual-body'>
          <Body activeTab={this.state.activeTab}/>
        </div>
      </div>
    );
  }
}

export default App;