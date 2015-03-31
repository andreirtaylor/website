var keepAlive = function(mins){
    var http = require("http"),
        SITE = process.env.SITE.trim(),
        mins = mins ? mins : 30;
	
    if(!SITE) return;    

    setInterval(function() {
        var dateObj = new Date(),
    	    date = dateObj.toLocaleDateString(),
            time = dateObj.toTimeString().replace(/ .+/, '');

        http.get("http://www." + SITE);
        console.log( "geting site " + SITE + "   " + time + "   " + date );
    }, 60000 * mins);
}

module.exports = keepAlive;

