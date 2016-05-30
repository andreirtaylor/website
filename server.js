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

var data = {
    jobs:[
    {
        "icon": "IsolationNetwork.png",
        "title": "Software Developer - Software Developer",
        "description":[
          "Developed a replacement user interface for Universal Media Group's content distribution system",
          "Created a Restful API for the existing SQL database using Entity Framework",
          "Responsible for upgrading angular controllers to components readying the update to Angular 2.0"
        ]
    },
    {
        "icon": "latitude.png",
        "title": "Latitude Geographics - QA Analyist", 
        "description":[
            "Designed and Implemented a selennium based application that automated tedious tasks in testing",
            "Wrote a script that archived sites hosted on internal servers resulting in a 80% decrease in storage",
            "Tested and released an update of the Geocortex HMTL5 Viewer",
            "Gained experience using restful API's"
        ]
    },
    {
        icon:"KCI.gif",
        title:"KCI World - Account Manager",
        description:[
            "Worked with companies to develop a marketing strategy that best suits their individual needs",
            "Was responsible for multiple media channels which covered Printed and Electronic Media and Trade Shows",
            "Responsible for business development as well as managing and retaining existing accounts",
            "Meet face to face with executives and business owners to plan and build multi-year advertising campaigns",
            "Sold booth space in trade shows as well as attending and providing support to exhibitors and delegates"
        ]
    }
    ]
}

// Statically serve pages from the public directory
app.use(compression());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next){
    res.render('index', data);
});

// Start the server
server.listen(PORT);
keepAlive(30);
console.log('Server listening on port ' + PORT);
