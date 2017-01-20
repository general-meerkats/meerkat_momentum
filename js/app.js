/* jshint esversion:6 */
/* globals $, document */

$(document).ready(function () {
    
    var img_array = ['static_background.jpg'];
    var index = 0;

    function getBackground() {
        index = (index + 1) % img_array.length;
        $('.splash')
            .css('background-image', 'url(assets/' + img_array[index] + ')')
            .css('opacity', 1);
    }
    
    getBackground();
    
});