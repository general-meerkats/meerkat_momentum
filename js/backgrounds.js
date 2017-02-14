/* jshint esversion:6 */
/* globals $ */

var BG = (function () {
    
    'use strict';
    
    
    /* public init method
    */
    function init() {
        
        // change to source.unsplash API because permits filtering by category
        var imgUrl = 'https://source.unsplash.com/category/nature/1920x1080';
        
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