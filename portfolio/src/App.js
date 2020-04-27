import React, { Component } from 'react';
import SimpleReactLightbox from "simple-react-lightbox";
import BackToTop from 'react-back-to-top';

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

        <BackToTop
            mainStyle={{
                width:'100%',
                height:'100%',
                background:'url(...)'
            }}
            percentStyle={{
                width:'100%',
                height:'100%',
            }}
            animate='none'
            offsetTop={20}
            step={50}
            percent={false}
            visiblePercent={100}
          />

        <div className='nav-bar'>
          <TabList tabs={this.tabs} 
                   activeTab={this.state.activeTab}
                   changeTab={this.changeTab}/>
        </div>
        <div className='actual-body'>
          <SimpleReactLightbox>
            <Body activeTab={this.state.activeTab}/>
          </SimpleReactLightbox>
        </div>
      </div>
    );
  }
}

export default App;