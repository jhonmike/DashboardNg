// Load plugins
var
gulp       = require('gulp'),
connect    = require('gulp-connect'),
less       = require('gulp-less'),
concat     = require('gulp-concat'),
minifycss  = require('gulp-minify-css'),
notify     = require('gulp-notify'),
uglify     = require('gulp-uglify'),
livereload = require('gulp-livereload');


var config = {
    uglifyJS: false
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
        "node_modules/angular-ui-mask/dist/mask.min.js",
        "node_modules/angular-messages/angular-messages.js",
    	"node_modules/ngstorage/ngStorage.js",
        "node_modules/ng-img-crop/compile/minified/ng-img-crop.js",
    	"node_modules/angular-ui-router/build/angular-ui-router.js",
        "node_modules/angular-bootstrap/ui-bootstrap-tpls.js",
        "node_modules/uigrid/ui-grid.js",
        "node_modules/api-check/dist/api-check.js",
        "node_modules/angular-formly/dist/formly.js",
        "node_modules/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js",
        "node_modules/us-formly-templates/src/us-formly-templates.js",
    	"config/global.js",
    	"config/local.js",
        "config/config.js"
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

// App
gulp.task('app', function() {
    var stream = gulp
    .src([
        'app.js',
        'shared/*.js',
        'components/**/*.js'
    ])
    .pipe(concat('app.js'));

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
        "node_modules/uigrid/ui-grid.css",
        'node_modules/font-awesome/css/font-awesome.css',
        'node_modules/ng-img-crop/compile/minified/ng-img-crop.css',
        'assets/less/app.less',
        'components/**/*.css'
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
    .pipe(livereload());
});

// HTML
gulp.task('html', function(){
    var stream = gulp
    .src([
        'layout/*.html',
        'layout/**/*.html',
        'components/**/*.html'
    ]);

    return stream
    .pipe(livereload());
});

// Images
gulp.task('images', function() {
  return gulp
    .src('assets/images/**/*')
    .pipe(gulp.dest('dist/assets/images'));
});

// Watch
gulp.task('watch', function() {
    livereload.listen();

    // Watch .less files
    gulp.watch('assets/less/**/*.less', ['css']);
    gulp.watch('components/**/*.css', ['css']);

    // Watch app .js files
    gulp.watch('app.js', ['app']);
    gulp.watch('shared/*.js', ['app']);
    gulp.watch('components/**/*.js', ['app']);

    // Watch components .html files
    gulp.watch('layout/*.html', ['html']);
    gulp.watch('layout/**/*.html', ['html']);
    gulp.watch('components/**/*.html', ['html']);

    // Watch images
    gulp.watch('assets/images/**/*', ['images']);
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
    gulp.start('libs', 'app', 'css', 'fonts', 'fontuigrid', 'html', 'images', 'connect', 'watch');
});
