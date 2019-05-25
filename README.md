# nodefolio

A SSR Express app I built to power a portfolio.


## About
**Author**: _Gregory Wolfe (ten-taken)_

This project is now deprecated and no longer deployed.
I'm leaving it public because Express is such a cool framework.


### Technologies
_Technologies Used_
1. [Node.js](https://nodejs.org/en/ "Node.js")
2. [Express.js](https://expressjs.com/ "Express.js")
3. [EJS](http://www.embeddedjs.com/ "EJS")
4. [PostgreSQL](https://www.postgresql.org/)
5. [Bootstrap](http://getbootstrap.com/ "Bootstrap")
6. [Sequelize](http://docs.sequelizejs.com/ "Sequelize")


### Installation
1. Download or clone the repository into your node environment
2. Run `npm install --production` from the root directory
3. You will need to create two config files to match your environment:

	- **nodefolio/ORM/dbCredentials.js**

	*This file sets the environment variables that allow the app to access a database. You must install and create a PostgreSQL database yourself. Steps to do this are outside the scope of this document.*


	`const dbCredentials = {`  
    	`database:   	'yourDatabaseName',`//*change*  
    	`username:    	'yourDatabaseUser',`//*change*  
    	`password:   	'yourDatabasePassword',`//*change*  
    	`host:    		'localhost',`//*do not change*  
    	`dialect: 		'postgres',`//*do not change*  
    	`max: 			100`//*do not change*  
	`};`  
	`module.exports = dbCredentials;`  

	- **nodefolio/controllers/blogCredentials.js**

	*This file is used to create an administrative user for the app blog feature. You may use any credentials you wish, as long as the email is in a valid format. Blog admin tools are not linked on the site, so to access them you must visit* `localhost:3000/blog/admin`  


	`const blogCredentials = {`  
    	`email:   		'email@example.com',`//*change*  
    	`password:    	'examplePasswd',`//*change*  
	`};`  
	`module.exports = blogCredentials;`  


### Launching

From the root directory, run `node nodefolio`  

My intention is to leave the application in a test-environment state in this repository.  In production, the site has additional security headers and encryption enabled.


### Changelog

`0.1.0`
* Updated to SSL/TLS protocol
* Automated deployment task(s)

`0.0.5`

* Created base application structure and environment
* Set up view routing


#### License
No license is granted.  This is a project for personal proficiency, education, and
showcasing to interested professional parties. Contributions are not expected.
