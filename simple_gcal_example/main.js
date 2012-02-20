function calendar_data(id)
{
	this.id = id;

	/* 
	 * Here we use the call method part of Function class
	 * in order to assign this
	 */
	get_calendar_data.call(this);
}

/*
 * Update the UI
 */
calendar_data.prototype.ready = function()
{
	var i;

	/* We construct the page dynamically */
	HTML_PRINT('<p>Total of ' + this.cal_lenght + ' event(s)</p>' + '<ul>');

	for(i=0;i<this.cal_lenght; i++){ /* For each entry */
		HTML_PRINT('<li><strong>Event title:</strong> ' + this.cal_array[i].name);
	}
	HTML_PRINT('</ul>');
}

/*
 * Entry point called by the loader.
 * NOTE: This is called from the browser's event loop.
 * Events are queued in the browser.
 *
 * Start from event page load
 *  - Get feed event
 *  - time out 0 event -> ready
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

	a = new calendar_data(ids);
}
