var map = L.map('map', { renderer: L.canvas() }).setView([37.77, -122.43], 5);

var base = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.pictureMarker([45.51, -122.68]).addTo(map);