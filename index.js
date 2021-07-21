const express = require('express');
const app = express();
const port = 3000
app.listen(port, () => {
    console.log("listening at port: " + port);
});
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

// Post request routing
app.post('/location', (request, response) => {
    console.log('LOL incoming request');
    let location = request.body;
    console.log(location);
    response.json({
        status: 'success',
        latitude: location.lat,
        longitude: location.lon
    });
})


