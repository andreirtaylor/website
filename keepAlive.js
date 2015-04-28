var keepAlive = function(mins){
    var http = require("http"),
    	SITE = process.env.SITE
        mins = mins ? mins : 30;
	
    if(!SITE) return;    
   
    // get rid of whitespace
    SITE = SITE.trim() 

    setInterval(function() {
        var dateObj = new Date(),
    	    date = dateObj.toLocaleDateString(),
            time = dateObj.toTimeString().replace(/ .+/, '');

        http.get("http://www." + SITE);
    }, 60000 * mins);
}

module.exports = keepAlive;

