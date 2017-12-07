/*SECURITY Controller
**
	Handles route security for all of nodefolio
*/

var helmet = require('helmet'); // Provides methods for secure headers
var expectCt = require('expect-ct'); // Certificate Transparency Header

module.exports = function(app){
	/*
		app.use(

		//Re-route unsecure requests to secure (Comment out for local testing)
			function(req, res, next){

				if(!req.secure) {
    					var secureUrl = "https://" + req.get('host') + req.originalUrl; 
    					//Client cache was causing an issue here with 301. Changing to 303 redirect.
    					return res.redirect(303, secureUrl);
				}
			next();
		},

		);



// Security Headers in all routing
app.use(helmet());

// Explicit call to no-cache
app.use(helmet.noCache());

// Sets "Referrer-Policy: same-origin".
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

// Sets Expect-CT: enforce; max-age=123. (Mandatory for chrome as of 04/2018. CA's are working on automation)
app.use(expectCt({
  enforce: true,
  maxAge: 123 // Seconds
  //reportUri: 'http://example.com/report'
}));
*/
// Set Content Security Policy (CSP)

// Set HTTP Public Key Pinning (synchronize with cert renwals)

// Set X-Permitted-Cross-Domain-Policies



}