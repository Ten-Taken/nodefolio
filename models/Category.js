/*MODEL - Blog Categories
**
	Schema and model for Categories, for the blog
		-Category 1::Many association with Posts (title)
              - category column becomes primary key
*/

// in models/Category.js
module.exports = function(connection, DataTypes) {
  return connection.define('Category', { 

  	category: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false, // Entries must have a category
                unique: true
      },

      image:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
      },

      imgalt: {
              type: DataTypes.STRING,
              allowNull: true
      },

      description: {
                type: DataTypes.TEXT,
                allowNull: true,

      },

      link:{
                type: DataTypes.STRING,
                defaultValue: "#"
      }



  },

  {
  	freezeTableName: true 
  }

  );

};

