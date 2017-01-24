/* jshint esversion:6 */
/* globals $, document */

(function ($) {

    'use strict';

    var quoteFeature = (function quoteFeature() {

        // cache DOM elements
        var $quoteFeature = $('#quoteFeature');

        // get random quote
        function getQuote() {

            // api parameters
            var api = {
                endpoint: 'https://quotesondesign.com/wp-json/posts',
                params: {
                    'filter[orderby]': 'rand',
                    'filter[posts_per_page]': 1,

                    // Date query param to make each request unique.
                    // this hack disables browser caching of results.
                    'processdate': (new Date()).getTime()
                },
                inspectResponse: function (response) {
                    console.log(response[0]);
                    console.log(response[0].content.length);
                }
            };

            // do the work
            $.getJSON(api.endpoint, api.params)
                .then(renderQuote)
                .catch(handleError);
        }
        
        
        // Clean quote response strings
        function clean(str) {
            var pTagRex = /(<([^>]+)>)|(&lt;([^>]+)&gt;)/ig,
                
                // temporary element never actually added to DOM.
                // used to decode 'special html entities'
                text = document.createElement("textarea");
            
            // set element = html quote string
            text.innerHTML = str;
            
            // .value converts 'special entities' to regular text.
            // .replace removes the <p> tags
            return text.value.replace(pTagRex, '');
        }

        // render
        function renderQuote(response) {
            // console.log(response);  // for diag
            var quote = clean(response[0].content)
            $quoteFeature
                .attr('href', response[0].link)
                .attr('target', '_blank')
                .html(quote);
            
        }

        // handle error
        function handleError(err) {
            console.log(err);
        }

        // export public method
        return {
            getQuote: getQuote
        };

    }());
    // ========== END QUOTES MODULE ========== //

    // call quoteFeature public method 'getQuote()'
    quoteFeature.getQuote();

}(jQuery));