/* jshint esversion:6 */
/* globals window */

/* Example use:

    // some anon IIFE:
    (function(LS) {

       var someDefault = [
          ['Mr Roboto']
       ];

       // FETCH INPUT DATA FROM EITHER localStorage OR someDefault
       // @params  [none]
       // @returns [user name or default greeting]
       //
       function loadState() {
          if (LS.getData('momentum-storage')) {
             console.log('Using saved data from local storage');
             return LS.getData('momentum-storage');
          } else {
             console.log('No data in local storage');
             return someDefault;
          }
       }

       // RENDER SOME STUFF
       // @params  [none]
       // @returns [none]
       //
       function render() {
          // call loadState, which returns array
          var arr = loadState();
          // render
          $('#output').html('Domo arigato, ' + arr[0]);
       }

       // call on page load
       render();

    })(LS);  // <-- pass LS into the IFFE

*/

var LS = (function() {

   /** 
    * localStorage feature detect & return local reference
    * @param       [none]
    * @returns     [BOOLEAN]   [returns true if stored string === uid]
    */
   var storage = (function() {
      var uid = new Date().toString(), // date must be a string
         storage,
         result;

      try {
         storage = window.localStorage;
         storage.setItem(uid, uid);
         result = storage.getItem(uid) === uid;
         storage.removeItem(uid);
         return result && storage;
      } catch (exception) {}
   }());

   /** 
    * Store item in local storage if storage exists
    * @param       [string]    loc         [local storage sub-location]
    * @param       [string]    val         [string to be stored]
    * @param       [function]  storage     [localStorage feature detect & local ref]
    */
   function setData(loc, val) {
      if (storage) {
         storage.setItem(loc, JSON.stringify(val));
      }
   }

   /** 
    * Get local storage if storage exists
    * @param       [string]    loc         [local storage sub-location]
    * @param       [function]  storage     [localStorage feature detect & local ref]
    * @returns     [JSON string]           [fetch stored string, return JSON]
    */
   function getData(loc) {
      if (storage) {
         return JSON.parse(storage.getItem(loc));
      }
   }

   /** 
    * Delete ALL keys from local storage if pass
    * @param       [function]  storage     [localStorage feature detect & local ref]
    * @returns     [function]  .clear      [wipes local storage]
    */
   function clearData() {
      if (storage) {
         return storage.clear();
      }
   }

   /** 
    * Delete ONE key from local storage if pass
    * @param       [string]    loc         [the key to delete from localStorage]
    * @param       [function]  storage     [localStorage feature detect & local ref]
    * @returns     [function]  .clear      [wipes local storage]
    */
   function deleteData(loc) {
      if (storage) {
         return storage.removeItem(loc);
      }
   }

   return {
      setData: setData,
      getData: getData,
      deleteData: deleteData,
      clearData: clearData
   };

}());