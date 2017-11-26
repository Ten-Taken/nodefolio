/*CONTRACTS Controller
**
	Handles routes for clients / contracts page
*/

module.exports = function(app){

	// Contracts Page
		app.route('/clients')
  			.get(function (req, res) {
				res.render('contract');
  			});

}