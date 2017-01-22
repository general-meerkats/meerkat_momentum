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
            $clearSettings  = $settingsPanel.find('#clear-settings-btn'),
            
            state = loadState();
        
        
        // bind events
        $saveSettings.on('click',  saveSettings);
        $clearSettings.on('click', clearSettings);
        
        
        // load state
        function loadState() {
            if (LS.getData('momentum-settings')) {
                return {
                    userName   : LS.getData('momentum-settings').userName,
                    clockFormat: LS.getData('momentum-settings').clockFormat,
                    showWeather: LS.getData('momentum-settings').showWeather,
                    showTodos  : LS.getData('momentum-settings').showTodos
                };
            } else {
                return {
                    userName   : undefined,
                    clockFormat: true,
                    showWeather: true,
                    showTodos  : true
                };
            }
        }
        
        
        // populate settings fields
        if (state.userName) {
            $userName[0].value  = state.userName;
        }
        $clockFormat[0].checked = state.clockFormat;
        $showWeather[0].checked = state.showWeather;
        $showTodos[0].checked   = state.showTodos;
        
        
        // handle save settings event
        function saveSettings(event) {
            
            event.preventDefault();
            
            state = {
                userName   : $userName[0].value || undefined,
                clockFormat: $clockFormat[0].checked,
                showWeather: $showWeather[0].checked,
                showTodos  : $showTodos[0].checked
            };
            
            LS.setData('momentum-settings', state);
            
            updateDom();
            
            event.stopPropagation();
        }
        
        
        // handle clear settings event
        function clearSettings(event) {
            
            event.preventDefault();
            
            // erase 'momentum-storage'
            LS.deleteData('momentum-settings');
            
            // reset settings to defaults
            $userName[0].value      = '';
            $clockFormat[0].checked = true;
            $showWeather[0].checked = true;
            $showTodos[0].checked   = true;
            
            updateDom();

            event.stopPropagation();
        }
        
        
        // render DOM elements
        function updateDom() {
            
            // call time module to re-render time & greeting
            time.init();
            
            // re-load state
            loadState();
            
            // show/hide todos
            if (!state.showTodos) {
                $('#todos-btn').css('display', 'none');
            } else {
                $('#todos-btn').css('display', 'block');
            }
            
            // show/hide weather
            if (!state.showWeather) {
                $('#weather-feature').css('display', 'none');
            } else {
                $('#weather-feature').css('display', 'block');
            }
            
            // close settings panel
            $('#settings-panel').removeClass('settings-show');
            $('#overlay').hide();
            
        }
        
        // fire on page load
        updateDom();

        
    }());

})(jQuery, LS);