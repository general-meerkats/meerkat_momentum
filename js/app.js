/* jshint esversion:6 */
/* globals $, document */

/*
    This file should just load our other module's public init methods.
*/

$(document).ready(function () {
    
    // load backgrounds module
    BG.init();
    
    // load panels module
    Panels.init();
    
    // load weather module
    Weather.init();
    
    // load time module
    Time.init();

    // re-call time.init() every 20 seconds
    setInterval(Time.init, 20000);

    // load quote module
    Quotes.getQuote();
    
});