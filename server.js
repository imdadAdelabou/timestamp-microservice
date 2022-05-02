// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res, next) => {
    let date = req.params.date;

    if (date != null && date != "" && date !== undefined) {
        next();
        return;
    }
    let currentDate = new Date();
    return res.json({ "unix": currentDate.getTime(), "utc": currentDate });
}, (req, res, next) => {
    let date = new Date(req.params.date);
    if (date.toDateString() != "Invalid Date") {
        console.log("is valid");
        return res.json({ "ok": "test" });
    } else {
        console.log("Is invalid");
        return res.json({ "error": "Invalid Date" });
    }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});