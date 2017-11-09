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


/* Core Modules - Events emitter module
**
	Node ships with core modules which can be imported the same way custom modules are.
	Reference: https://www.w3schools.com/nodejs/ref_modules.asp
	The events module is similar to event listeners, but allows for development
	of custom events.
*/
var events = require('events'); //Imports core module. Notice there is no path.

var myEmitter = new events.EventEmitter(); //Instantiates new event emitter

//Callback function definition on custom event
myEmitter.on('Eruption', function(mssg){
	console.log(mssg);
}); 

myEmitter.emit('Eruption','Lava, smoke, and ash cover the skies!');  //Fires custom event


/* Core Modules - Utilities module
**
	The util module is a bit of a swiss army knife. Demonstrating
	the use of inheritence in below example.
*/

var util = require('util'); //Imports core module.

//Creating a constructor function
var Person = function(name){
	this.name = name;
};

util.inherits(Person, events.EventEmitter); //Now the object constructor includes the functionality for custom events

var victor = new Person('victor');
var john = new Person('john');
var beth = new Person('beth');

var people = [victor,john,beth];

//Attaching custom speak event to each person object in the array
people.forEach(function(person){
	person.on('speak',function(mssg){
		console.log(person.name+' said '+mssg);
	});
});

//Firing event with callback from a person object
victor.emit('speak', 'I also like to live dangerously.');
john.emit('speak','There are many fish in the sea, but few worth catching.');
beth.emit('speak', 'All your base are belong to us!');


/* Core Module - fs module
**
	The fs module can be used for RW file manipulation.
*/
var fs = require('fs');

//Synchronous methods complete execution before the program continues. (Execution waits. AKA 'Blocking Code')
var dummytxt = fs.readFileSync('dummy.txt', 'utf8'); // (path, encoding)
console.log(dummytxt);

//Synchronous file output
fs.writeFileSync('writeMe.txt',dummytxt); // (path, data)

//Asynchronous methods are non-blocking, program execution continues before execution finishes. (path, encoding, callback)
	//callback executes when operation is completed
fs.readFile('dummy.txt','utf8', function(err, data){
	console.log(data);
});

console.log('This is not blocked by the second read-through!');

//Deleting files with fs module
fs.unlink('writeMe.txt'); //shell warns using asynch functions without callback is deprecated. Current LTS is later than tut material


//Creating directory - Sync
	//fs.mkdirSync('tempDIR');
//Deleting directory - Sync
	//fs.rmdirSync('tempDIR');
//Creating directory - Async
	/*
	fs.mkdir('tempDIR', function(){
		fs.readFile('dummy.txt', 'utf8', function(err,data){
			fs.writeFile('./tempDIR/dummycopy.txt',data);
		});
	});
	*/
//Deleting directory - Async
	/*
	fs.unlink('./tempDIR/dummycopy.txt',function(){
		fs.rmdir('./tempDIR', function(){
			console.log('Directory removed');
		});
	});
	*/