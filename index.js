const { request, response } = require('express');
const express = require('express');
const DataStore = require('nedb');

const app = express();
const port = 3000
app.listen(port, () => {
    console.log("listening at port: " + port);
});
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

let dataBase = new DataStore('dataBase.db');
dataBase.loadDatabase();


// Get Request routing
app.get('/all', (request, response) => {
    dataBase.find({}, (error, data) => {
        if (error) {
            console.log(error);
            response.end();
            return;
        }
        response.json(data);
    });
})

// Post request routing
app.post('/location', (request, response) => {
    console.log('incoming request');
    let location = request.body;
    let timeStamp = Date.now();
    location.timeStamp = timeStamp;
    dataBase.insert(location);
    console.log(location);
    location.status = 'success'; 
    response.json(location);
})


