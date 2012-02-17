function OnLoad() {
	main();
}

/* 
 * The google Google AJAX API has been loaded from the html page.
 * Library are typically loaded here but can also be loaded 
 * from the html directly (faster...)
 * Here the loader require a callback method that is called upon completion
 */
function Loader() {
	google.load("gdata", "2"); //http://code.google.com/apis/gdata/jsdoc/2.2/index.html
	google.setOnLoadCallback(OnLoad);
}

Loader();

