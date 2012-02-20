function handle_error(e)
{
	alert("There was an error!");
	alert(e.cause ? e.cause.statusText : e.message);
}

function fetch_feed_callback(root)
{
	var when, datetime, date, i,j, events;
	var entries = root.feed.getEntries(); /* root.feed.getEntries() return and ARRAY of entry */

	this.cal_lenght = entries.length;
	this.cal_array = new Array(this.cal_lenght);

	for(i=0;i<entries.length; i++){ /* For each entry */
		events = entries[i];

		/*
		 * For some reason the entry has another dimension which is
		 * related to it's time events.getTimes().length; Don't know what it is
		 * events.getTimes().length always return 1 ???
		 */
		this.cal_array[i] = new Object();
		this.cal_array[i].name = events.getTitle().getText();
		if(events.getTimes().length != 1){
			BUG("lenght !=1 ");
		}

		when  = events.getTimes()[0];
		datetime = when.getStartTime();
		date = datetime.getDate();
		this.cal_array[i].date = date;
	//	PRINT(date + this.cal_array[i].name);
	}

	/*
	 * Let the JVM go back to the main loop, and schedule our self
	 * back in the event queue. We are done with the data
	 * NOTE how we save 'this' in this local; This is because the 
	 * settimeout itself manipulate 'this'; Arg is not saved from the calling pt???
	 */
	if(this.ready){
		var _this = this;
		setTimeout(function() {_this.ready();}, 1);
	}
}

function get_calendar_data()
{

	var feedurl = "https://www.google.com/calendar/feeds/"+this.id+"/public/full";
	var service = new google.gdata.calendar.CalendarService('local_example');

	/*
	 * Here we put the callback in the function to get access to this 
	 * and we use a proxy to put the code out of the body.
	 * Note here how we latch 'this' into this local
	 * This is because the callback is from a different
	 * context and so a different 'this'...
	 */
	var _this = this;
	var callback = function callback_proxy(root){
		fetch_feed_callback.call(_this,root);
	}

	if(0){
		/*
		 * This is the simpliest way to retreive the calendar feed
		 */
		service.getEventsFeed(feedurl, callback, handle_error);
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

		service.getEventsFeed(query, callback, handle_error);
	}
}

