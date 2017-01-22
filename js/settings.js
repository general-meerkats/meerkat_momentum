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
                    userName   : '',
                    clockFormat: true,
                    showWeather: true,
                    showTodos  : true
                };
            }
        }
        
        
        // populate settings fields
        $userName[0].value      = state.userName;
        $clockFormat[0].checked = state.clockFormat;
        $showWeather[0].checked = state.showWeather;
        $showTodos[0].checked   = state.showTodos;
        
        
        // handle save settings event
        function saveSettings(event) {
            
            event.preventDefault();
            
            LS.setData('momentum-settings', {
                userName   : $userName[0].value || '',
                clockFormat: $clockFormat[0].checked,
                showWeather: $showWeather[0].checked,
                showTodos  : $showTodos[0].checked
            });
            
            // call time module to re-render DOM
            time.init();
            
            // toggle features
            render();
            
            // re-load state
            loadState();
            
            // close settings panel
            $('#settings-panel').removeClass('settings-show');
            
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
            
            // call time module to re-render greeting
            time.init();
            
            // close settings panel
            $('#settings-panel').removeClass('settings-show');

            event.stopPropagation();
        }
        
        
        // update features show/hide
        function render() {
            
            if (!state.showTodos) {
                $('#todos-btn').css('display', 'none');
            }
            
            if (!state.showWeather) {
                $('#weather').css('display', 'none');
            }
            
            if (!state.clockFormat) {
                time.isStandard = false;
                time.init();
            }
            
        }

        
    }());

})(jQuery, LS);