/*MODEL - Blog Posts
**
	Schema and model for posts, for the blog
		-Note - If you add methods to models, check out documentation on '.__factory.associations[]'
            - Post table has Many:: 1 relationship with Category table.
            -category column becomes foreign key
            - title column becomes PK
*/

// in models/Post.js
module.exports = function(connection, DataTypes) {
  return connection.define('Post', { 

  	category: {
                type: DataTypes.STRING,
                allowNull: false, // Entries must have a category
                defaultValue: "Miscellaneous"         
      },

    	title:{
                type: DataTypes.STRING,
                primaryKey: true,
                unique: true,  //Field must hold unique values
                allowNull: false // Entries must have a title
      },

    	author:{
                    type: DataTypes.STRING,
                    defaultValue: "Gregory Wolfe"
      },

    	body: {
                  type: DataTypes.TEXT,
                  defaultValue: "Coming Soon..."
      }

  },
  {
  	freezeTableName: true // freezeTableName stops sequelize from pluralizing names (concats an 's')
  }
  );
};

/*See Hooks documentation - can fire middleware before and after table operations. Hooks are defined
in the models themselves. (Method 1).  Method 2 allows you to call hooks from the sequelize
object while manipulating records (do this in controllers)
*/
