/*
 * Basic Node.js express server that runs a socket.io instance
 * to mirror all data sent by one client to all others (in the same
 * socket.io room)
 */

var PORT = 2000;

// Preliminaries
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

// Statically server pages from the public directory
app.configure( function() {
    app.use(express.static(__dirname + '/public'));
});

// Start the server
server.listen(PORT);
console.log('Server listening on port ' + PORT);
