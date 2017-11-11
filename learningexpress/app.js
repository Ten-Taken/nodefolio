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

//Setting a view engine in Express
app.set('view engine', 'ejs');

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


/*Templating Engines with Express
**
	Response object's .sendFile method is used to route html views. 
	Again, Content-Type does not need to be declared with Express.

*/
app.get('/home', function (req,res) {
	res.sendFile(__dirname+'/index.html');
});

/*
	A templating engine allows embedding (injection) of data and structure
	into the template before sending a rendered view.  Doing this with
	EJS.  Reference http://www.embeddedjs.com/

	By default, express looks in the /views directory
	EJS template files use extension .ejs

	When rendering a view, you use the .render method instead of sendFile.
	The path is not needed, as default behavior is to check the views directory
*/
app.get('/template/:name', function (req,res) {
	/*
		Injecting data into a view. The second param is an object for the data.
		The key of the kv pair becomes the accessor in the template.
		See template.ejs
	*/

	//Additional data (often from db query)
	var info = {age: 110, food: 'Sushi', language: 'English'};
	res.render('template', {name: req.params.name, info: info});
});


//Listening on port
app.listen(3000);

