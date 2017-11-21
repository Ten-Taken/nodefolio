/*Nodefolio
**
	Welcome to Nodefolio. This is the entry point for the
	server-side-rendering Express.js application used to power my 
	web portfolio.

	TO DO:
		1. Handle XSS and CSRF vulnerabilities.
		2. Set up Certificate Authority (Let's Encrypt) (Certbot 90 day) **DONE**
		3. Pull Bootstrap into local environment (partial CDN) **DONE**
		4. Wireframe **DONE**
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
		10. Set active state scripting on nav elements **DONE**
		11. Typography decisions
		12. API's
		13. EJS data injections
		14. Set middleware request logging on static routes
		15. Fix Firefox favicon bug
		16. Error handling
		17. Automate SSL renewal
*/

// Import modules.
var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path'); //Resolves absolute paths for the filesystem
var routeController = require('./controllers/routeController.js');


// Define variables.
var app = express();
var privateKey = fs.readFileSync( path.resolve('/etc/letsencrypt/live/gregorywolfe.tech/privkey.pem' ));
var certificate = fs.readFileSync( path.resolve('/etc/letsencrypt/live/gregorywolfe.tech/cert.pem' ));


// Set template engine.
app.set('view engine', 'ejs');


// Static file routing middleware.
app.use(express.static('public'));

// Static routing for localized Bootstrap
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
app.use('/jquery/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper/js', express.static(__dirname + '/node_modules/popper.js/dist/umd'));


// Fire controllers
routeController(app);


// Launch Server

	//Uncomment for local testing
		//app.listen(3000);

	// Comment out for local testing

		//http server
		http.createServer(app).listen(2637);
		console.log('Listening for http on port 2637');

		//https server
		https.createServer({
		    key: privateKey,
		    cert: certificate
		}, app).listen(3000);
		console.log('Listening for https on port 3000');