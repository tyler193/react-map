import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { load_google_maps, places } from './utility.js'
//import Map from './components/Map.js'
//import Sidebar from './components/Sidebar.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  componentDidMount() {
    let googleMaps = load_google_maps();
    let loadPlaces = places();

    //Load map and venues
    Promise.all([
      googleMaps,
      loadPlaces
    ]).then(values => {
      let google = values[0];
      let venues = values[1].response.venues;
      this.google = google;
      this.markers = [];

      //Render google map
      this.map = new google.maps.Map(document.getElementById('google-map'), {
        zoom: 13,
        scrollwheel: true,
        center: { lat: venues[0].location.lat, lng: venues[0].location.lng }
      });

      this.infowindow = new google.maps.InfoWindow();

      //Place marker at each venue
      venues.forEach(venue => {
        let marker = new google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          animation: google.maps.Animation.DROP
        });

        //Set animation to markers with timer. Thanks to Ryan Waite on the help :)
//       marker.addListener('click', () => {
//          if (marker.getAnimation() !== null) {
//            marker.setAnimation(null);
//          } else {
//            marker.setAnimation(google.map.Animation.BOUNCE);
//          }
//          setTimeout(() => {marker.setAnimation(null)}, 1000);
//        });
//        google.maps.event.addListener('click', () => {
//          this.infowindow.setContent(marker.name);
//          this.map.setCenter(marker.position);
//          this.infowindow.open(this.map, marker);
//          this.map.panBy(0, -125)
//        });

        this.markers.push(marker);
      });
      this.setState({ filteredVens: this.venues });
    })
  }

/*
  itemClick = (venue) => {
    let marker = this.markers.filter(mark => mark.id === venue.id[0]);
    this.infowindow.setContent(marker.name);
    this.infowindow.open(this.map, marker);
    this.map.setCenter(marker.position);
    this.map.panBy(0, -125);
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(this.google.maps.Animation.BOUNCE);
    }
    setTimeout(() => {marker.setAnimation(null) }, 1000);
  }

*/
  //Filters venues as a query is entered into input field
  filterVens(query) {
    //let fil = this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
      marker.setVisible(true) :
      marker.setVisible(false);
      console.log(marker);
    });
    this.setState({ query });
  }

  render() {
    return (
      <div>
        <div id="google-map">

        </div>

        <div id="sidebar">
        <input value={this.state.query} onChange={(event) => {this.filterVens(event.target.value)}}/>

        </div>
      </div>
    );
  }
}

export default App;
