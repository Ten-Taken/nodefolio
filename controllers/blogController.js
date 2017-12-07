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
	/*
	app.route('/blog')
		.get(function (req, res) {

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
	*/	
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

	//I could possibly make these dynamic by querying the category table and looping over paths (lower case)

	//Blog -  Category - Development
	router.get('/development', function(req, res) {
		/*find all from Category table where category = development*/
		/*find/list from Post table where category = development*/
		res.render('blogCategory');

	});

	//Blog -  Category - Animals
	router.get('/animals', function(req, res) {

		res.render('blogCategory');

	});

	//Blog -  Category - Gaming
	router.get('/gaming', function(req, res) {

		res.render('blogCategory');

	});

	//Blog -  Category - Miscellaneous
	router.get('/miscellaneous', function(req, res) {

		res.render('blogCategory');

	});

	//Blog -  Category - Personal
	router.get('/personal', function(req, res) {

		res.render('blogCategory');

	});

	//Blog -  Category - Opinion
	router.get('/opinion', function(req, res) {

		res.render('blogCategory');

	});				



	//Must return router (expected by .use() method.)
	return router;

} // close export function

