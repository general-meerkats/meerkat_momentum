/* jshint esversion:6 */
/* globals $, document */

var Panels = (function () {
    
    'use strict';
    
    // placeholder object
    var DOM = {};
    
    
    // cache DOM elements
    function cacheDom() {
        DOM.$meerkatBtn   = $('#meerkat-btn');
        DOM.$aboutPanel   = $('#about-panel');

        DOM.$todosBtn     = $('#todos-btn');
        DOM.$todosPanel   = $('#todos-panel');

        DOM.$settingsBtn  = $('#settings-btn');
        DOM.$settingsPanel= $('#settings-panel');

        DOM.$weatherBtn   = $('#weather-feature');
        DOM.$weatherPanel = $('#weather-panel');

        DOM.$overlay      = $('<div id="overlay"></div>');
    }
    
    
    // bind events
    function bindEvents() {
        DOM.$overlay.on('click', overlayHandler);
        DOM.$meerkatBtn.on('click', panelHandler);
        DOM.$todosBtn.on('click', panelHandler);
        DOM.$settingsBtn.on('click', panelHandler);
        DOM.$weatherBtn.on('click', panelHandler);
    }

    
    // handle modal overlay events    
    function overlayHandler(event) {
        event.preventDefault();
        
        DOM.$overlay.hide();
        DOM.$aboutPanel.removeClass('left-panel-show');
        DOM.$todosPanel.removeClass('right-panel-show');
        DOM.$settingsPanel.removeClass('left-panel-show');
        DOM.$weatherPanel.removeClass('right-panel-show');
        
        event.stopPropagation();
    }
    
    
    // handle panel events
    function panelHandler(event) {
        
        // capture event bindings
        var targetPanel = event.currentTarget.dataset.panel,
            triggerId = event.currentTarget.id;
        
        // toggle '*-panel-show' CSS class on targetPanel,
        // based on the ID of the triggerInput element
        if (triggerId === 'meerkat-btn' || triggerId === 'settings-btn') {
            $(targetPanel).toggleClass('left-panel-show');
        } else {
            $(targetPanel).toggleClass('right-panel-show');
        }
        
        // show overlay
        DOM.$overlay.show();
        
        // prevent event bubbling up the DOM
        event.stopPropagation();
    }
    
    
    // public init method
    function init() {
        cacheDom();
        
        DOM.$overlay.hide();  // hide overlay
        $('body').append(DOM.$overlay);  // then append it to DOM
        
        bindEvents();
    }
    
    
    // export public methods
    return {
        init: init
    };

}());