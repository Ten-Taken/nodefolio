/*MODEL - Blog Admin Session
**
	Schema and model for  storing Session data, for blog administration.
      The "Sessions" table is the default of module for sequelize session storage.
      See https://www.npmjs.com/package/connect-session-sequelize
*/

// in models/Category.js
module.exports = function(connection, DataTypes) {
  return connection.define('Sessions', { 

  	sid: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
                unique: true
      },


      expires: {
              type: DataTypes.DATE,
              allowNull: false
      },

      data: {
              type: DataTypes.STRING(50000), //docs use varchar and not JSON
      }


  },

  {
  	freezeTableName: true 
  }

  );

};

