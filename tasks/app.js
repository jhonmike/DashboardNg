var
gulp       = require('gulp'),
concat     = require('gulp-concat'),
uglify     = require('gulp-uglify'),
livereload = require('gulp-livereload'),
config     = require('./config.js');

gulp.task('app', function() {
    var stream = gulp
    .src([
        'layout/*.js',
        'shared/*.js',
        'components/**/*.js'
    ])
    .pipe(concat('app.js'));

    if (config.uglifyJS === true) {
        stream.pipe(uglify());
    }

    return stream
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(livereload());
});
