var
gulp       = require('gulp'),
livereload = require('gulp-livereload');

gulp.task('watch', function() {
    livereload.listen();

    // Watch .less files
    gulp.watch('assets/less/**/*.less', ['css']);
    gulp.watch('components/**/*.css', ['css']);

    // Watch app .js files
    gulp.watch('layout/*.js', ['app']);
    gulp.watch('shared/*.js', ['app']);
    gulp.watch('components/**/*.js', ['app']);

    // Watch components .html files
    gulp.watch('layout/*.html', ['html']);
    gulp.watch('layout/**/*.html', ['html']);
    gulp.watch('components/**/*.html', ['html']);

    // Watch images
    gulp.watch('assets/images/**/*', ['images']);
});
