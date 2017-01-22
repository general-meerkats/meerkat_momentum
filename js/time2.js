/* jshint esversion:6 */
/* globals $, console */

var time = (function($) {
    
    // init vars
    var isStandard = true,
        tehDate,
        defaultNames = [
            'pal',
            'sexy',
            'handsome',
            'smarty pants',
            'good looking',
            'classy',
            'human shield'
        ];
    

    // generate new date and assign to 'tehDate'
    function createDate() {
        tehDate = new Date();
    }
    
    
    // 12-hr vs 24-hr clock
    function toggleStandard() {
        isStandard = !isStandard;
    }
    
    
    // get hour value from tehDate
    function getHours() {
        return tehDate.getHours();
    }
    
    
    // get minutes value from tehDate
    function getMinutes() {
        return tehDate.getMinutes();
    }
    
    
    // generate hours:minutes time string
    function getTime() {
        var hours,
            minutes;
        
        if (isStandard) {
            if ((getHours() >= 13) && (getHours() < 24)) {
                hours = getHours() % 12;
            } else if (getHours() === 0) {
                hours = 12;
            } else {
                hours = getHours();
            }
        } else {
            hours = getHours();
        }
        
        minutes = ("0" + getMinutes()).slice(-2);
        
        return (hours + ":" + minutes);
    }
    
    
    // generate AM/PM period
    function getPeriod() {
        return (getHours() > 12) ? "PM" : "AM";
    }
    
    
    // generate greeting message
    function getMessage() {
        var hour = getHours(),
            timeOfDay,
            userName,
            namesIndex = Math.floor(Math.random() * defaultNames.length);
        
        if (LS.getData('momentum-settings')) {
            userName = LS.getData('momentum-settings').userName;
        } else {
            userName = defaultNames[namesIndex];
        }
        
        if (hour < 12) {
            timeOfDay = "Morning";
        } else if (hour >= 12 && hour < 17) {
            timeOfDay = "Afternoon";
        } else {
            timeOfDay = "Evening";
        }

        return `Good ${timeOfDay}, ${userName}.`;
    }
    
    
    // render time to DOM
    function displayTime() {
        $('#time').text(getTime());
        // console.log(getTime());  // for diag
    }
    
    
    // render period to DOM
    function displayPeriod() {
        $('#time-period').text(getPeriod());
        // console.log(this.getPeriod());  // for diag
    }
    
    
    // render message to DOM
    function displayMessage() {
        $('#time-message').text(getMessage());
        // console.log(this.getMessage());  // for diag
    }
    
    
    // call everything
    function init() {
        createDate();
        displayTime();

        if (isStandard) {
            displayPeriod();
        }
        
        displayMessage();
    }
    
    
    // export public methods
    return {
        init: init
    };
    
}(jQuery));


// fire on page load
time.init();


// fire every 30 seconds
setInterval(time.init, 30000);