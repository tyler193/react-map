import React, { Component } from 'react';
import '../App.css';
import { load_google_maps, places } from '../utility.js'

class Map extends Component {

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
        this.markers.push(marker);
      });
    })

  }

  render() {
    return (
        <div id="google-map">

        </div>
    );
  }
}

export default Map;
