/* jshint esversion:6 */
/* globals $, document */

/*
    This file should just load our other module's public init methods.
*/

$(document).ready(function () {
    
    // load backgrounds module
    BG.init();
    
    // load panels module
    Panels.init() // <-- call public .init() method from panels.js

    // etc
    
});