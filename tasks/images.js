var
gulp = require('gulp');

gulp.task('images', function() {
  return gulp
    .src('assets/images/**/*')
    .pipe(gulp.dest('dist/assets/images'));
});
