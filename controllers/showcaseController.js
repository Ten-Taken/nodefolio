/*SHOWCASE Controller
**
	Handles routes for showcase page
*/

module.exports = function(app){

	// Showcase Page
		app.route('/showcase')
  			.get(function (req, res) {
				res.render('showcase');
  			});

}