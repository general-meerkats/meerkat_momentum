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
    function getBackground() {
        
        var index,
            img_array = [
                'static_background.jpg',
                '13.jpg'
            ];
        
        index = Math.floor(Math.random() * img_array.length);
        $('.splash')
            .css('background-image', 'url(assets/' + img_array[index] + ')')
            .css('opacity', 1);
    }
    
    getBackground();
    
    
    // ========================== ABOUT PANEL STUFF ===========================
    
    // about panel toggle show/hide
    $meerkatBtn.on('click', function (evt) {
        
        // add / remove CSS class
        $aboutPanel.toggleClass('about-show');
        
        $overlay.show();

                
        // hide other panels
        $todosPanel.removeClass('todos-show');
        $settingsPanel.removeClass('settings-show');
        
        evt.stopPropagation();
    });
    
    
    // ========================== TODO PANEL STUFF ============================
    
    // todo panel toggle show/hide
    $todosBtn.on('click', function (evt) {
        
        // add / remove CSS class
        $todosPanel.toggleClass('todos-show');
        
        // toggle overlay
        $overlay.toggle();
        
        // hide other panels
        $aboutPanel.removeClass('about-show');
        $settingsPanel.removeClass('settings-show');
        
        evt.stopPropagation();
    });
    
    
    // ========================= SETTINGS PANEL STUFF =========================
    
    // settings panel toggle show/hide
    $settingsBtn.on('click', function (evt) {
        
        // add / remove CSS class
        $settingsPanel.toggleClass('settings-show');
        
        // toggle overlay
        $overlay.toggle();
        
        // hide other panels
        $aboutPanel.removeClass('about-show');
        $todosPanel.removeClass('todos-show');
        
        evt.stopPropagation();
    });
    
    // ============================ WEATHER STUFF =============================

    
});