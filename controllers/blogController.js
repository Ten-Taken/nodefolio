/*BLOG Controller
**
	Handles routes for blog application
*/

module.exports = function(app){
		
	// Blog Page view
	app.route('/blog')
		.get(function (req, res) {
		res.render('blog');
		});


}