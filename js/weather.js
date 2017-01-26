var key = "3530553cce7adca5c5525b813494ada0";
var geo = navigator.geolocation;
var weather = ["clear-day", "clear-night", "rain", "snow", "sleet", "wind", "fog", "cloudy", "partly-cloudy-day", "partly-cloudy-night"];

var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 300000
};

if ("geolocation" in navigator) {	
	geo.getCurrentPosition(success, error, options);
} else {
	console.log("Location services is not available or turned on");
}

function success(position) {
	var latitude  = position.coords.latitude;
	var longitude = position.coords.longitude;
	var url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/"+key+"/"+latitude+","+longitude;

	$.get({
		url: url,
		headers: 'Access-Control-Allow-Origin: *',
		dataTyoe: 'jsonp',
		success: function(data){
			var icon = data.currently.icon;
			console.log(data);
			weather.find(function(icons){
				icons == icon ? $('#icon_img').attr('src', "./assets/SVG/"+icon+".svg") : console.log(false)
			});			
			$('#weather-feature').append('<p class="temp">'+Math.round(data.currently.temperature) +' &degF</p>');
			$('#weather-feature').append('<p class="location">'+data.hourly.summary +'</p>');
			
            renderPanel(data);
		}
	})
}

function error() {
	console.log("Location services is not available or turned on");
}

// render weather-panel
function renderPanel(data) {
    var summary = data.daily.summary,
        daily   = data.daily.data,
        $weatherPanel = $('#weather-panel .panel-content'),
        $summary = $('<p>Summary: ' + summary + '</p>'),
        $table   = $('<table></table>'),
        $daily   = $('<pre>' + JSON.stringify(daily, null, 2) + '</pre>');

    $table
        .append(['<thead>',
                 '<tr>',
                 '<th>Day</th>',
                 '<th>Low</th>',
                 '<th>High</th>',
                 '<th>Weather</th>',
                 '</tr',
                 '</thead>',
                 '<tbody>'
                ].join(''))


    daily.forEach(function (day) {

        var date = new Date(day.time * 1000).toDateString(),
            $tr = $('<tr></tr>');

        $tr
            .append('<td>' + date.slice(0, 10) + '</td>')
            .append('<td>' + Math.round(day.temperatureMin) + '</td>')
            .append('<td>' + Math.round(day.temperatureMax) + '</td>')
            .append('<td>' + day.icon + ' <i class="wi wi-' + day.icon + '"></i></td>');


        $table.append($tr);

    })

    $weatherPanel
        .append($summary)
        .append($table);

}