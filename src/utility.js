//Utility file to store all APIs and miscellaneous functions used
//throughout the application


//Loading Google Maps - Thanks to Ryan Waite :)
export function load_google_maps() {

  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    }


    //Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = '${MAPS API}';
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.onerror = `googleError()`;
    script.async = true;
    document.body.appendChild(script);
  });
}


//Loads venues with Foursquare API
export function places() {
  let city = 'Nashwauk, MN';
  let query = '';
  var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=${API ID}&client_secret=${API SECRET}&v=20130815%20&limit=50&near=' + city + '&query=' + query + '';
  return fetch(apiURL)
          .then(resp => resp.json())
          .catch(error => {
            alert(error + ' Oops. Foursquare data did not load properly');
          })
}
