import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import { load_google_maps, places } from './utility.js'
import Map from './components/Map.js'
import Sidebar from './components/Sidebar.js'

class App extends Component {

  render() {
    return (
      <div>
        <Map />
        <Sidebar />
      </div>
    );
  }
}

export default App;
