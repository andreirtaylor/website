/*
 * Basic Node.js express server that runs a socket.io instance
 * to mirror all data sent by one client to all others (in the same
 * socket.io room)
 */
var PORT = process.env.PORT ? process.env.PORT : 8008

// Preliminaries
var express = require('express'),
    compression = require('compression'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    path = require('path'),
    favicon = require('serve-favicon')

//render the pug templates
app.set('views', path.join(__dirname + '/public'))
app.set('view engine', 'pug')

//favicon baby
app.use(favicon(__dirname + '/public/favicon.ico'))

// Statically serve pages from the public directory
app.use(compression())
app.use(express.static(__dirname + '/public'))


var data = {
   jobs:[
    {
        "icon": "mda.jpg",
        "title": "MDA - Software Developer",
        "description":[
            "Developed mission planning software for the RADARSAT constellation mission, a three-spacecraft fleet of Earth observation satellites",
            "Optimized C++ code"

        ]
    },
    {
        "icon": "IsolationNetwork.png",
        "title": "Isolation Network - Software Developer",
        "description":[
          "Developed a replacement user interface for Universal Media Group's content distribution system",
          "Created a Restful API for the existing SQL database using Node.js",
          "Responsible for upgrading angular controllers to components readying the update to Angular 2.0"
        ]
    },
    {
        "icon": "latitude.png",
        "title": "Latitude Geographics - QA Analyist", 
        "description":[
            "Designed and Implemented a selennium based application that automated tedious tasks in testing",
            "Wrote a script that archived sites hosted on internal servers resulting in a 80% decrease in storage",
            "Gained experience using restful API's"
        ]
    }
    ]
}

const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.post('/smsnoreply', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('SMS UNDELIVERED. To reply to an office message, click the link provided in the original message.');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.get('/', function(req, res, next){
    res.render('index', data)
})

app.get('/nqueens', function(req, res, next){
    res.sendfile('public/nqueens.html')
})

app.get('/hack', function(req, res, next){
    res.sendfile('public/stanford_notebook.pdf')
})

app.get('/thisopenspace', async (req, res, next) => {
    res.sendfile('public/thisopenspace.html')
})

// Start the server
server.listen(PORT)
console.log('Server listening on port ' + PORT)
