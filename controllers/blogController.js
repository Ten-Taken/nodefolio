/*BLOG Controller
**
	Handles routes for blog application
*/



module.exports = function(app){

//Pull in dependencies to export a router
	var express = require('express')
  	var router = express.Router()

//Body parsing module for POST requests
var bodyParser = require('body-parser'); 

//Authentication and Session Modules
var expressValidator = require('express-validator');
var expressSession = require('express-session');

//Attach middle-ware for this router
router.use(bodyParser.urlencoded({ extended: false }));
router.use(expressValidator()); //Initializes the validator

router.use(expressSession({
	store: new (require('connect-pg-simple')(session))(), //uses session table
	secret: 'temp', 
	saveUninitialized: false, 
	resave: false,
	genid: function(req) {
    			return genuuid() // use UUIDs for session IDs
  	}, 
	cookie: { secure: false, //change to true for production
			      path: '/blog/admin',
			sameSite: true
	}
}));
	//Choosing between pg-session module, and sequelize-session module for session storage

// Reference loaded Post and Category models
	var Post = app.get('connection').models.Post;
	var Category = app.get('connection').models.Category;


/* ====COMMENT SEPARATION FROM EXAMPLES =====*/



//Manipulating records

	//Inserting records in bulk
	/*
	Category.bulkCreate([
	  { category: 'Development', image: '/images/devcon.svg' ,imgalt: 'Icon of a computer terminal.' ,description: 'Programming and Web Development'},
	  { category: 'Animals', image: '/images/animalcon.svg' ,imgalt: 'Icon of a bear.' ,description: 'All things animals.'},
	  { category: 'Gaming', image: '/images/gamecon.svg' ,imgalt: 'Icon of a game controller.' ,description: 'Gaming reviews and shenanigans.'},
	  { category: 'Miscellaneous', image: '/images/miscon.svg' ,imgalt: 'Icon with two arrows.',description: 'Off-topic posts.'},
	  { category: 'Personal', image: '/images/personalcon.svg' ,imgalt: 'Icon of pencil and paper.',description: 'Posts about life and being human.'},
	  { category: 'Opinion', image: '/images/opinioncon.svg' ,imgalt: 'Icon of a lightbulb.' ,description: 'Posts about events and ideas.'}
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
		category: 	"Development",
		title: 		"Creating data models.",
		author: 	"Gregory Wolfe", 
		body: 		"Some say an Object Relational Mapper is more trouble than it is worth..."
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

		Category.findAll({attributes: ['category','image','imgalt','description'], raw: true})
			
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



	//Blog Administration - Login Page
	router.get('/admin', function(req, res){

		res.render('blogLogin');
	});

	//Blog Administration -Authentication
	router.post('/admin', function(req, res){
		//do stuff
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


	//Blog -  Category - Post - Routes
		//This chained promise dynamically creates route for each blog post. String patterns are used to match valid posts
	Post.findAll({attributes: ['category', 'author', 'title', 'body', 'createdAt','updatedAt'], raw: true})

		.then(function(Post){
			Post.forEach(function(post){
				router.get('/*'+(post.title).split(' ').join('_'), function(req,res){ 
				
						
							var currentPost = post;
							console.log(currentPost);

							res.render('blogPost',{post: currentPost});
				});


			});
		})
		.catch(function(error){
			console.log(error.message);
		});


	//Must return router (expected by .use() method.)
	return router;

} // close export function

