/* jshint esversion:6 */
/* globals $ */

var BG = (function () {
    
    'use strict';
    
    
    /* public init method
    */
    function init() {
        
        var imgUrl = 'https://unsplash.it/1920/1080/?random';
        
        $.when(loadImg(imgUrl)).done(render);
    }
    
    
    /* asynchronous image loader
     *
     * @params   [string]   source   [the image API endpoint]
     * @returns  [object]            [promise object]
    */
    function loadImg(source) {
                
        return $.Deferred(function (task) {
            var image = new Image();
            image.onload = function() { task.resolve(image); };
            image.onerror = function() { task.reject(); };
            image.src = source;
        }).promise();
        
    }
    
    
    /* update the DOM
     *
     * @params   [object]   image   [image element]
    */
    function render(image) {
        $('.splash')
            .append(image)
            .css('opacity', 1);
    }
        
    
    // export public methods
    return {
        init: init
    };

}());