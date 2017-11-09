/* Streams and Buffers
**
	Buffers are used as midway storage (sometimes temporary) to collect data
	during transfer.  Think of it as a storage bin in factorio between belts of
	differential speed. Rapid input of units in, only complete stacks out.
	The end user can begin consuming data chunks (stacks) before
	the entirety of data is transferred from the source.  In comparison
	to readFile methods, which wait to transfer all data at once.

	- writable streams allow node to write to a stream
	- readable streams allow node to read from a stream
	- duplex, can do both
*/

var http = require('http');
var fs = require('fs');

//Create read stream
var myReadStream = fs.createReadStream(__dirname+'/rstreamtest.txt', 'utf8');

// Create write stream
var myWriteStream = fs.createWriteStream(__dirname+'/wrstreamtest.txt',);

/*
	Readstream inherits methods from event emitter. Data event triggers when data is received into the stream.
	The below exhibits an event listener for this. Callback writes a chunk when it is received by the buffer.
*/

myReadStream.on('data', function(chunk){
	console.log('New Chunk Received: ');
	myWriteStream.write(chunk);
})

