/* Route Controller
**
	Handles view routing for the site
*/

module.exports = function(app){

	
		app.use(

		//Re-route unsecure requests to secure	
			function(req, res, next){
				if(!req.secure) {
    					var secureUrl = "https://" + req.headers['host'] + req.url; 
    					res.writeHead(301, { "Location":  secureUrl });
					res.end();
				}
			next();
		},

		// Request Logging for server	
			function(req, res, next) {

		// Store remote address of request origin
			var ip = req.headers['x-forwarded-for'] || 
     			req.connection.remoteAddress || 
     			req.socket.remoteAddress ||
     			(req.connection.socket ? req.connection.socket.remoteAddress : null);

		// log each request to the console
			console.log(ip+' made a ',req.method+' request', ' via - '+req.url);

		// continue doing what we were doing and go to the route
			next(); 
		}

		);


	// Index routing - (Chaining verbs)
		var index = ['/', '/home']; //Array stores multiple valid paths for this route
		app.route(index)
			.get(function(req, res){
				res.render('index');
			});

	// About Page
		app.route('/about')
  			.get(function (req, res) {
				res.render('about');
  			});


	// Showcase Page
		app.route('/showcase')
  			.get(function (req, res) {
				res.render('showcase');
  			});

	// Blog Page
		app.route('/blog')
  			.get(function (req, res) {
				res.render('blog');
  			});

	// Contracts Page
		app.route('/clients')
  			.get(function (req, res) {
				res.render('contract');
  			});

	// Employers Page
		app.route('/employers')
  			.get(function (req, res) {
				res.render('employer');
  			});	


}