// wikipedia get example
// https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=Chicago&rvslots=*&rvprop=content&formatversion=2

//window.addEventListener("load", main);

var tick = 1690;

// return JSON data from any file path (asynchronous)
function getJSON(path) {
    return fetch(path).then(response => response.json());
}

// load JSON data; then proceed
getJSON('/combined.json').then(data => {
    // assign allQuestions with data
    console.log(data);
    main(data);
})

function main(data) {
    console.log("main starting")
    var x = 51.505;
    var y = -0.09;
    var radius = 10 /10;
    console.log("read")
    //var accessToken = "pk.eyJ1IjoiYmVucGFyc29ucyIsImEiOiJja2FyYXpseGswaDdiMnpwcjdpeHNoc3V3In0.2ViTP8JCg2WcVpBRycg0EA";
    var mymap = L.map('mapid').setView([37.405074, -97.163086], 5);
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmVucGFyc29ucyIsImEiOiJja2FyYXpseGswaDdiMnpwcjdpeHNoc3V3In0.2ViTP8JCg2WcVpBRycg0EA'
    }).addTo(mymap);

    var cirlces = [];
    for (city of data) {
        // TODO lat/longs are offset?
        var circle = L.circle([city.lat, city.long], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: radius
        }).addTo(mymap);
        circle.bindPopup(city.title);
        cirlces.push(circle);
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
            return;
            tick++;
            if (tick > 2020) {
                clearInterval(interval1);
            }
            var nyPop = newYork[tick];
            var laPop = la[tick];
            var chicagoPop = chicago[tick];
            var houstonPop = houston[tick];
            if (nyPop) {
                //console.log(tick + " " + nyPop + " NY");
                circle.setRadius(Math.sqrt(nyPop) * 100);
            }
            if (laPop) {
                //console.log(tick + " " + laPop + " LA");
                laCircle.setRadius(Math.sqrt(laPop) * 100);
            }
            if (chicagoPop) {
                //console.log(tick + " " + laPop + " LA");
                chicagoCircle.setRadius(Math.sqrt(chicagoPop) * 100);
            }
            if (houstonPop) {
                //console.log(tick + " " + laPop + " LA");
                houstonCircle.setRadius(Math.sqrt(houstonPop) * 100);
            }
        }, 10);
}