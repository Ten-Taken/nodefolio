/*BLOG Controller
**
	Handles routes for blog application
*/



module.exports = function(app){

	// Loaded Post model
	var Post = require('../models/index.js').Post;

	// Blog Page view
	app.route('/blog')
		.get(function (req, res) {
		res.render('blog');
		});


}