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
      //console.log(this.venues);
      this.google = google;
      this.markers = [];
      this.infowindow = new google.maps.InfoWindow({
        maxWidth: 150
      });

      //Render google map
      this.map = new google.maps.Map(document.getElementById('google-map'), {
        zoom: 13,
        scrollwheel: true,
        center: { lat: this.venues[0].location.lat, lng: this.venues[0].location.lng },
        //Snazzy Maps styling
        styles:
                [
                    {
                        "featureType": "all",
                        "elementType": "all",
                        "stylers": [
                            {
                                "invert_lightness": true
                            },
                            {
                                "saturation": "-9"
                            },
                            {
                                "lightness": "0"
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "all",
                        "stylers": [
                            {
                                "weight": "1.00"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "weight": "0.49"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "weight": "0.01"
                            },
                            {
                                "lightness": "-7"
                            },
                            {
                                "saturation": "-35"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    }
                ]
      });


      //Place marker at each venue & define info
      this.venues.forEach(venue => {
        console.log(venue);
        let marker = new google.maps.Marker({
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: this.map,
          id: venue.id,
          name: venue.name,
          add: venue.location.address,
          friends: venue.hereNow.summary,
          animation: google.maps.Animation.DROP
        });


        //Set animation to markers with timer when clicked
        //Thanks to Ryan Waite on the help :)
       marker.addListener('click', () => {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
          setTimeout(() => { marker.setAnimation(null) }, 800);
        });


        //Display infowindow when marker is clicked
        //Thanks to Ryan for the tips on this as well :)
        google.maps.event.addListener(marker, 'click', () => {
          if (marker.add === undefined) {
            this.infowindow.setContent(marker.name);
          } else {
            this.infowindow.setContent(marker.name + `<br/>` + marker.add + `<br/>` + marker.friends);
          }
          this.infowindow.open(this.map, marker);
          this.map.setCenter(marker.position);
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
      //console.log(marker);
      if (marker.name.toLowerCase().includes(query.toLowerCase()) === true) {
        marker.setVisible(true);
      } else {
        marker.setVisible(false);
      }
    });
    this.setState({ filteredVens: filter, query });
  }


  //Animates marker and displays info in infowindow when list item is clicked
    listItems = (venue) => {
      let marker = this.markers.filter(mark => mark.id === venue.id)[0];
      if (marker.add === undefined) {
        this.infowindow.setContent(marker.name);
      } else {
        this.infowindow.setContent(marker.name + `<br/>` + marker.add);
      }
      this.infowindow.open(this.map, marker);
      this.map.setCenter(marker.position);
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(this.google.maps.Animation.BOUNCE);
      }
      setTimeout(() => {marker.setAnimation(null) }, 1000);
    }




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
