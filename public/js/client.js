

/*jQUERY*/
$(document).ready(function(){

   //Copyright Date
   	var date = new Date();
   	$("#copyRightYR").html('&copy'+date.getFullYear()+' - GregoryWolfe.tech');

}); 




/* JS NATIVE*/


//Handles active state UI on site navigation.
	//Subject to change, depending on use of additional contextual nav classes, or lack of them, in templates
	function navBarSelected(){
		var links = document.getElementsByClassName('nav-link');
		for (var i = 0; i < links.length; i++) {
			if (links[i].href ==window.location.href) {
				links[i].parentElement.className += " active"; //space on concat is important
			}
		}
		/*
			if matches dropdown link href,
			set parent's --> parent to active
		*/
		var dropDownLinks = document.getElementsByClassName('dropdown-item');
		for (var k = 0; k < dropDownLinks.length; k++) {
			if (dropDownLinks[k].href == window.location.href) {
				dropDownLinks[k].parentElement.parentElement.className += " active"; //space on concat is important
			}
		}

	}

	navBarSelected();

