/*Nodefolio
**
	Welcome to Nodefolio. This is the entry point for the
	server-side-rendering Express.js application used to power my 
	web portfolio.

	TO DO:
		1. Handle XSS and CSRF vulnerabilities.
		2. Set up Certificate Authority (Let's Encrypt) (Certbot 90 day)
		3. Pull Bootstrap into local environment (nix CDN) **DONE**
		4. Wireframe
			1. Index
			2. About
			3. Dev Blog
			4. Open Badges (moving to about)
			5. Project Showcase
			6. Hire me (client+emp)
		5. Template Partials
		6. Decide on data model, integrate relational or document db
		7. Integrate Nodemailer
		8. Unit Testing workflow
		9. Meta content
		10. Set active state scripting on nav elements
		11. Typography decisions
		12. API's
		13. EJS data injections
		14. Set middleware request logging on static routes
		15. Fix Firefox favicon bug
*/

// Import modules.
var express = require('express'); 
var routeController = require('./controllers/routeController.js');


// Define variables.
var app = express();


// Set template engine.
app.set('view engine', 'ejs');


// Static file routing middleware.
app.use(express.static('public'));

// Static routing for localized Bootstrap
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
app.use('/jquery/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/bootstrap/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/popper/js', express.static(__dirname + '/node_modules/popper.js/dist/umd'));


// Fire controllers
routeController(app);


// Server port for incoming requests
app.listen(3000);
console.log('Listening on port 3000');