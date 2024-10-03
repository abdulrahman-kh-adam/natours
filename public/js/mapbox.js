/* eslint-disable */
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWJkdWxyYWhtYW4tYWRhbTExIiwiYSI6ImNtMTgyNmoxODB4eGQya3M4cHRwbHp0NGgifQ.AsYCaCIHj4Y7Nxhiuc-GnQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/abdulrahman-adam11/cm182h6ix028d01o33mvy8npp',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 300,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
