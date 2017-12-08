/*BLOG Controller
**
	Handles routes for blog application
*/



module.exports = function(app){

//Pull in dependencies to export a router
	var express = require('express')
  	var router = express.Router()

// Reference loaded Post and Category models
	var Post = app.get('connection').models.Post;
	var Category = app.get('connection').models.Category;


/* ====COMMENT SEPARATION FROM EXAMPLES =====*/



//Manipulating records

	//Inserting records in bulk
	/*
	Category.bulkCreate([
	  { category: 'Development', image: '/images/devcon.svg' ,imgalt: 'Icon of a computer terminal.' ,description: 'Programming and Web Development',link: '#'},
	  { category: 'Animals', image: '/images/animalcon.svg' ,imgalt: 'Icon of a bear.' ,description: 'All things animals.',link: '#'},
	  { category: 'Gaming', image: '/images/gamecon.svg' ,imgalt: 'Icon of a game controller.' ,description: 'Gaming reviews and shenanigans.',link: '#'},
	  { category: 'Miscellaneous', image: '/images/miscon.svg' ,imgalt: 'Icon with two arrows.',description: 'Off-topic posts.',link: '#'},
	  { category: 'Personal', image: '/images/personalcon.svg' ,imgalt: 'Icon of pencil and paper.',description: 'Posts about life and being human.',link: '#'},
	  { category: 'Opinion', image: '/images/opinioncon.svg' ,imgalt: 'Icon of a lightbulb.' ,description: 'Posts about events and ideas.',link: '#'}
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



/* ====COMMENT SEPARATION FROM EXAMPLES =====*/


	// Blog Section Views
			/*Refactoring with .use() method allows a cleaner way to organize sub-pathing*/

  	// Blog top level
	router.get('/', function(req, res) {

		Category.findAll({attributes: ['category','image','imgalt','description','link'], raw: true})
			
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

	//Blog -  Category - Routes
		/* This chained promise dynamically generates routes based on categories in the Category table*/
	Category.findAll({attributes: ['category'], raw: true})
	
		.then(function(Category){
			Category.forEach(function(category){

				router.get('/'+(category.category).toLowerCase(), function(req,res){

					Post.findAll({attributes: ['category', 'title', 'createdAt','updatedAt'], where: {category: category.category},raw: true})

						.then(function(Posts){
							var postList = Posts;

								//check for undefined (case where no posts have been made to this category)
								if (typeof postList[0] ==undefined || postList[0]==null) {
									//Create a dummy array with an object. Pass a flag to help check. Clear path back to category.
									postList = [{category: category.category, title: "There are no posts in this category yet.", empty: true}];
								}

							console.log(postList);

							res.render('blogCategory', {posts: postList});
						})

						.catch(function(error){
							console.log(error.message);
						});
				});
			});
		});	


	//Must return router (expected by .use() method.)
	return router;

} // close export function

