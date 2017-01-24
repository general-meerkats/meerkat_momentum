/* jshint esversion:6 */
/* globals $, console, LS */

var time = (function($) {
    
    // init vars
    var tehDate,
        defaultNames = [
            'pal',
            'sexy',
            'handsome',
            'smarty pants',
            'good looking',
            'classy',
            'human shield'
        ],
        dummy = selectName();
    
    
    // pick a name from defaults
    function selectName() {
        var ind = Math.floor(Math.random() * defaultNames.length);
        
        return defaultNames[ind];
    }
    
    
    // asign time-based message to 'greet' on initial load
    function getMessage() {
        var timeOfDay,
            initialHour = getHours(createDate()),
            userName;
        
        if (LS.getData('momentum-settings')) {
            userName = LS.getData('momentum-settings').userName;
        } else {
            userName = dummy;
        }
        
        if (initialHour < 12) {
            timeOfDay = "Morning";
        } else if (initialHour >= 12 && initialHour < 17) {
            timeOfDay = "Afternoon";
        } else {
            timeOfDay = "Evening";
        }

        return `Good ${timeOfDay}, ${userName}.`;
    }
    

    // get clock format from LS or defaults
    function checkStandard() {
        if (LS.getData('momentum-settings')) {
            return LS.getData('momentum-settings').clockFormat;
        } else {
            return true;
        }
    }
    

    // generate new date and assign to var 'tehDate'
    function createDate() {
        tehDate = new Date();
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
        
        if (checkStandard()) {
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
    
    
    // render time to DOM
    function displayTime() {
        $('#time').text(getTime());
    }
    
    
    // render period to DOM
    function displayPeriod() {
        $('#time-period').text(getPeriod());
    }
    
    
    // render message to DOM
    function displayMessage() {
        $('#time-message').text(getMessage());
    }
    
    
    // call everything
    function init() {
        
        createDate();
        displayTime();

        if (checkStandard()) {
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


// fire every 20 seconds
setInterval(time.init, 20000);