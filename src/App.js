import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { load_google_maps, places } from './utility.js'
import Map from './components/Map.js'
import Sidebar from './components/Sidebar.js'

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }
/*
  componentDidMount() {


    let googleMaps = load_google_maps();
    let loadPlaces = places();

    //Load map and venues
    Promise.all([
      googleMaps,
      loadPlaces
    ]).then(values => {
      let google = values[0];
      this.venues = values[1].response.venues;
      this.google = google;
      this.markers = [];
      this.infowindow = new google.maps.InfoWindow();

      //Render google map
      this.map = new google.maps.Map(document.getElementById('google-map'), {
        zoom: 13,
        scrollwheel: true,
        center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng }
      });


      //Place marker at each venue
      this.venues.forEach(venue => {
        let marker = new google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          venue: venue,
          id: venue.id,
          name: venue.name,
          animation: google.maps.Animation.DROP
        });


        //Set animation to markers with timer.
        //Thanks to Ryan Waite on the help :)
       marker.addListener('click', () => {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
          setTimeout(() => { marker.setAnimation(null) }, 800);
        });


        //Display infowindow when marker is clicked.
        //Thanks to Ryan for the tips on this as well :)
        google.maps.event.addListener(marker, 'click', () => {
          this.infowindow.setContent(marker.name);
          this.infowindow.open(this.map, marker);
        });

        this.markers.push(marker);
      });
      this.setState({ filteredVens: this.venues });
    })
  }


  //Filters venues as a query is entered into input field
  filterVens = (query) => {
    let filter = this.venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
      marker.setVisible(true) :
      marker.setVisible(false);
      //console.log(marker);
    });
    this.setState({ filteredVens: filter, query });
  }


  //Animates and displays info when list item is clicked
    listItems = (venue) => {
      let marker = this.markers.filter(mark => mark.id === venue.id)[0];
      this.infowindow.setContent(marker.name);
      this.infowindow.open(this.map, marker);
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(this.google.maps.Animation.BOUNCE);
      }
      setTimeout(() => {marker.setAnimation(null) }, 1000);
    }


*/

  render() {
    return (
      <div>
        <Map />

        <Sidebar listItems={this.listItems}
                 filterVens={this.filterVens}
                 filteredVens={this.state.filteredVens} />


      </div>
    );
  }
}

export default App;
