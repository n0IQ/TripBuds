export const displayMap = (locations) => {
  // Create the map and attach it to the #map
  var map = L.map('map', { zoomControl: false });

  // // Add a tile layer to add to our map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add locations to the map
  const points = [];
  locations.forEach((loc) => {
    // Create points
    points.push([loc.coordinates[1], loc.coordinates[0]]);

    // Add markers
    L.marker([loc.coordinates[1], loc.coordinates[0]])
      .addTo(map)

      // Add popup
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
        autoClose: false,
      })
      .openPopup();
  });

  // Set map bounds to include current location
  const bounds = L.latLngBounds(points).pad(0.5);
  map.fitBounds(bounds);

  // Disable scroll on map
  map.scrollWheelZoom.disable();
};
