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