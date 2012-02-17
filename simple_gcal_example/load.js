function OnLoad() {
	main();
}

/* 
 * The google Google AJAX API has been loaded from the html page.
 * Extra Library are typically loaded with google.load but can also be loaded 
 * from the html directly (faster...)
 * Here the loader require a callback method. The callback is called upon load completion
 */
function Loader() {
	/* Calendar is part of the gdata class / library */
	google.load("gdata", "2"); //http://code.google.com/apis/gdata/jsdoc/2.2/index.html
	google.setOnLoadCallback(OnLoad);
}

Loader();

