/*MODEL - Blog Admin Users
**
	Schema and model for  storing Admin credentials, for blog administration.
*/

// in models/Admin.js
module.exports = function(connection, DataTypes) {
  return connection.define('Admin', { 

  	email: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
                unique: true
      },


      password: {
              type: DataTypes.STRING(1234),
              allowNull: false
      },


  },

  {
  	freezeTableName: true 
  }

  );

};

