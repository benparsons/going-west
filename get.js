const axios = require("axios");
const fs = require("fs");
const list = require("./list");


async function main() {
    var cities = await list(0);
    //var cities = ["Elizabeth,_New_Jersey"];
    cities.forEach(city => getCity(city));
}
main();

function getCity(city) {
    const options = {
        url: `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=${city}&rvslots=*&rvprop=content&formatversion=2&format=json`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };

    var popData = {};
    var lat;
    var long;
    axios(options)
        .then(response => {
            console.log(options.url)
            page = response.data.query.pages[0];
            console.log(page.title)
            for (line of page.revisions[0].slots.main.content.split('\n')) {
                if (line.includes("USCensusDemographics")) break;
                if (popMatch = line.match(/\|[ ]*(\d\d\d\d)(=[ ]*|\|)(\d\d*)/)) {
                    popData[popMatch[1]] = parseInt(popMatch[3], 10);
                }
                coordMatch = line.match(/\|[ ]*coordinates[\s]*= {{coord\|(.*)\|N\|(.*)\|W/);
                if (coordMatch) {
                    latSplit = coordMatch[1].split("|");
                    lat = parseFloat(latSplit[0] + "." + latSplit[1] + latSplit[2])
                    longSplit = coordMatch[2].split("|");
                    long = -parseFloat(longSplit[0] + "." + longSplit[1] + longSplit[2])
                } else {
                    coordMatchDec = line.match(/\|[ ]*coordinates[\s]*= {{coord\|[-+]?([0-9]*\.[0-9]+|[0-9]+)\|([-+]?[0-9]*\.[0-9]+|[0-9]+)\|/)
                        if (coordMatchDec) {
                            //console.log(coordMatchDec);
                            lat = parseFloat(coordMatchDec[1]);
                            long = parseFloat(coordMatchDec[2]);
                        }
                }

            };
            fs.writeFileSync(`data/${page.title}.json`, JSON.stringify(
                {
                    title: page.title,
                    popData: popData,
                    lat: lat,
                    long: long
                }
            ))
        })
        .catch(function (error) {
            console.log(`ERROR GETTING ${city}`);
            console.log(error);
        });
}
