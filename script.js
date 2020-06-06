var accessToken = "GOES HERE";

var tick = 1690;
var circles = [];

function getJSON(path) {
    return fetch(path).then(response => response.json());
}

getJSON('/combined.json').then(data => {
    console.log(data);
    main(data);
})

function main(data) {
    console.log("main starting")
    var x = 51.505;
    var y = -0.09;
    var radius = 0;
    console.log("read")
    var mymap = L.map('mapid').setView([37.405074, -97.163086], 5);
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);

    for (city of data) {
        var circle = L.circle([city.lat, city.long], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.3,
            radius: radius,
            stroke: false,
        }).addTo(mymap);
        circle.bindPopup(city.title);
        circles.push(circle);
    }
    


    var popup = L.popup();
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }
    mymap.on('click', onMapClick);

    var interval1 = setInterval(
        ()=>{
            console.log(tick);
            if (tick > 2011) {
                clearInterval(interval1);
            }
            for (var i = 0; i < circles.length; i++) {
                var pop = data[i].popData[tick];
                if (pop) {
                    circles[i].setRadius(Math.sqrt(pop) * 100);
                }
            }
            tick++;
        }, 50);
}