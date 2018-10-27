import React, { Component } from 'react';
import Map from './Map.js';
import '../App.css';
import '../App.js';


class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }


  render() {
    return (
      <div id="sidebar">
        <p id='search-heading'>Search for Venues</p>
        <input className='text-input' value={this.props.query} onChange={(event) => { this.props.filterVens(event.target.value) }}/>
      <br/>
      {
        this.props.filteredVens && this.props.filteredVens.length > 0 && this.props.filteredVens.map((venue, index) => (
          <div className='venue-list' key={index} onClick={() => { this.props.listItems(venue) }}>
            {venue.name}
          </div>
        ))
      }
      </div>
    );
  }
}

export default Sidebar;
