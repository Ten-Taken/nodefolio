/*Serving json 
**
	Example sends object literal to response object.
*/

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
	console.log('Request made via url:'+req.url);
	res.writeHead(200,{'Content-Type': 'application/json'}); // Header, status, content type
	var myObj = {
		storm: 'hurricane',
		type:  'CAT 5',
		name: 'Riley',
		trajectory: 'NW',
		temperature: 74
	};

	//The response object expects either 'string' or a buffer. To send an object, it must be serialized (to JSON in this case)
	res.end(JSON.stringify(myObj));

});


server.listen(3000, '127.0.0.1');  
console.log('Listening on port 3000');