var express = require('express');
var request = require('request');
var app = express();
var url = require('url');

app.get('*', function(req, res) {
  var parsedUrl = url.parse(req.url, true);

  parsedUrl.query.key = process.env.BREWERYDB_KEY;
  parsedUrl.search = null;
  req.url = url.format(parsedUrl);

  request('https://api.brewerydb.com' + req.url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
   });
});

app.listen(process.env.PORT || 8000);
