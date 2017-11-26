/*ABOUT Controller
**
	Handles routes for about page
*/

module.exports = function(app){

	// About Page
		app.route('/about')
  			.get(function (req, res) {
				res.render('about');
  			});

}