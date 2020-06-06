
const axios = require("axios");
module.exports = async function () {
    var result = [];
    const options = {
        url: `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=List_of_United_States_cities_by_population&rvslots=*&rvprop=content&formatversion=2&format=json`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    var next = false;
    await axios(options)
        .then(response => {
            console.log(options.url);
            page = response.data.query.pages[0];
            for (line of page.revisions[0].slots.main.content.split('\n')) {
                if (line === "===Distribution===") break;
                if (next) {
                    var match = line
                        .match(/\[\[([^\]]*)/)[1]
                        .split('|')[0]
                        .replace(/ /g, '_');
                    //console.log(match);
                    result.push(match);
                    next = false;
                } else if (line.match(/^\|\d/)) {
                    //console.log(line);
                    next = true;
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    return result;
}