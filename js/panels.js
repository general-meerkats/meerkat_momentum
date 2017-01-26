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
        DOM.$meerkatBtn.on('click', aboutPanelHandler);
        DOM.$todosBtn.on('click', todosPanelHandler);
        DOM.$settingsBtn.on('click', settingsPanelHandler);
        DOM.$weatherBtn.on('click', weatherPanelHandler);
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
    
    
    // about panel handler
    function aboutPanelHandler(event) {
        
        // add / remove CSS class
        DOM.$aboutPanel.toggleClass('left-panel-show');
        
        // show overlay
        DOM.$overlay.show();
                
        // hide other panels
        DOM.$todosPanel.removeClass('right-panel-show');
        DOM.$settingsPanel.removeClass('left-panel-show');
        DOM.$weatherPanel.removeClass('right-panel-show');
        
        event.stopPropagation();
    }
    
    
    // todo panel event handler
    function todosPanelHandler(event) {
        
        // add / remove CSS class
        DOM.$todosPanel.toggleClass('right-panel-show');
        
        // toggle overlay
        DOM.$overlay.toggle();
        
        // hide other panels
        DOM.$aboutPanel.removeClass('left-panel-show');
        DOM.$settingsPanel.removeClass('left-panel-show');
        DOM.$weatherPanel.removeClass('right-panel-show');
        
        event.stopPropagation();
    }
    
    
    // settings panel handler
    function settingsPanelHandler(event) {
        
        // add / remove CSS class
        DOM.$settingsPanel.toggleClass('left-panel-show');
        
        // toggle overlay
        DOM.$overlay.toggle();
        
        // hide other panels
        DOM.$aboutPanel.removeClass('left-panel-show');
        DOM.$todosPanel.removeClass('right-panel-show');
        DOM.$weatherPanel.removeClass('right-panel-show');
        
        event.stopPropagation();
    }
    
    
    // weather panel handler
    function weatherPanelHandler(event) {
        
        // add/remove CSS class
        DOM.$weatherPanel.toggleClass('right-panel-show');
        
        // toggle overlay
        DOM.$overlay.toggle();
        
        // hide other panels
        DOM.$aboutPanel.removeClass('left-panel-show');
        DOM.$settingsPanel.removeClass('left-panel-show');
        DOM.$todosPanel.removeClass('right-panel-show');
        
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