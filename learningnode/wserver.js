/*Serving Pages
**
	As simple as changing the mime type in the header.
*/

var http = require('http');
var fs = require('fs');

//Stores server.  Function takes a request object, and a response object. Function fires whenever a request is sent to server
var server = http.createServer(function(req,res){
	console.log('Request made via url:'+req.url);
	res.writeHead(200,{'Content-Type': 'text/html'}); // Header, status, content type
	var myReadStream = fs.createReadStream(__dirname+'/index.html', 'utf8');
	myReadStream.pipe(res); //End response and send to client
});

//Setting up port listening
server.listen(3000, '127.0.0.1');  //Localhost on port 3k
console.log('Listening on port 3000');