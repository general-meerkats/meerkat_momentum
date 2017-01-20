# Meerkat Momentum

#### A reverse-engineered version of the popular productivity tool Momentum.

#### Written by The General Meerkats.

Demo:

https://belcurv.github.io/meerkat_momentum/

----------------

#### On using local-storage.js

`local-storage.js` is a wrapper for the html5 local storage DOM methods.  It adds a feature check, does the JSON serializing & de-serializing, and exposes four public methods.  About those methods...

**Private Methods**

There's only one, the anonymous IIFE assigned to `var storage`.  It tests whether a browser can use localStorage and if localStorage is working by writing to it, reading from it and comparing what it got back to what it put in (the two should be identical).  It returns true/false along with a local reference to `window.localStorage`.

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

These four methods are exposed through the object literal returned at the end:

```javascript
    return {
        setData   : setData,      // save to localStorage
        getData   : getData,      // get from localStorage
        deleteData: deleteData,   // delete one location from localStorage
        clearData : clearData     // delete everything in localStorage
    };

```

1.  `setData()`
    Stores something in localStorage.  Takes two parameters, a location 'key' and a 'value' to store in that location.  `loc` must be a string; `val` can be anything (it gets stringified).  The method first checks to make sure localStorage is available, _JSON.stringifies_ the input value (localStorage only accepts strings) and stores it in the location specified by `loc`.
    
    The function:

    ```javascript
    function setData(loc, val) {
        if (storage) {
            storage.setItem(loc, JSON.stringify(val));
        }
    }
    ```
    
    In use:
    
    `LS.setData('momentum-storage', 'Collin and I need to work on layout and quotes.');`

2.  `getData()`
    Retrieves something from locaStorage.  Takes one parameter, `loc` - a string.  It's the location 'key' where you previously stored your thing.  Because all stored values are strings, the method parses the value before returning it.
    
    The function:
    
    ```javascript
    function getData(loc) {
        if (storage) {
            return JSON.parse(storage.getItem(loc));
        }
    }
    ```
    
    In use:
    
    `LS.getData('momentum-storage');`
    
3.  `deleteData()`
    Deletes the specified 'key' and its associated value from localStorage.  Takes one parameter: `loc`, the string location 'key'.
    
    The function:
    
    ```
    function deleteData(loc) {
        if (storage) {
            return storage.removeItem(loc);
        }
    }
    ```
    
    In use:
    
    `LS.deleteData('momentum-storage');`

4.  `clearData()`
    Deletes **every key** in localStorage associated with our app.  It takes no parameters and just calls `.clear()`.
    
    The function:
    
    ```javascript
    function clearData() {
        if (storage) {
            return storage.clear();
        }
    }
    ```
    
    In use:
    
    `LS.clearData();`

**How do you use this?**

Just call the module and method, passing in the required arguments.  The following examples include some jQuery.

We might want to conditionally set initial app conditions on page load depending on whether localStorage exists:

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

A `render()` function might then call `loadState()`:

```javascript
    function render() {
        // loadState returns array
        var arr = loadState();
        // render DOM
        $('#output').html('Domo arigato, ' + arr[0]);
    }
```

Example of saving data from an `<input>` on button click:

```javascript
    $('#saveUserBtn').on('click', saveUserName);

    // click handler = save user name to local storage
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