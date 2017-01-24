var key = "3530553cce7adca5c5525b813494ada0";
var geo = navigator.geolocation;
var weather = [];
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 300000
};

if ("geolocation" in navigator) {	
	geo.getCurrentPosition(success, error,options);
} else {
	alert("Location services is not available or turned on");
}

function success(position) {
	var latitude  = position.coords.latitude;
	var longitude = position.coords.longitude;
	var url = "https://api.darksky.net/forecast/"+key+"/"+latitude+","+longitude;

	$.get({
		url: url,
		headers: {"Access-Control-Allow-Origin": true},
		dataTyoe: 'jsonp',
		type: 'GET',
		success: function(data){
			console.log(data);
		}
	})

	$("#weather-feature").html(weather)
}

function error() {
	alert("Location services is not available or turned on");
}

