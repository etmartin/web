function handle_feed(root)
{
	var i,j;
	var entries = root.feed.getEntries();
	var events;
	var html;
	var when;
	var datetime;
	var date;
	var content = document.getElementById("DEBUG");

	html = '<p>Total of ' + entries.length + ' event(s)</p>';
	html += '<ul>';

	/* 
	 * root.feed.getEntries return an array of entry
	 * For each entry...
	 */
	for(i=0;i<entries.length; i++){
		events = entries[i];

		/*
		 * For some reason the entry has another dimension which is
		 * related to it's time events.getTimes().length; Don't know what it can be
		 */
		html += '<li><strong>Event title:</strong> ' + events.getTitle().getText();
		for(j=0;j<events.getTimes().length;j++){
			when  = events.getTimes()[j];
			datetime = when.getStartTime();
			date = datetime.getDate();
			html += date + '</li>';
		}
	}
	html += '</ul>';
	content.innerHTML = html;
}

function handle_error(e)
{
	alert("There was an error!");
	alert(e.cause ? e.cause.statusText : e.message);
}

function main()
{
//	var id = "nv7jcevvobmfn815laghc9rod0@group.calendar.google.com";//coupon
	var id = "9lkp4oeo8ttsk951m5e66vg750@group.calendar.google.com";//example
	var feedurl = "https://www.google.com/calendar/feeds/"+id+"/public/full";
	var service = new google.gdata.calendar.CalendarService('local_example');

	if(0){
		var startDate = new Date;
		var lastDate = new Date(startDate);
		var query;
		var startDateTime;
		var endDateTime;
		
		lastDate.setDate(startDate.getDate() + 5);

		query = new google.gdata.calendar.CalendarEventQuery(feedurl);

		startDateTime = new google.gdata.DateTime(startDate, true);
		endDateTime = new google.gdata.DateTime(lastDate, true);
		query.setMinimumStartTime(startDateTime);
		query.setMaximumStartTime(endDateTime);

		query.setMaxResults(500);
		query.setOrderBy('starttime');
		query.setSortOrder('a');
		query.setSingleEvents(true);

		service.getEventsFeed(query, handle_feed, handle_error);
	}
	else{
		service.getEventsFeed(feedurl, handle_feed, handle_error);
	}
}

