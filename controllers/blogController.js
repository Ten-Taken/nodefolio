/*BLOG Controller
**
	Handles routes for blog application
*/



module.exports = function(app){

// Reference loaded Post and Category models
	var Post = app.get('connection').models.Post;
	var Category = app.get('connection').models.Category;


/* ====COMMENT SEPARATION FROM EXAMPLES =====*/



//Manipulating records

	//Inserting records in bulk
	/*
	Category.bulkCreate([
	  { category: 'Development'},
	  { category: 'Animals'},
	  { category: 'Gaming'},
	  { category: 'Miscellaneous'},
	  { category: 'Personal'},
	  { category: 'Opinion'}
	]);
	*/

	//Inserting a record ( .create() = immediate persistance.  .build() = is not stored until calling .save() )
		//both .create() and .save() are async
	/*
	Post.create({
		category: 	"Development",
		title: 		"Provisioning an Arch linux server",
		author: 	"Gregory Wolfe", 
		body: 		"At first it feels like banging your head on a marble desk..."
	});

	Post.create({
		category: 	"Personal",
		title: 		"Cooking Fish",
		author: 	"Gregory Wolfe", 
		body: 		"Olive oil, lemon, butter, and..."
	});

	Post.create({
		category: 	"Animals",
		title: 		"Endangered Red Wolf",
		author: 	"Gregory Wolfe", 
		body: 		"Reintroduction efforts have been dwindling..."
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
			
			
	//Func Def Promise  - Query category column of Category table (returns an array of objects)
	/*
	var categoryList = function(){

		Category.findAll({attributes: ['category'], raw: true})
			
			.then(function (Category) {
		            
		            console.log(Category);
		            //return Category;
		         
	    		})

			.catch(function (error) {
	            
	            	console.log(error.message);
	         		//return error.message;
	        	});
    	}

	categoryList();
    	*/

/* ====COMMENT SEPARATION FROM EXAMPLES =====*/


	// Blog Page view
	app.route('/blog')
		.get(function (req, res) {

			Category.findAll({attributes: ['category'], raw: true})
				
				.then(function (Category) {
			            
			            var categoryList = Category;
			            console.log(categoryList);

			            res.render('blog',{categories: categoryList});
			         
		    		})

				.catch(function (error) {
		            
		            	console.log(error.message);
		         		//return error.message;
		        	});

		});



}