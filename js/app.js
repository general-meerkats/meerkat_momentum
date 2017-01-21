/* jshint esversion:6 */
/* globals $, document */

$(document).ready(function () {
    
    // mock random background fetch
    function getBackground() {
        
        var img_array = [
            'static_background.jpg',
            '13.jpg'
        ];
        
        index = Math.floor(Math.random() * img_array.length);
        $('.splash')
            .css('background-image', 'url(assets/' + img_array[index] + ')')
            .css('opacity', 1);
    }
    
    getBackground();
    
    
    // about panel toggle show/hide
    $('#meerkat-btn').on('click', function (evt) {
        
        // add / remove CSS class
        $('#about-panel').toggleClass('about-show');
        
        evt.stopPropagation();
    });
    
    
    // todo panel toggle show/hide
    $('#todos-btn').on('click', function (evt) {
        
        // add / remove CSS class
        $('#todos-panel').toggleClass('todos-show');
        
        evt.stopPropagation();
    });
    
    
    // settings panel toggle show/hide
    $('#settings-btn').on('click', function (evt) {
        
        // add / remove CSS class
        $('#settings-panel').toggleClass('settings-show');
        
        evt.stopPropagation();
    });
    
});