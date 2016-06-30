/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    // map tells the System loader where to look for things
    var map = {
        'app':                        'app', // 'dist',
        '@angular':                   'node_modules/@angular',
        '@angular2-material':         'node_modules/@angular2-material',
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        'rxjs':                       'node_modules/rxjs'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app':                        { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':                       { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { defaultExtension: 'js' }
    };
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade',
    ];
    // Add package entries for angular packages
    ngPackageNames.forEach(function(pkgName) {
        packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
    });

    var materialPackages=[
        '@angular2-material/core',
        '@angular2-material/button',
        '@angular2-material/card',
        '@angular2-material/checkbox',
        '@angular2-material/icon',
        '@angular2-material/input',
        '@angular2-material/list',
        '@angular2-material/progress-bar',
        '@angular2-material/progress-circle',
        '@angular2-material/radio',
        '@angular2-material/sidenav',
        '@angular2-material/toolbar'
    ];
    materialPackages.forEach(function(pkgName) {
        var pkg=pkgName.split('/');
        packages[pkgName] = { main: pkg[1]+'.js', defaultExtension: 'js' };
    });
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);