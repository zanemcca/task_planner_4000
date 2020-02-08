/**
 * Setup:
 *
 * 1. Create an application in Asana.
 * 2. Set the application's redirect URI to be:
 *      `http://localhost:8338/oauth_callback`
 * 3. Note the app's client ID and secret key for use when running the
 *    web server, below.
 *
 * Usage:
 *
 *   export ASANA_CLIENT_ID=...
 *   export ASANA_CLIENT_SECRET=...
 *   [export PORT=...]
 *   node oauth_webserver.js
 */
var Asana = require('asana');
var express = require('express');
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
var app = express();

var clientId = process.env['ASANA_CLIENT_ID'];
var clientSecret = process.env['ASANA_CLIENT_SECRET'];
var port = process.env['PORT'] || 3000;

function createClient() {
  return Asana.Client.create({
    clientId: clientId,
    clientSecret: clientSecret,
  });
}

// Authorization callback - redirected to from Asana.
app.get('/auth/callback/asana', function(req, res) {
  var code = req.param('code');
  if (code) {
    var client = createClient();
    client.app.accessTokenFromCode(code).then(function(credentials) {
      res.cookie('token', credentials.access_token, { maxAge: 60 * 60 * 1000 });
      res.redirect('/');
    });
  } else {
    // Authorization could have failed. Show an error.
    res.end('Error getting authorization: ' + req.param('error'));
  }
});

app.use(express.static('build'))

// Run the server!
var server = app.listen(port, function() {
  console.log("Listening on port " + port);
});
