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

	console.log(position.coords.latitude, position.coords.longitude)
	console.log(latitude, longitude)

	$("#weather-feature").html(weather)
}

function error() {
	alert("Location services is not available or turned on");
}

