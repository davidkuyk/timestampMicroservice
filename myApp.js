// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date?", function (req, res) {
  dateToString = "'" + req.params.date + "'"
  dateToInt = parseInt(req.params.date)
  // if date is empty, return the current time in JSON with unix and utc
  if (req.params.date === undefined) {
    req.unix = parseInt(Math.round((new Date().getTime())))
    var utcDate = new Date().toUTCString()
    var final = {
      unix: req.unix,
      utc: utcDate
    }
    // if date is invalid, return {error: "Invalid Date"}
  } else if (new Date(dateToInt).toString() === 'Invalid Date' && new Date(dateToString).toString() === 'Invalid Date') {
    var final = { error : "Invalid Date" }
    // if date contains dashes or date contains colon, add quotes around req.params.date
  } else if (req.params.date.includes("-") || req.params.date.includes(":") || req.params.date.includes(" ")) {
    req.unix = parseInt(Math.round((new Date(dateToString).getTime())))
    var utcDate = new Date(dateToString).toUTCString()
    var final = {
      unix: req.unix,
      utc: utcDate
    }
  // else if date has a length of 13 (indicating it's a unix epoch timestamp)
  } else if (req.params.date.length == 13) {
    req.unix = dateToInt
    var utcDate = new Date(dateToInt).toUTCString()
    var final = {
      unix: req.unix,
      utc: utcDate
    }
  // else
  } else {
    req.unix = parseInt(Math.round((new Date(req.params.date).getTime())))
      var utcDate = new Date(dateToInt).toUTCString()
      var final = {
        unix: req.unix,
        utc: utcDate
      }
  }
  res.json(final);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;