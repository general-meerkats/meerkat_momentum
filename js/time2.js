/* jshint esversion:6 */
/* globals $, console, LS */

var time = (function($) {
    
    // init vars
    var theDate,
        defaultNames = [
            'pal',
            'sexy',
            'handsome',
            'smarty pants',
            'good looking',
            'classy',
            'human shield'
        ];
    

    // check local storage for clock format,
    // returns LS value if present, or true if missing
    function checkStandard() {
        var storage = LS.getData('momentum-settings');
        return (storage) ? storage.clockFormat : true;
    }
    

    // generate new date and assign to 'theDate'
    function createDate() {
        theDate = new Date();
    }
    
        
    // get hour value from theDate
    function getHours() {
        return theDate.getHours();
    }
    
    
    // get minutes value from theDate
    function getMinutes() {
        return theDate.getMinutes();
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
    
    
    // find and set userName
    function getUserName() {
        var namesIndex = Math.floor(Math.random() * defaultNames.length),
            storage = LS.getData('momentum-settings');
        
        return (storage && storage.userName !== undefined) ? storage.userName : defaultNames[namesIndex];
    }
    
    
    // generate greeting message
    function getMessage(userName) {
        var hour = getHours(),
            timeOfDay

        if (hour < 12) {
            timeOfDay = "morning";
        } else if (hour >= 12 && hour < 17) {
            timeOfDay = "afternoon";
        } else {
            timeOfDay = "evening";
        }

        return `Good ${timeOfDay}, `+userName+`.`;
    }
    
    
    // render time to DOM
    function displayTime() {
        $('#time').text(getTime());
    }
    
    
    // render period to DOM
    function displayPeriod() {
        
        if (checkStandard()) {
            $('#time-period').text(getPeriod());
        } else {
            $('#time-period').empty();
        }
    }
    
    
    // render message to DOM
    function displayMessage(userName) {
        $('#time-message').text(getMessage(userName));
        // console.log(this.getMessage());  // for diag
    }
    
    
    // call everything
    function init() {
        userName = getUserName();
        createDate();
        displayTime();
        displayPeriod();
        displayMessage(userName);
        return userName;
    }
    
    

    function updateMe(userName) {
        console.log("dewdis");
        createDate();
        displayTime();
        displayPeriod();
        displayMessage(userName);
    }

    // export public methods and name variable
    return {
        init: init,
        userName: init(),
        updateMe: updateMe
    };
    
}(jQuery));

// fire on page load, then save name
userName = time.userName;

// re-fire every 20 seconds
setInterval(function() {time.updateMe(userName)}, 20000);