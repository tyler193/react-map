import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { load_google_maps } from './utility.js'

class App extends Component {

  componentDidMount() {
    let googleMaps = load_google_maps();

    Promise.all([
      googleMaps
    ]).then(values => {
      console.log(values);
    })

  }

  render() {
    return (
      <div id="google-map">

      </div>
    );
  }
}

export default App;
