// Load plugins
var
gulp      = require('gulp'),
connect   = require('gulp-connect'),
less      = require('gulp-less'),
concat    = require('gulp-concat'),
minifycss = require('gulp-minify-css'),
notify    = require('gulp-notify');


// CSS
gulp.task('css', function() {
    var stream = gulp
    .src('assets/less/style.less')
    .pipe(less()
    .on('error', notify.onError(function (error) {
        return 'Error compiling LESS: ' + error.message;
    })))
    .pipe(concat('style.min.css'))
    .pipe(minifycss());

    return stream.pipe(gulp.dest('dist/assets/'));
});

// Watch
gulp.task('watch', function() {
    // Watch .less files
    gulp.watch('assets/less/**/*.less', ['css']);
});

//Server
gulp.task('connect', function () {
    connect.server({
        port: 8000,
        livereload: true
    });
});
