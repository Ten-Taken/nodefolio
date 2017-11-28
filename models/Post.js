/*MODEL - Blog Posts
**
	Schema and model for posts, for the blog
		-Note - If you add methods to models, check out documentation on '.__factory.associations[]'
*/

// in models/Post.js
module.exports = function(connection, DataTypes) {
  return connection.define('Post', { //An 's' is being concatenated somewhere....freezeTableName fixes this. Silly feature
  	category: DataTypes.STRING,
    	title: DataTypes.STRING,
    	author: DataTypes.STRING,
    	body: DataTypes.TEXT
  },
  {
  	freezeTableName: true
  }
  );
};
