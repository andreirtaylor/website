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
        "icon": "latitude.png",
        "title": "Latitude Geographics - QA Analyist", 
        "description":[
            "Designed and Implemented a selennium based application that automated tedious tasks in testing",
            "Found and reported over 50 bugs and assisted in the testing of fix versions",
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
            "Travelled to attend relevant events, industry shows, clients, prospects and training",
            "Responsible for business development as well as managing and retaining existing accounts",
            "Meet face to face with executives and business owners to plan and build multi-year advertising campaigns",
            "Sold booth space in trade shows as well as attending and providing support to exhibitors and delegates"
        ]
    },
    {
        icon:"FutureShop.png",
        title:"Future Shop - Product Expert",
        description:[
        "Consistently exceeded sales targets by over 20%",
        "Increased revenue by completing a detailed competitor price comparison each week",
        "Developed communication skills through listening to customers and providing them with service tailored to their specific needs and expectations",
        "Trained seasonal staff and worked alongside others to rehearse sales techniques and give constructive criticism"
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
