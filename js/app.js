/* jshint esversion:6 */
/* globals $, document */

$(document).ready(function () {
    
    var img_array = [
        'static_background.jpg',
        '13.jpg'
    ];
    var index = 0;

    function getBackground() {
        index = Math.floor(Math.random() * img_array.length);
        $('.splash')
            .css('background-image', 'url(assets/' + img_array[index] + ')')
            .css('opacity', 1);
    }
    
    getBackground();
    
});