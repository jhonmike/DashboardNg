var
gulp    = require('gulp'),
concat  = require('gulp-concat'),
uglify  = require('gulp-uglify'),
connect = require('gulp-connect'),
config  = require('./config.js');

gulp.task('app', function() {
    var stream = gulp
    .src([
        'src/containers/**/*.js',
        'src/resource/*.js',
        'src/screens/**/*.js',
        'src/components/**/*.js'
    ])
    .pipe(concat('app.js'));

    if (config.uglifyJS === true) {
        stream.pipe(uglify());
    }

    return stream
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(connect.reload());
});
