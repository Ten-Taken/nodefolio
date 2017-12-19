/*DATABASE Connection
**
*/

// Import ORM module
const Sequelize = require('sequelize');

// Import connection credentials
const dbCredentials = require('./dbCredentials.js'); //git ignoring for security

// Instantiate db connection
const connection = new Sequelize(dbCredentials.database, dbCredentials.username, dbCredentials.password, {
  host: dbCredentials.host,
  dialect: dbCredentials.dialect,
  logging: false, //disable SQL console logging for production security

  	/*
	Deprecation warning even without the use of aliases. Expects 'Sequelize.Op' configuration
	if not disabled.  Possibly an 'over-engineered' solution already handled by data
	sanitization.  Resolution pending. See:
  	https://github.com/sequelize/sequelize/issues/8417
  	http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
  	http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  	*/
  operatorsAliases: false,

  pool: {
    max: dbCredentials.max,  // Maximum number of connections in the pool.
    min: 0,
    acquire: 30000, //The maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000 //10 seconds. The maximum time, in milliseconds, that a connection can be idle before being released.
  },

});

// Log status confirmation
connection
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports.connection = connection;