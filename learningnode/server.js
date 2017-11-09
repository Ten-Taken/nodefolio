/* Node Server
**
	Uses http core module.
	Review - Headers: Contain content type, and status
*/

var http = require('http');

//Stores server.  Function takes a request object, and a response object. Function fires whenever a request is sent to server
var server = http.createServer(function(req,res){
	console.log('Request made via url:'+req.url);
	res.writeHead(200,{'Content-Type': 'text/plain'}); // Header, status, content type
	res.end('I, the wonderful node server, hear your plea!'); //End response and send to client
});

//Setting up port listening
server.listen(3000, '127.0.0.1');  //Localhost on port 3k
console.log('Listening on port 3000');

