# Meerkat Momentum

#### A reverse-engineered version of the popular productivity tool Momentum.

#### Written by The General Meerkats.

Demo:

https://belcurv.github.io/meerkat_momentum/

#### On using local-storage.js

`local-storage.js` is a wrapper for the html5 local storage DOM methods.  It adds a feature check, does the JSON serializing & de-seializing, and exposes four public methods.  About those methods...

**Private Methods**

There's only one, the anonymous IFFE assigned to `var storage`.  It tests whether a browser can use localStorage and if localStorage is working by writing to it, reading from it and comparing the output to the original input (they should be identical).  It returns true/false along with a local reference to `window.localStorage`.

```javascript
    var storage = (function() {
        var uid = new Date().toString(),  // date must be a string
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
```

** Public Methods **

These four methods are exposed by returning the object literal at the end:

```javascript
    return {
      setData   : setData,
      getData   : getData,
      deleteData: deleteData,
      clearData : clearData
   };

```

1.  `setData()`
    Stores something in localStorage.  Takes two parameters, a location 'key' and the 'value' you want to store in that location.  `loc` must be a string; `val` can be anything.  The method first checks to make sure localStorage is available and working, _JSON.stringifies_ the input value (localStorage only accepts strings) and stores it in the location specified by the `loc` argument.

    ```javascript
    function setData(loc, val) {
        if (storage) {
            storage.setItem(loc, JSON.stringify(val));
        }
    }
    ```

2.  `getData()`
    Retrieves stuff from locaStorage.  Takes one parameter: `loc`, the string 'key' location you previously stashed your stuff in.  Because the stored value is a string, the method parses the value before returning it.
    
    ```javascript
    function getData(loc) {
        if (storage) {
            return JSON.parse(storage.getItem(loc));
        }
    }
    ```
    
3.  `deleteData()`
    Deletes only the specified 'key' (and its associated value) from localStorage.  Takes one parameter: `loc`, the string 'key' location.
    
    ```
    function deleteData(loc) {
        if (storage) {
            return storage.removeItem(loc);
        }
    }
    ```

4.  `clearData()`
    Deletes everything associated with the app in localStorage.  It takes no parameters and just calls `.clear()`.
    
    ```javascript
    function clearData() {
        if (storage) {
            return storage.clear();
        }
    }
    ```

**How do you use it**

Basically you just call the module and method, passing in the required arguments.  The following examples use jQuery methods.

For example, we might want to set initial conditions on page load.  We can do this conditionally, where we either grab values from localStorage or from some defaults:

```javascript
    var defaultName = [
        ['Toyotomi Hideyoshi']
    ];

    function loadState() {
        // if 'momentum-storage' key exists in localStorage...
        if (LS.getData('momentum-storage')) {
            // return contents of localStorage to caller
            return LS.getData('momentum-storage');
        } else {
            // otherwise, return default to caller
            return defaultName;
        }
    }
```

Then `loadState()` could be called by some other function:

```javascript
    function render() {
        // loadState returns array
        var arr = loadState();
        // render DOM
        $('#output').html('Domo arigato, ' + arr[0]);
    }
```

Saving is similarly easy.  We might have an element with an event and event handler:

```javascript
    $('#magicButton').on('click', saveUserName);

    // Save user name to local storage
    function saveUserName() {
        // capture input data
        var userName = $('#nameInputElement').val();
        
        // check that userName has length
        if (userName && userName.length > 0) {
            LS.setData('momentum-storage', userName);
        }
        
        // maybe call render() again to pull new data in
        render();
    }
```

(Disclaimer: I didn't actually test the above code!  If it doesn't work ... let me know!)