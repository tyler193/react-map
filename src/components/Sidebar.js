import React, { Component } from 'react';
//import Map from './Map.js';
import '../App.css';
//import App from '../App.js';


class Sidebar extends Component {

//  constructor(props) {
//    super(props);
//  }



  render() {
    return (
    <aside>
      <div id="sidebar">
        <p id='search-heading'>Search for Venues</p>
        <input tabIndex='1' type='text' className='text-input' placeholder='Search...' value={this.props.query} onChange={(event) => { this.props.filterVens(event.target.value) }}/>
      <br/>
      {
        this.props.filteredVens && this.props.filteredVens.length > 0 && this.props.filteredVens.map((venue, index) => (
          <div tabIndex='2' className='venue-list' key={index} onClick={() => { this.props.listItems(venue) }}>
            {venue.name}
            <br/>
            <br/>
            {venue.location.address}
          </div>
        ))
      }
      </div>
    </aside>
    );
  }
}

export default Sidebar;
