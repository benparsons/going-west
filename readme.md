# Going West

## Wut

Render the population of USA as it moves west. Get Census population data from Wikipedia because I couldn't find the correct sources directly.

## Run it

Get the data:

```
yarn install
mkdir data/
node get
node combine
```

Will generate a file `combined.json`.

Then, render it with leaflet. Get an access token from mapbox.com and add it to the variable at the top of `script.js`

Then run a local server (eg `python -m SimpleHTTPServer 3000`) and hit the page.
