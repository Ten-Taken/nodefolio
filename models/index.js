/* MODEL LOADER index
**
	Imports db connection and all models (sequelize .import() ) to build any necessary table associations.
	The loaded db connection is then exported to be used directly by the controllers.
*/

// Load instance of db connection
var connection = require('../ORM/connection.js').connection; 


// load models
var models = [
  'Post'
  //'Task',  -Example
  //'User'  - Example
];

models.forEach(function(model) {
  module.exports.model = connection.import(__dirname + '/' + model+'.js');
});

// describe relationships
/* EXAMPLE
	(function(m) {
	  m.PhoneNumber.belongsTo(m.User);
	  m.Task.belongsTo(m.User);
	  m.User.hasMany(m.Task);
	  m.User.hasMany(m.PhoneNumber);
	})(module.exports);
*/

// export connection (may need to module.exports.connection = connection.  Review exports method)
module.exports.connection = connection;