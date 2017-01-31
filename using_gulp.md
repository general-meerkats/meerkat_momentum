Steps

1.  install Node.JS. You're going to want a modern version (> 4.x) for performance reasons:

    https://nodejs.org/en/download/

2.  `npm init` to initialize the app and create your `package.json` file.  The defaults are geenrally acceptable.  Replace _ with 'dashes'. I prefer MIT's license. This stuff doesn't really matter at this point.
3.  Then install a whole pile of packages using npm, Node's package manager:

    *   gulp - _the infamous task runner_
    *   gulp-rename - _for renaming files_
    *   gulp-concat - _merging files_
    *   gulp-uglify - _minifying files_
    *   gulp-util - _for loggin errors_
    *   gulp-babel - _transpiling es6 to es5_
    *   babel-preset-env - _presets for babel_
    
    You can do them in batches:
    
    ```
    npm install --save-dev gulp gulp-rename gulp-concat gulp-uglify gulp-util`
    
    npm install --save-dev gulp-babel babel-preset.env
    ```
    
    Warning: babel and babel-preset-env took a while to download and install. So be pateint!
    
4.  Create a folder to receive our concatenated and minified javascript files. For ex:

    `/dist/scripts`

5.  Create two files:
    *   gulpfile.js
    *   .babelrc
6.  Populate those files...

###gulpfile.js

```javascript
    var gulp   = require('gulp'),
        concat = require('gulp-concat'),
        rename = require('gulp-rename'),
        uglify = require('gulp-uglify'),
        babel  = require('gulp-babel'),
        gutil  = require('gulp-util');

    // scripts paths
    var inputJsFiles  = 'public/js/**/*.js',
        outputJsFiles = 'public/dist/scripts';


    // create 'scripts' task
    gulp.task('scripts', function() {
        return gulp.src(inputJsFiles)
            .pipe(concat('momentum.js'))
            .pipe(babel())
            .pipe(gulp.dest(outputJsFiles))
            .pipe(rename('momentum.min.js'))
            .pipe(uglify().on('error', gutil.log))
            .pipe(gulp.dest(outputJsFiles));
    });
```

---

###.babelrc

```javascript
    {
        "presets": ["env"]
    }
```

---

###Then run it

In your terminal: `gulp scripts`