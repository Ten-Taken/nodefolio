/* Module for counting things
**
	This test module is for counting things.
*/

var count = function(argArray){
	return 'There are '+argArray.length + ' elements in this array';
};


/* Exporting
**
*/

module.exports = count;
//console.log(count(['Alicia', 'Victoria', 'Jennifer']));