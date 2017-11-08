/**
Application begins here.
*/

/* Launching Application
**
	Launching is as simple as issuing shell command '$node "appname.js"' or just "appname"
*/

/* Global Object
**
	The Node global object contains many methods typically handled by the Window object client-side.

	Reference:  https://nodejs.org/api/globals.html
*/

console.log("Hello world!"); // Logs message
console.log(__dirname); //Prints directory
console.log(__filename);  // Prints complete path

var time = 0;
var timer = setInterval(function(){
	time +=1;
	console.log(time +" seconds");
	if (time >6) {clearInterval(timer);}
},1000);


/* Function Expressions
**
*/
var sayBye = function(){console.log("Goodbye!");};

sayBye();


/* Passing functions as arguments
**
*/
function callFunction (funFunction){
	funFunction();
}

callFunction(sayBye);


/*Modules
**
	Node code organization and extensibility is handled via 'modules'.
	Variable scope is encapsulated to its containing module, UNLESS
	it is explicitly exported from within the module.  Modules return
	their exported data, and need to be stored for access.
*/
var count = require('./count.js');  //Include module. File extension not required in path string.

var girlArray = ['Allison', 'Tricia', 'Bethany', 'Jennifer']; //String array for testing.
console.log(count(girlArray));


/*Module Patterns
**
*/
var modulepatterns = require('./modulepatterns');
console.log(modulepatterns.adder(5,11));
console.log(modulepatterns.tuna);
console.log(modulepatterns.pi);