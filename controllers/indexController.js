/*INDEX Controller
**
	Handles routes for home page
*/

module.exports = function(app){

	// Index routing - (Chaining verbs)
		var index = ['/', '/home']; //Array stores multiple valid paths for this route
		app.route(index)
			.get(function(req, res){
				res.render('index');
			});

}