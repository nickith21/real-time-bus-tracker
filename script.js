mapboxgl.accessToken =
    "pk.eyJ1Ijoibmlja2l0aDIxIiwiYSI6ImNsNWliM2NiZDA2YzQza28wdGx4M2RrcHEifQ.UtMewP9N4tMt_limtBmb2Q";

// code to base it on current location
  // navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  //     enableHighAccuracy: true,
  // });

  // function successLocation(position) {
  //     setupMap([position.coords.longitude, position.coords.latitude]);
  // }

  // function errorLocation() {
  //     setupMap([-2.24, 53.48]);
  // }

async function run() {
    // get bus data
    const locations = await getBusLocations();
    console.log(locations[0].attributes.latitude);

    function setupMap() {
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y",
            center: [
                locations[0].attributes.longitude,
                locations[0].attributes.latitude,
            ],
            zoom: 11,
        });

        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav);
        // code to add directions
          // var directions = new MapboxDirections({
          //     accessToken: mapboxgl.accessToken,
          // });

          // map.addControl(directions, "top-left");

        for (let i = 0; i < locations.length; i++) {
            const elLong = locations[i].attributes.longitude;
            const elLat = locations[i].attributes.latitude;

            new mapboxgl.Marker().setLngLat([elLong, elLat]).addTo(map);
        }
    }

    setupMap();

    // timer
    setTimeout(run, 100000);
}

// Request bus data from MBTA
async function getBusLocations() {
    const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

run();
