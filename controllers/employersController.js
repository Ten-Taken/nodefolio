/* EMPLOYERS Controller
**
	Handles view routing for employers page
*/

module.exports = function(app){

	// Employers Page
		app.route('/employers')
  			.get(function (req, res) {
				res.render('employer');
  			});	

}