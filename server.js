/*
 * Basic Node.js express server that runs a socket.io instance
 * to mirror all data sent by one client to all others (in the same
 * socket.io room)
 */
var PORT = process.env.PORT ? process.env.PORT : 8008;

// Preliminaries
var express = require('express'),
    compression = require('compression'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    path = require('path'),
    keepAlive = require('./keepAlive.js');

//render the jade templates
app.set('views', path.join(__dirname + '/public'));
app.set('view engine', 'jade');


// Statically serve pages from the public directory
app.use(compression());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next){
    res.render('index');
});

// Start the server
server.listen(PORT);
console.log('Server listening on port ' + PORT);
