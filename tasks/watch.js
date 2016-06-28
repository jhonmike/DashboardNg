var
gulp       = require('gulp'),
livereload = require('gulp-livereload');

gulp.task('watch', function() {
    livereload.listen();

    // Watch .less files
    gulp.watch('assets/less/**/*.less', ['css']);
    gulp.watch('src/components/**/*.css', ['css']);

    // Watch app .js files
    gulp.watch('src/layout/*.js', ['app']);
    gulp.watch('src/resource/*.js', ['app']);
    gulp.watch('src/components/**/*.js', ['app']);

    // Watch components .html files
    gulp.watch('src/layout/*.html', ['html']);
    gulp.watch('src/layout/**/*.html', ['html']);
    gulp.watch('src/components/**/*.html', ['html']);

    // Watch images
    gulp.watch('assets/images/**/*', ['images']);
});
