function calendar_data(id,name)
{
	this.id = id;
	this.name = name;

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
	HTML_PRINT('<p>Total of ' + this.cal_lenght + ' event(s)' + this.name + '</p>' + '<ul>');

	for(i=0;i<this.cal_lenght; i++){ /* For each entry */
		HTML_PRINT('<li><strong>Event title:</strong> ' + this.cal_array[i].name);
	}
	HTML_PRINT('</ul>');
}

var a;
var b;
function refresha()
{
	a.ready();
}
function refreshb()
{
	b.ready();
}

/*
 * Entry point called by the loader.
 * NOTE: This is called from the browser's event loop.
 * Events are queued in the browser.
 */
function main()
{
	a = new calendar_data('9lkp4oeo8ttsk951m5e66vg750@group.calendar.google.com', "Example");
	b = new calendar_data('nv7jcevvobmfn815laghc9rod0@group.calendar.google.com', "Coupon");
}
