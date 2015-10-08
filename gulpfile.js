// Load plugins
var
gulp       = require('gulp'),
connect    = require('gulp-connect'),
less       = require('gulp-less'),
concat     = require('gulp-concat'),
minifycss  = require('gulp-minify-css'),
notify     = require('gulp-notify'),
uglify     = require('gulp-uglify')
livereload = require('gulp-livereload');


var config = {
    uglifyJS: true
}

// Libs
gulp.task('libs', function() {
    var libs = [
        "node_modules/angular/angular.js",
    	"node_modules/angular-resource/angular-resource.js",
    	"node_modules/ngstorage/ngStorage.js",
    	"node_modules/angular-ui-router/build/angular-ui-router.js",
    	"config/global.js",
    	"config/local.js"
    ];

    var stream = gulp
    .src(libs)
    .pipe(concat('libs.js'));

    if (config.uglifyJS === true) {
        stream.pipe(uglify());
    }

    return stream
    .pipe(gulp.dest('dist/assets'))
    .pipe(livereload());
});

// Modules
gulp.task('modules', function() {
    var stream = gulp
    .src(['shared/**/*.js', 'modules/**/*.js'])
    .pipe(concat('modules.js'));

    if (config.uglifyJS === true) {
        stream.pipe(uglify());
    }

    return stream
    .pipe(gulp.dest('dist/assets'))
    .pipe(livereload());
});

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

    return stream
    .pipe(gulp.dest('dist/assets/'))
    .pipe(livereload());
});

// Watch
gulp.task('watch', function() {
    livereload.listen();

    // Watch .less files
    gulp.watch('assets/less/**/*.less', ['css']);

    // Watch modules files
    gulp.watch('modules/**/*.js', ['modules']);
});

//Server
gulp.task('connect', function () {
    connect.server({
        port: 8000,
        livereload: true
    });
});

// Default task
gulp.task('default', function() {
    gulp.start('libs', 'modules', 'css', 'connect', 'watch');
});
