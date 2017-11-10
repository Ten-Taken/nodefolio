/* Express.js
**
	Express: 	Express.js framework
		1. Easy Routing System
		2. Integrates with templating engines easily
		3. Middleware framework
*/

var express = require('express'); //Import module

//The express module returns a function to store the entire object
var app = express();


/*Networking with express
**
	http "verbs"(methods)
		GET - app.get('route',callback)
		POST - app.post('route',callback)
		DELETE - app.delete ('route',callback)
		PUT

	Express adds new methods to the request and response objects.
*/

app.get('/', function (req,res) {
	res.send("This is the homepage"); //Content type not needed, Express handles it
});

/*Route Parameters with Express
**
	Often used with db queries for fetching dynamic data.
	Parameters are args after : in path. 
	Params are accessible via the request object.
*/
//Example of routing on a social network profile
app.get('/profile/:id', function(req,res){
	res.send('You requested the profile of id: '+req.params.id);  //param identifier can be anything
});

//Listening on port
app.listen(3000);