

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
				links[i].parentElement.className += " active";
			}
		}
	}

	navBarSelected();

