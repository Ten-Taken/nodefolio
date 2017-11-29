/* MODEL LOADER index
**
	Imports db connection and all models (sequelize .import() ) to build any necessary table associations.
	The loaded db connection is then exported to be used directly by the controllers.
*/

// Load instance of db connection
var connection = require('../ORM/connection.js').connection; 


// load models
var models = [
  'Post',
  'Category'
  //'User'  - Example
];

models.forEach(function(model) {
  //module.exports.model = connection.import(__dirname + '/' + model+'.js');
  //module.exports[model] = connection.import(__dirname + '/' + model+'.js');
  connection.import(__dirname + '/' + model+'.js');
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



/*
	Exporting to module.exports.model
	console.log(connection);
	This seems correct, as the sequelize object isn't being duplicated in
	module.exports.model. Just the model object by itself.
	It is instead storing the model object inside the sequelize object before
	you export it below.  Still, seems odd to me that the sequelize object
	seems to replicate itself for each model. You could still be creating too
	many connections (multiple pools).  documentation on .import() is poor.

	Other examples store models in an array instead of properties
	E.g  module.exports[model] = connection.import()...
	This yields identical structure to the sequelize object,
	and stores the model objects in array indicies separately as well

	Simply running import on the sequelize object, without
	exporting separely, like this
		connection.import(__dirname + '/' + model+'.js');
	Seems to yield identical results on the sequelize object.
	Until you run into an issue, there seems to be no benefit to
	loading the model objects into memory individually,
	regardless of which way you do it.
*/


// export connection
module.exports.connection = connection;