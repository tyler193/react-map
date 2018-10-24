import React, { Component } from 'react';
import Map from './Map.js';
import '../App.css';
import { load_google_maps, places } from '../utility.js';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }


  render() {
    return (
      <div id="sidebar">
        <input value={this.props.query} onChange={(event) => {this.props.filtVens(event.target.value)}}/>
        {
          this.props.filteredVens && this.props.filteredVens.length > 0 && this.state.filteredVens.map((venue, index) => (
            <div key={index} className='ven-item' onClick{() => { this.props.itemClick(venue) }}>
              {venue.name}
              </div>
          ))
        }
      </div>
    );
  }
}

export default Sidebar;
