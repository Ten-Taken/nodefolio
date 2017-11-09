/*Pipes
**
	Pipes can automate the handoff of data between read & write streams.
	This eradicates the need for callback on data events.
*/

var fs = require('fs');


//var myReadStream = fs.createReadStream(__dirname+'/rstreamtest.txt', 'utf8');
//var myWriteStream = fs.createWriteStream(__dirname+'/wrstreamtest.txt',);

//Pipes are used only on readable streams. pipes to writeable
	//myReadStream.pipe(myWriteStream);


/*USING PIPES with a response object
**
*/

//Setting up server
	var http = require('http');

	var server = http.createServer(function(req,res){
		console.log('Request made via url:'+req.url);
		res.writeHead(200,{'Content-Type': 'text/plain'}); // Header, status, content type
		var myReadStream = fs.createReadStream(__dirname+'/rstreamtest.txt', 'utf8');
		myReadStream.pipe(res); //End response and send to client
	});

	server.listen(3000, '127.0.0.1');  //Localhost on port 3k
	console.log('Listening on port 3000');