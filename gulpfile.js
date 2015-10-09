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
    	"node_modules/angular-animate/angular-animate.js",
        "node_modules/angular-cookies/angular-cookies.js",
        "node_modules/angular-resource/angular-resource.js",
        "node_modules/angular-sanitize/angular-sanitize.js",
        "node_modules/angular-touch/angular-touch.js",
    	"node_modules/ngstorage/ngStorage.js",
    	"node_modules/angular-ui-router/build/angular-ui-router.js",
        "node_modules/angular-bootstrap/ui-bootstrap-tpls.js",
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
    .pipe(gulp.dest('dist/assets/js'))
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
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(livereload());
});

// CSS
gulp.task('css', function() {
    var stream = gulp
    .src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/font-awesome/css/font-awesome.css',
        'assets/less/app.less'
    ])
    .pipe(less()
    .on('error', notify.onError(function (error) {
        return 'Error compiling LESS: ' + error.message;
    })))
    .pipe(concat('style.min.css'))
    .pipe(minifycss());

    return stream
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(livereload());
});

// Fonts
gulp.task('fonts', function() {
    var stream = gulp
    .src([
        'node_modules/bootstrap/dist/fonts/*',
        'node_modules/font-awesome/fonts/*'
    ]);

    return stream
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe(livereload());
});

// HTML
gulp.task('html', function(){
    var stream = gulp
    .src(['modules/**/*.html']);

    return stream
    .pipe(livereload());
});

// Watch
gulp.task('watch', function() {
    livereload.listen();

    // Watch .less files
    gulp.watch('assets/less/**/*.less', ['css']);

    // Watch modules .js files
    gulp.watch('modules/**/*.js', ['modules']);

    // Watch modules .html files
    gulp.watch('modules/**/*.html', ['html']);
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
    gulp.start('libs', 'modules', 'css', 'fonts', 'connect', 'watch');
});
