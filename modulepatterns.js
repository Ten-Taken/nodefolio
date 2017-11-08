/* Test Module
**
	This test module is to export multiple functions.
*/

var adder = function(a,b){
	//return 'The sum of these two numbers is '+(a+b)+'.';
	//Note - template string of ES6 allows the following:
		return `The sum of these two numbers is ${a+b}.`;
}

var pi = 3.142;

var tuna = "Tuna!";


/*Module Object
**
	The module exports object is simply an empty object. You define 
	methods as properties.  Very intuitive.
*/
module.exports.adder=adder;
module.exports.pi = pi;
module.exports.tuna = tuna;

//Or simply module.exports.pi = 3.142

//You may also export as an object literal, like so:
/*
	module.exports = {
		adder: 	adder,
		pi: 		pi,
		tuna: 	tuna
	};