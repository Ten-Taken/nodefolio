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
var SequelizeStore = require('connect-session-sequelize')(expressSession.Store);


//Module for unique UID generation for sessions
const uuidv4 = require('uuid/v4');

//Attach parsing and validator middle-ware for this router
router.use(bodyParser.urlencoded({ extended: false }));
router.use(expressValidator()); //Initializes the validator

//Pull in validation and sanitization sub-modules
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//Attach session-store middle-ware
router.use(expressSession({
	store: new SequelizeStore({
		db: app.get('connection'),
		checkExpirationInterval: 30 * 60 * 1000, // Interval. Clears expired sessions from db every 30 minutes.
		expiration: 3 * 60 * 60 * 1000 // Session expires in 3 hours
	}),
	
	secret: 'temp', //need to either hash this or import (look at process.env)
	saveUninitialized: false, 
	resave: false,
	genid: function(req) {
    			return uuidv4() // use UUIDs for session IDs
  	}, 
	cookie: { secure: false, //change to true for production
			      path: '/blog/admin',
			sameSite: true,
			maxAge: 1 * 3 * 60 * 60 * 1000 // Cookie expires in 3 hours
	}
}));
	

// Reference loaded Admin, Post, and Category models
	var Admin = app.get('connection').models.Admin;
	var Post = app.get('connection').models.Post;
	var Category = app.get('connection').models.Category;


//Load db admin credentials - insert into Admin table (implement password hashing)
	const blogCredentials = require('./blogCredentials.js');
	Admin.findOrCreate({
		where: {email: blogCredentials.email},
		defaults: {
			email: 	blogCredentials.email,
			password: 	blogCredentials.password
		},
		raw: true
	})
	.spread((admin, created) => {
    		//console.log(admin.email); //Do not log this, as it exposes data. Instead log message.
    		if (!created) {
    			console.log("Blog Admin User already exists, skipping record insertion.");
    		}
    		
    	})
	.catch(function(error){
		/*"Cannot ready property 0 of 'undefined'"
			This error is generated when .spread() attempts to access an empty array.
			The array is empty only when the Admin table is empty, which can be
			just prior to the findOrCreate insertion on a fresh run. This will have no impact on
			the application or functionality.
		*/
		console.log("Blog Admin User not found. Creating User now.");
	});


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
		            //console.log(categoryList);

		            res.render('blog',{categories: categoryList});
		         
	    		})

			.catch(function (error) {
	            
	            	console.log(error.message);
	         		//return error.message;
	        	});

	});



	//Blog Administration - Login Page
	router.get('/admin', function(req, res){

		//If current (valid) session, render blog tools

		//Else, render login page.
		res.render('blogLogin', {success: req.session.success, errors: req.session.errors});

		//Destroy session before next attempt (this prevents old errors and from just reloading with session before logging in)
		req.session.destroy(function(err){
			if (err) {res.negotiate(err);}
		})


	});

	//Blog Administration -Authentication
	router.post('/admin', function(req, res){

		//Check for valid / sanitized data (expand on these..trim, strip slashes, encode, etc)
		req.checkBody('email', 'An email was not submitted.').notEmpty();
		req.checkBody('password', 'A password was not submitted').notEmpty();
		req.checkBody('email', 'Invalid email address').isEmail();

		var errors = req.validationErrors(); //stores all validation errors

		//Sanitize
		req.sanitize('email').escape();
		req.sanitize('email').trim();
		req.sanitize('password').escape();
		req.sanitize('password').trim();		

		//Store errors on session to return to user
		if (errors) {
			req.session.errors = errors;
			req.session.success = false;
			res.redirect('/blog/admin'); //route back for another attempt
		}
		else{

			//Query Admin table for matching user
			Admin.findOne({'email': req.body.email, raw: true})

				.then(function(Admin){

					//Store user credentials
					const adminUser = Admin; 

					//if valid, render blog tools
						//implement hashing module after this is built out
					if (req.body.password === adminUser.email) {

						req.session.success = true; //Use flag as an extra layer of security within blogTools view
						res.render('blogTools', {success: req.session.success});

					}

					//else redirect with login with message (expects (status code, URL))
						/*Note - sending a status code causes the browser to ask the user to click the redirect
						   URL, which is not desirable behavior. Leaving the status code out, this 
						   defaults to a 302 and immediately redirects.
						*/
					else{
						req.session.success = false; //Flag to render errors
						req.session.errors = [{msg:'Invalid password'}];
						res.redirect('/blog/admin');
					}

				})

				.catch(function(error){
					//Case where user email not found
					req.session.success = false; //Flag to render errors
					req.session.errors = [{msg:'User does not exist'}];
					res.redirect('/blog/admin');

				});

				
				
			
		}

		//res.redirect('/blog/admin');


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

							//console.log(postList);

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
							//console.log(currentPost);

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

