/* jshint esversion:6 */
/* globals jQuery, LS, time */

(function ($, LS) {

    var settingsModule = (function () {
        
        // cache DOM
        var $settingsPanel  = $('#settings-panel'),
            $userName       = $settingsPanel.find('#name-input'),
            $clockFormat    = $settingsPanel.find('#12-hr-clock-chkbx'),
            $showWeather    = $settingsPanel.find('#show-weather-chkbx'),
            $showTodos      = $settingsPanel.find('#show-todo-chkbx'),
            $saveSettings   = $settingsPanel.find('#save-settings-btn'),
            $clearSettings  = $settingsPanel.find('#clear-settings-btn');
        
        console.log($userName);
        
        // populate userName input field if name in LS
        if (LS.getData('momentum-settings').userName) {
            $userName[0].value = LS.getData('momentum-settings').userName;
        }
        
        // bind events
        $saveSettings.on('click', saveSettings);
        $clearSettings.on('click', clearSettings);
        
        // handle save settings event
        function saveSettings(event) {
            
            event.preventDefault();
            
            LS.setData('momentum-settings', {
                userName: $userName[0].value,
                clockFormat: $clockFormat[0].checked,
                showWeather: $showWeather[0].checked,
                showTodos: $showTodos[0].checked
            });
            
            // call time module to re-render DOM
            time.init();
            
            event.stopPropagation();
        }
        
        // handle clear settings event
        function clearSettings(event) {
            
            event.preventDefault();
            
            LS.clearData();
            
            // call time module to re-render DOM
            time.init();
            
            event.stopPropagation();
        }

        
    }());

})(jQuery, LS);