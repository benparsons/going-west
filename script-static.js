// wikipedia get example
// https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=Chicago&rvslots=*&rvprop=content&formatversion=2

window.addEventListener("load", main);

var newYork = {
"1698":	4937,
"1712":	5840,
"1723":	7248,
"1737":	10664,
"1746":	11717,
"1756":	13046,
"1771":	21863,
"1790":	49401,
"1800":	79216,
"1810":	119734,
"1820":	152056,
"1830":	242278,
"1840":	391114,
"1850":	696115,
"1860":	1174779,
"1870":	1478103,
"1880":	1911698,
"1890":	2507414,
"1900":	3437202,
"1910":	4766883,
"1920":	5620048,
"1930":	6930446,
"1940":	7454995,
"1950":	7891957,
"1960":	7781984,
"1970":	7894862,
"1980":	7071639,
"1990":	7322564,
"2000":	8008278,
"2010":	8175133,
"2019":	8336817
};
var la = {
"1850":	1610,
"1860":	4385,
"1870":	5728,
"1880":	11183,
"1890":	50395,
"1900":	102479,
"1910":	319198,
"1920":	576673,
"1930":	1238048,
"1940":	1504277,
"1950":	1970358,
"1960":	2479015,
"1970":	2811801,
"1980":	2968528,
"1990":	3485398,
"2000":	3694820,
"2010":	3792621,
"2019":	3979576
}
var chicago = 
{
"1840":	4470,
"1850":	29963,
"1860":	112172,
"1870":	298977,
"1880":	503185,
"1890":	1099850,
"1900":	1698575,
"1910":	2185283,
"1920":	2701705,
"1930":	3376438,
"1940":	3396808,
"1950":	3620962,
"1960":	3550404,
"1970":	3366957,
"1980":	3005072,
"1990":	2783726,
"2000":	2896016,
"2010":	2695598,
"2019":	2693976
}
var houston = {
"1850":	2396	,
"1860":	4845	,
"1870":	9382	,
"1880":	16513	,
"1890":	27557	,
"1900":	44633	,
"1910":	78800	,
"1920":	138276	,
"1930":	292352	,
"1940":	384514	,
"1950":	596163	,
"1960":	938219	,
"1970":	1232802,
"1980":	1595138,
"1990":	1630553,
"2000":	1953631,
"2010":	2100263,
"2019":	2320268
}
var tick = 1690;

function main() {
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
    var marker = L.marker([51.5, -0.09]).addTo(mymap);
    var circle = L.circle([40.729568, -73.99189], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: radius
    }).addTo(mymap);
    
    var laCircle = L.circle([34.052659, -118.244476], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: radius
    }).addTo(mymap);

    var chicagoCircle = L.circle([41.86905, -87.614594], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: radius
    }).addTo(mymap);

    var houstonCircle = L.circle([29.756628, -95.366135], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: radius
    }).addTo(mymap);
    var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ]).addTo(mymap);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");


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