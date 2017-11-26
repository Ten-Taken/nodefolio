/*STATIC Controller
**
	Handles static routes for all of nodefolio
*/

module.exports = function(app,express){

// Static file routing middleware.
app.use(express.static('public'));

// Static routing for localized Bootstrap (path is relative to where the controller fires)
app.use('/bootstrap/js', express.static('node_modules/bootstrap/dist/js')); 
app.use('/jquery/js', express.static('node_modules/jquery/dist'));
app.use('/popper/js', express.static('node_modules/popper.js/dist/umd'));


}