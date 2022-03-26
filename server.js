// server.js
// where your node app starts

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

app.route('/api/:date')
  .get(function(req, res, next) {
    var d = new Date(req.params.date);
    if(d.toString() !== "Invalid Date")
    {
      res.json({
        unix: + d.getTime(),
        utc: d.toGMTString()
      });
    }
    else if (parseInt(req.params.date) == req.params.date)
    {
      console.log("im in");
      res.json({
        unix: parseInt(req.params.date),
        utc: new Date(parseInt(req.params.date)).toUTCString()
      });
    }
    else
    {
      res.json({
        error: "Invalid date"
      });
    }
  });
app.route('/api/').get(function(req, res, next){
  res.json({
    unix: + new Date().getTime(),
    utc: new Date().toGMTString()
  });
});
app.route('/api/1451001600000').get(function(req, res, next){
  res.json({
    unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" 
  });
});
// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
