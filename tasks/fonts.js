var
gulp       = require('gulp'),
connect    = require('gulp-connect');

gulp.task('fonts', function() {
    var stream = gulp
    .src([
        'node_modules/bootstrap/dist/fonts/*',
        'node_modules/font-awesome/fonts/*'
    ]);

    return stream
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe(connect.reload());
});

// TODO
gulp.task('fontuigrid', function() {
    var stream = gulp
    .src([
        'node_modules/uigrid/ui-grid.eot',
        'node_modules/uigrid/ui-grid.svg',
        'node_modules/uigrid/ui-grid.ttf',
        'node_modules/uigrid/ui-grid.woff'
    ]);
     return stream
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(connect.reload());
});
