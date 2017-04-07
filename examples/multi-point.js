var map = L.map('map', { renderer: L.canvas() }).setView([37.77, -122.43], 5);

var base = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var latlngs = [];
var latlng = [45.51, -122.68];
latlngs.push(latlng);

for (var i = 0; i < 1000; i++) {
    var x = Math.random() * 20 - 10;
    var y = Math.random() * 20 - 10

    latlngs.push([latlng[0] + y, latlng[1] + x])
    L.pictureMarker([latlng[0] + y, latlng[1] + x], { icon: 'test.png' }).addTo(map);
}

