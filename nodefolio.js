/*Nodefolio
**
	Welcome to Nodefolio. This is the entry point for the
	server-side-rendering Express.js application used to power my 
	web portfolio.
*/

// Import modules.
var express = require('express'); 
var routeController = require('.controllers/routeController.js');

// Define variables.
var app = express();

// Set template engine.
app.set('view engine', 'ejs');

// Static file routing middleware.
app.use(express.static('./public'));

// Fire controllers
routeController(app);

// Server port for incoming requests
app.listen(3000);
console.log('Listening on port 3000');