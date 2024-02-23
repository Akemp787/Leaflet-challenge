// Function to create the Leaflet map
function createMap() {
  // Create a map object
  var mymap = L.map('map').setView([0, 0], 2);

  // Add a tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
  }).addTo(mymap);

  // Fetch earthquake data from USGS GeoJSON Feed
  fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
      .then(response => response.json())
      .then(data => {
          // Plot earthquakes on the map
          L.geoJSON(data, {
              pointToLayer: function (feature, latlng) {
                  // Customize marker based on earthquake properties
                  return L.circleMarker(latlng, {
                      radius: Math.sqrt(feature.properties.mag) * 2,
                      fillColor: getColor(feature.geometry.coordinates[2]),
                      color: "#000",
                      weight: 1,
                      opacity: 1,
                      fillOpacity: 0.8
                  }).bindPopup(`<b>Magnitude:</b> ${feature.properties.mag}<br><b>Depth:</b> ${feature.geometry.coordinates[2]} km`);
              }
          }).addTo(mymap);
      });

  // Function to determine color based on depth
  function getColor(depth) {
      // Customize colors based on depth range
      if (depth < 10) {
          return "#00FF00";
      } else if (depth < 30) {
          return "#FFFF00";
      } else if (depth < 50) {
          return "#FFA500";
      } else if (depth < 70) {
          return "#FF4500";
      } else if (depth < 90) {
          return "#FF0000";
      } else {
          return "#8B0000";
      }
  }
}

// Call the createMap function when the page loads
window.onload = createMap;
