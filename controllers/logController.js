/*LOG Controller
**
	Applies URI logging for application service
*/

module.exports = function(app){

	app.use(

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

}