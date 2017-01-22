/* jshint esversion:6 */
/* */

(function ($, LS) {

    var settingsModule = (function () {

        var defaultNames = [
            'pal',
            'sexy',
            'handsome',
            'smarty pants',
            'good looking',
            'classy',
            'human shield'
        ];

        /* FETCH INPUT DATA FROM EITHER localStorage OR someDefault
         * @params  [none]
         * @returns [user name or default greeting]
         */
        function loadState() {
            if (LS.getData('momentum-storage')) {
                console.log('Using saved data from local storage');
                return LS.getData('momentum-storage');
            } else {
                console.log('No data in local storage');
                return someDefault;
            }
        }

        /* RENDER SOME STUFF
         * @params  [none]
         * @returns [none]
         */
        function render() {
            // call loadState, which returns array
            var arr = loadState();
            // render
            $('#output').html('Domo arigato, ' + arr[0]);
        }

        // call on page load
        render();


    }());

    settingsModule.init();

})(jQuery, LS);