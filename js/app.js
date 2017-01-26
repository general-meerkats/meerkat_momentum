/* jshint esversion:6 */
/* globals $, document */

$(document).ready(function () {
    
    // cache DOM elements
    var $meerkatBtn = $('#meerkat-btn'),
        $aboutPanel = $('#about-panel'),
        
        $todosBtn   = $('#todos-btn'),
        $todosPanel = $('#todos-panel'),
        
        $settingsBtn   = $('#settings-btn'),
        $settingsPanel = $('#settings-panel'),
        
        $overlay = $('<div id="overlay"></div>');
    
    
    // ============================ OVERLAY STUFF =============================

    // hide overlay before appending to DOM
    $overlay.hide();
    
    $('body').append($overlay);
    
    $overlay.on('click', function (event) {
        event.preventDefault();
        
        $overlay.hide();
        $aboutPanel.removeClass('about-show');
        $todosPanel.removeClass('todos-show');
        $settingsPanel.removeClass('settings-show');
        
        event.stopPropagation();
    });
    

    // ========================== BACKGROUND STUFF ============================
    
    BG.init();  // <-- call public .init() method from backgrounds.js
    
    
    // ========================== PANELS STUFF ===========================
    
    Panels.init() // <-- call public .init() method from panels.js

    
});