/*
 * struct cal_event{
 * 	struct date date;
 * 	char *name;
 * };
 *
 * struct cal_event cal_array[MAX_EVENT_SIZE];
 */
var cal_array;
var cal_lenght;
var module_callback;

function fetch_feed_callback(root)
{
	var when, datetime, date, i,j, events;
	var entries = root.feed.getEntries(); /* root.feed.getEntries() return and ARRAY of entry */

	cal_lenght = entries.length;
	cal_array = new Array(cal_lenght);

	for(i=0;i<entries.length; i++){ /* For each entry */
		events = entries[i];

		/*
		 * For some reason the entry has another dimension which is
		 * related to it's time events.getTimes().length; Don't know what it is
		 * events.getTimes().length always return 1 ???
		 */
		cal_array[i] = new Object();
		cal_array[i].name = events.getTitle().getText();
		if(events.getTimes().length != 1){
			BUG("lenght !=1 ");
		}

		when  = events.getTimes()[0];
		datetime = when.getStartTime();
		date = datetime.getDate();
		cal_array[i].date = date;
//		PRINT(date + cal_array[i].name);
	}
	/* 
	 * The operation is completed part of the event handler;
	 * Let the JVM go back to the main loop, and schedule our self in 
	 * the event queue
	 */
	setTimeout(module_callback,0);
}

function handle_error(e)
{
	alert("There was an error!");
	alert(e.cause ? e.cause.statusText : e.message);
}

function get_calendar_data(callback, ids)
{
	var feedurl = "https://www.google.com/calendar/feeds/"+ids+"/public/full";
	var service = new google.gdata.calendar.CalendarService('local_example');

	module_callback = callback;

	if(0){
		/*
		 * This is the simpliest way to retreive the calendar feed
		 */
		service.getEventsFeed(feedurl, fetch_feed_callback, handle_error);
	}
	else{
		/*
		 * Here we specify how we want to retreive the feed INSTEAD of defautl
		 */
		var startDate = new Date;
		var lastDate = new Date(startDate);
		var query;
		var startDateTime;
		var endDateTime;
		
		lastDate.setDate(startDate.getDate() + 5); /* Ask for 5 days at a time */

		query = new google.gdata.calendar.CalendarEventQuery(feedurl);
		startDateTime = new google.gdata.DateTime(startDate, true);
		endDateTime = new google.gdata.DateTime(lastDate, true);

		query.setMinimumStartTime(startDateTime);
		query.setMaximumStartTime(endDateTime);

		query.setMaxResults(500);
		query.setOrderBy('starttime');
		query.setSortOrder('a');
		query.setSingleEvents(true);

		service.getEventsFeed(query, fetch_feed_callback, handle_error);
	}
}

/*
calvis.Calendar.prototype.getFeedUrls = function() {
	var feedUrlArray = new Array();
	calIds = this.calIds;
	for ( var i = 0; i < calIds.length; i++) {
		feedUrlArray[i] = [ 'http://www.google.com/calendar/feeds/', calIds[i],
				'/public/full' ].join('');
	}
	return feedUrlArray;
};
*/



