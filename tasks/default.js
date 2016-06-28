var
gulp = require('gulp');

gulp.task('default', function() {
    gulp.start('libs', 'app', 'css', 'fonts', 'fontuigrid', 'html', 'images', 'connect', 'watch');
});
