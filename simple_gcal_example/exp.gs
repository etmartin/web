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

function fetch_feed_callback(root)
{
	var when;
	var datetime;
	var date;
	var i,j;
	var events;
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
		PRINT(date + cal_array[i].name);
	}
}

function handle_error(e)
{
	alert("There was an error!");
	alert(e.cause ? e.cause.statusText : e.message);
}

/*
 * Entry point called by the loader
 */
function main()
{
	/* 
	 * Those id are pointing to public calendar 'my experimental google cal stuff'
	 */
//	var id = "nv7jcevvobmfn815laghc9rod0@group.calendar.google.com";//coupon
	var id = "9lkp4oeo8ttsk951m5e66vg750@group.calendar.google.com";//example
	var feedurl = "https://www.google.com/calendar/feeds/"+id+"/public/full";
	var service = new google.gdata.calendar.CalendarService('local_example');

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
	setTimeout("update_html()",6000);
}

function update_html()
{
	var html;
	var content = document.getElementById("DEBUG"); /* ptr to my html page */

	PRINT("AAAAAAAAAAAAAAAAAAAA");
	/* We construct the page dynamically */
	html = '<p>Total of ' + cal_lenght + ' event(s)</p>';
	html += '<ul>';
	content.innerHTML = html; /* Publish the page */

	//for(i=0;i<cal_lenght; i++){ /* For each entry */
	//	html += '<li><strong>Event title:</strong> ' + cal_array[i].name;
	//}
	//html += '</ul>';
	//content.innerHTML = html; /* Publish the page */
}
