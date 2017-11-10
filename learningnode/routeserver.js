/*Routing (View Routing)
**
	Conditional logic is used based on the request object's url.
	As noted, this can become cumbersome as the site / app grows. (Even with switch logic).
	This is somewhere that Express.js can come in.
*/

var http = require('http');
var fs = require('fs');


var server = http.createServer(function(req,res){
	console.log('Request made via url:'+req.url);
	
	//If user is attempting to navigate to home, serve index
	if (req.url === '/home' || req.url === '/') {
		res.writeHead(200,{'Content-Type': 'text/html'});
		fs.createReadStream(__dirname + '/index.html').pipe(res);
	}
	else if (req.url === '/contact') {
		res.writeHead(200,{'Content-Type': 'text/html'});
		fs.createReadStream(__dirname + '/contact.html').pipe(res);		
	}
	else if (req.url === '/api/people') {
		//Example only. Real world application, this is normally coming from the db
		var people = [{name: 'Steve', age: 27},{name: 'Alicia', age: 24},{name: 'Royeale', age: 37}];
		res.writeHead(200,{'Content-Type': 'application/json'}); 
		res.end(JSON.stringify(people));
	}
	else{ //404 invalid urls
		res.writeHead(404,{'Content-Type': 'text/html'});
		fs.createReadStream(__dirname + '/404.html').pipe(res);
	}
});

//Setting up port listening
server.listen(3000, '127.0.0.1');  //Localhost on port 3k
console.log('Listening on port 3000');