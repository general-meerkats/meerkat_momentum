var time = {
	isStandard: true,
	date:new Date(),
	toggleStandard:function(){
		this.isStandard = !this.isStandard;
	},
	getHours: function(){
		return this.date.getHours();
	},

	getMinutes: function() {
		return this.date.getMinutes();
	},

	getTime: function(){
		var hours;

		if (this.isStandard)
			hours = this.getHours() % 12;
		else
			hours = this.getHours();
		
		var minutes = ("0" + this.getMinutes()).slice(-2);
		return (hours + ":" + minutes)
	},

	getPeriod:function(){
		if (this.getHours() > 12)
			return "PM";
		return "AM";
	},

	getPercentage: function(){
		var hours = this.getHours();
		var minutes = this.getMinutes() / 60;
		var totalTime = hours + minutes;
		var timeFinished = 17.5;
		var percentage = String(totalTime / timeFinished);

		return percentage.slice(2, 4);
	},

	getMessage: function(){
		var hour = this.getHours();

		var timeOfDay;
		if (hour < 12)
			timeOfDay = "Afternoon";
		else if (hour >= 12 || hour > 17)
			timeOfDay = "Afternoon";
		else if (hour <= 17)
			timeOfDay = "Evening"

		var message = `Good ${timeOfDay}, Thomas Nguyen`;
		return message

	},

	displayTime: function(){
		var timeDisplay = document.getElementById('time');
		timeDisplay.textContent = this.getTime();
	},

	displayPeriod: function(){
		var messagePeriod = document.getElementById('period');
		messagePeriod.textContent = this.getPeriod();
	},

	displayMessage: function(){
		var messageDisplay = document.getElementById('greetings');
		messageDisplay.textContent = this.getMessage();
	},
	init: function(){

		this.displayTime();
		// this.displayPeriod();
		this.displayMessage();

	}

}
time.init();
setInterval(function(){
	time.init();
}, 1000);

console.log(time.getTime());
console.log(time.getHours());
console.log(time.getMinutes());