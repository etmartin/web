function on_data()
{
	/* We construct the page dynamically */
	HTML_PRINT('<p>Total of ' + cal_lenght + ' event(s)</p>' + '<ul>');

	for(i=0;i<cal_lenght; i++){ /* For each entry */
		HTML_PRINT('<li><strong>Event title:</strong> ' + cal_array[i].name);
	}
	HTML_PRINT('</ul>');
}

/*
 * Entry point called by the loader
 * Called from event context
 * Events are queued in the browser's interpreter.
 * Here we access a global without any lock because the assumption 
 * is the the producer ended before we could even run; Weird run-time...
 */
function main()
{
/*
	var ids = [
		'nv7jcevvobmfn815laghc9rod0@group.calendar.google.com', //coupon
		'9lkp4oeo8ttsk951m5e66vg750@group.calendar.google.com', //example
	];
*/

	var ids = '9lkp4oeo8ttsk951m5e66vg750@group.calendar.google.com';
	/*
	 * Fetch the Calendar data; Everything is callback / event driven
	 */
	get_calendar_data("on_data()", ids);

}
