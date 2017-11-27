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
		6. Decide on data model, integrate relational or document db *DONE*
		7. Integrate Nodemailer
		8. Unit Testing workflow
		9. Meta content
		10. Set active state scripting on nav elements **DONE**
		11. Typography decisions
		12. API's
		13. EJS data injections
		14. Set middleware request logging on static routes *DONE(changed mind too)*
		15. Fix Firefox favicon bug **DONE**
		16. Error handling
		17. Automate SSL renewal *DONE*
		18. Set up local MTA, MDA, and SMTP
		19. Review all logic for non-blocking design
*/

// Import modules.
var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path'); //Resolves absolute paths for the filesystem
var employersController = require('./controllers/employersController.js');
var securityController = require('./controllers/securityController.js');
var indexController = require('./controllers/indexController.js');
var aboutController = require('./controllers/aboutController.js');
var showcaseController= require('./controllers/showcaseController.js');
var blogController = require('./controllers/blogController.js');
var contractsController = require('./controllers/contractsController.js');
var staticController = require('./controllers/staticController.js');
var logController = require('./controllers/logController.js');



// Define variables.
var app = express();
//var privateKey = fs.readFileSync( path.resolve('/etc/letsencrypt/live/gregorywolfe.tech/privkey.pem' ));
//var certificate = fs.readFileSync( path.resolve('/etc/letsencrypt/live/gregorywolfe.tech/cert.pem' ));



// Set template engine.
app.set('view engine', 'ejs');



//Create db connection
var dbCredentials = require('./dbCredentials.js'); //git ignoring, object simply returns authentication credentials
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbCredentials.database, dbCredentials.username, dbCredentials.password, {
  host: dbCredentials.host,
  dialect: dbCredentials.dialect,

  	/*
	Deprecation warning even without the use of aliases. Expects 'Sequelize.Op' configuration
	if not disabled.  Possibly an 'over-engineered' solution already handled by data
	sanitization.  Resolution pending. See:
  	https://github.com/sequelize/sequelize/issues/8417
  	http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
  	http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  	*/
  operatorsAliases: false, 

  pool: {
    max: dbCredentials.max,  // Maximum number of connections in the pool.
    min: 0,
    acquire: 30000, //The maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000 //10 seconds. The maximum time, in milliseconds, that a connection can be idle before being released.
  },

});

//Testing db connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



// Fire controllers
securityController(app);
staticController(app, express);
logController(app); //Logging routes after static <includes> avoids log clutter
indexController(app);
aboutController(app);
showcaseController(app);
blogController(app);
contractsController(app);
employersController(app);



// Launch Server

	//Uncomment for local testing
		app.listen(3000);

	// Comment out for local testing

		//http server
/*		
		http.createServer(app).listen(2637);
		console.log('Listening for http on port 2637');

		//https server
		https.createServer({
		    	key: privateKey,
		   	cert: certificate
		}, app).listen(3000);
*/	
		console.log('Listening for https on port 3000');