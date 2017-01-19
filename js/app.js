function updateTime() {
	var d = new Date();
	var time = new Date(new Date().getTime()).toLocaleTimeString();
	$("#time").text(time);
	setTimeout(updateTime, 1000)
}
	
$(document).ready(function() {
	updateTime();
});

