/* MODEL LOADER index
**
	Imports db connection and all models (sequelize .import() ) to build any necessary table associations.
	The loaded db connection is then exported to be used directly by the controllers.
*/

// Load instance of db connection
var connection = require('../ORM/connection.js').connection; 


// load models
var models = [
  'Category',
  'Post',
  'Sessions',
  'Admin'
];

models.forEach(function(model) {
  module.exports[model] = connection.import(__dirname + '/' + model+'.js');
});


// describe relationships
	(function(m) {
	  //m.PhoneNumber.belongsTo(m.User);
	  //m.Task.belongsTo(m.User);
	  //m.User.hasMany(m.Task);
	  //m.User.hasMany(m.PhoneNumber);
	  m.Post.belongsTo(m.Category, {foreignKey: 'fk_categoryname', targetKey: 'category'}); // Adds fk_categoryname to Post
	})(module.exports);


// export connection
module.exports.connection = connection;