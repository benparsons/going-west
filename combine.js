const fs = require("fs");
//console.log(fs.readdirSync('data/'));
var result = [];
fs.readdirSync('data/').forEach(filename => {
    var jsonData = JSON.parse(fs.readFileSync('data/' + filename, 'utf-8'));
    if (!jsonData.long) {
        console.log(`Excluding ${filename}, missing long`);
        return;
    }
    if (!jsonData.lat) {
        console.log(`Excluding ${filename}, missing lat`);
        return;
    }
    if (!jsonData.popData) {
        console.log(`Excluding ${filename}, missing popData`);
        return;
    }
    result.push(jsonData);
});
//console.log(result)
fs.writeFileSync("combined.json", JSON.stringify(result));