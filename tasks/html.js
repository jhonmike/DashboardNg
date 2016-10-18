var
gulp          = require('gulp'),
connect       = require('gulp-connect'),
templateCache = require('gulp-angular-templatecache');

gulp.task('html', function(){
    var stream = gulp
    .src([
        'src/containers/**/*.html',
        'src/screens/**/*.html',
        'src/components/**/*.html'
    ]);

    return stream
    .pipe(templateCache({
        module: 'UndefinedSource'
    }))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(connect.reload());
});
