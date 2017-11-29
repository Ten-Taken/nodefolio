/*BLOG Controller
**
	Handles routes for blog application
*/



module.exports = function(app){

// Loaded Post model
	var Post = app.get('connection').models.Post;
		
		//var Post = require('../models/index.js')['Post'];
			//console.log(Post); //Yields post object separate from sequelize object

		// When storing imports in properties, this is how accessors work
			//console.log(app.get('connection').Post);  //undefined
			//console.log(app.get('connection').models.Post); // This is how you access it
			//console.log(app.get('connection').models); // ^Same as above

		//When storing imports in an array, this is how accessors work
			//console.log(app.get('connection').Post);  //undefined
			//console.log(app.get('connection').models.Post);  //Still works the same
			//console.log(app.get('connection').models); //Still works the same
			//console.log(app.get('connection')['Post']); //undefined

//Manipulating records

	//Inserting a record ( .create() = immediate persistance.  .build() = is not stored until calling .save() )
		//both .create() and .save() are async
	/*	
	Post.create({
		category: 	"Personal",
		title: 		"How To Cook Fish",
		author: 	"Elvis Presley", 
		body: 		"Start with butter, then...."
	});
	*/	

	//Retrieving a record
	/*
	Post.findById(1).then(function(Post){
		console.log(Post.dataValues);
	});
	*/
		
	//.then(function(error){
	//	console.log(error); //Standard error handling promise
	//});


	// Blog Page view
	app.route('/blog')
		.get(function (req, res) {
		res.render('blog');
		});


}