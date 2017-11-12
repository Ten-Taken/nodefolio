/* Route Controller
**
	Handles view routing for the site
*/

module.exports = function(app){

	// Request Logging for server
		app.use(function(req, res, next) {

		// Store remote address of request origin
			var ip = req.headers['x-forwarded-for'] || 
     			req.connection.remoteAddress || 
     			req.socket.remoteAddress ||
     			(req.connection.socket ? req.connection.socket.remoteAddress : null);

		// log each request to the console
			console.log(ip+' made a ',req.method+' request', ' via - '+req.url);

		// continue doing what we were doing and go to the route
			next(); 
		});


	// Index routing - (Chaining verbs)
		var index = ['/', '/home']; //Array stores multiple valid paths for this route
		app.route(index)
			.get(function(req, res){
				res.render('index');
			})
			.post(function(req, res){
				res.send('That type of request is shunned in these parts.');
			});


}