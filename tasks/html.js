var
gulp          = require('gulp'),
livereload    = require('gulp-livereload'),
templateCache = require('gulp-angular-templatecache');

gulp.task('html', function(){
    var stream = gulp
    .src([
        'layout/**/*.html',
        'components/**/*.html'
    ]);

    return stream
    .pipe(templateCache({
        module: 'UndefinedSource'
    }))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(livereload());
});
